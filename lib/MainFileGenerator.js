var fs = require('fs');
var _u = require('underscore');
var async = require('async');
var winston = require('winston');
var RequiredFilesDetailsStore = require('./RequiredFilesDetailsStore')
var filewalker = require('filewalker');

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
        // TODO: Consider making generic, same as in namespace....

        var that = this;

        filewalker(this.directoryToScan)
            .on('dir', function(p) {
                console.log('dir:  %s', p);
            })
            .on('file', function(file, s) {
                //console.log('file: %s, %d bytes', p, s.size);
                that.requiredFilesStore.saveFileDetails(file);
            })
            .on('error', function(err) {
                that.writeErrorAndComplete(err, done);
            })
            .on('done', function() {
                that.writeOutMainFileAndComplete();
                done();
            })
        .walk();
    };

    MainFileGenerator.prototype.respondToNoFilesOrDirectoriesFound = function(done) {
        winston.info("No files or directories found to process.");
        done();
    }

    MainFileGenerator.prototype.writeErrorAndComplete = function(err, done) {
        winston.error(err);
        done();
    };

    MainFileGenerator.prototype.writeOutMainFileAndComplete = function() { 
        winston.info("About to write out generated main file.")

        var requireStatements = this.requiredFilesStore.getRequireStatementsString();

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