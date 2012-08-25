var fs = require('fs');
var _u = require('underscore');
var async = require('async');
var winston = require('winston');
var RequiredFilesDetailsStore = require('./RequiredFilesDetailsStore')

module.exports = (function() {
	var MainFileGenerator = function(directoryToScan, pattern, outputFilePath) {
		// TODO: Error if its not a directory
        // TODO: Validate arguments

        this.directoryToScan = directoryToScan.substr(-1) === "/" ? directoryToScan : directoryToScan + "/";
		this.pattern = pattern;
        this.outputFilePath = outputFilePath;

        this.requiredFilesStore = new RequiredFilesDetailsStore(this.directoryToScan);

        _u.bindAll(this);
	};

	MainFileGenerator.prototype.generate = function(allDone) {
		this.allDone = allDone;

        winston.info("About to generate main require.js file from files in: " + this.directoryToScan);

        this.recursivelyProcessContents(this.directoryToScan, this.writeOutMainFileAndComplete);
	};

	MainFileGenerator.prototype.recursivelyProcessContents = function(directory, done) {
        var that = this;

        var processFile = function(file) {
            that.recursivelyStoreFileDetails(file, directory, done);
        }

       var processFiles = function(err, files) {
            if (err) {
                return that.writeErrorAndComplete(err, done);
            }

            if (!files)
            {
                return that.respondToNoFilesOrDirectoriesFound(done);
            }

            async.forEach(files, processFile, function(err) {
                // TODO: If err is not null we have to deal with it
                done();
            });
        }

        fs.readdir(directory, processFiles);
    };

    MainFileGenerator.prototype.respondToNoFilesOrDirectoriesFound = function(done) {
        winston.info("No files or directories found to process.");
        done();
    }

    MainFileGenerator.prototype.writeErrorAndComplete = function(err, done) {
        winston.error(err);
        done();
    };

    MainFileGenerator.prototype.writeOutMainFileAndComplete = function(err) { 
        if (err) {
            return this.writeErrorAndComplete(err);
        }

        winston.info("About to write out generated main file.")

        //async.reduce(files, this.addFilesDetails, this.writeOutMainFileAndComplete, "");

        // TODO: Write out the final file.

        this.allDone();
    };

    MainFileGenerator.prototype.processFileOrDirectoryStats = function(err, fullPathToFileOrDirectory, fileOrDirectoryStats, done) {
        if (err) {
            return this.writeErrorAndComplete(err, done);
        }

        if (fileOrDirectoryStats.isDirectory())
        {
            this.recursivelyProcessContents(fullPathToFileOrDirectory + "/", done)
        }
        else
        {
            debugger;
            this.requiredFilesStore.saveFileDetails(fullPathToFileOrDirectory);
            done();
        }
    };

    MainFileGenerator.prototype.recursivelyStoreFileDetails = function(fileOrDirectory, parentDirectory, done) {
        var fullPathToFileOrDirectory = parentDirectory + fileOrDirectory;
        var that = this;

        fs.stat(fullPathToFileOrDirectory, function(err, stats) { 
            that.processFileOrDirectoryStats(err, fullPathToFileOrDirectory, stats, done); 
        });
    };

	return MainFileGenerator;
}());