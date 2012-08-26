var fs = require('fs');
var _u = require('underscore');
var async = require('async');
var winston = require('winston');
var RequiredFilesDetailsStore = require('./RequiredFilesStore')
var filewalker = require('filewalker');

module.exports = (function() {
	var MainFileGenerator = function(directoryToScan, outputFileName) {
		// TODO: Error if its not a directory
        // TODO: Validate arguments

        this.directoryToScan = directoryToScan.substr(-1) === "/" ? directoryToScan : directoryToScan + "/";
        this.outputFileName = outputFileName;

        this.requiredFilesStore = new RequiredFilesDetailsStore();

        //_u.bindAll(this);
	};

	MainFileGenerator.prototype.generate = function(done) {
        winston.info("About to generate main require.js file from files in: " + this.directoryToScan);

        this.recursivelyProcessContents(done);
	};

	MainFileGenerator.prototype.recursivelyProcessContents = function(done) {
        var that = this;
        
        filewalker(this.directoryToScan)
            .on('dir', function(p) {
                console.log('dir:  %s', p);
            })
            .on('file', function(file, s) {
                that.requiredFilesStore.saveFileDetails(file);
            })
            .on('error', function(err) {
                that.writeErrorAndComplete(err, done);
            })
            .on('done', function() {
                that.writeOutMainFileAndComplete(done);
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

    MainFileGenerator.prototype.writeOutMainFileAndComplete = function(done) { 
        var requiredFiles = this.requiredFilesStore.getRequireStatementsString();
        var entireRequireStatement = "require([" + requiredFiles +"]);";
        var outputFilePath = this.directoryToScan + this.outputFileName;

        winston.info("About to write out generated main file to: " + outputFilePath);

        var onFileWriteComplete = function(err) {
            if(err) {
                winston.error("Failed to write main require file: " + err);
                done(err);
            } else {
                done();
            }
        };

        fs.writeFile(outputFilePath, entireRequireStatement, onFileWriteComplete); 
    }

	return MainFileGenerator;
}());