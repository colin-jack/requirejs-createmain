var fs = require('fs');
var _u = require('underscore');
var async = require('async');
var winston = require('winston');
var winston = require('winston');
var _u = require('underscore');

module.exports = (function() {
	var RequiredFilesDetailsStore = function(outputFileName) {
        this.filePaths = [];
        this.outputFileName = outputFileName;

        _u.bindAll(this);
	};

    RequiredFilesDetailsStore.prototype.isJavaScript = function(relativePath) {
        var extension = relativePath.substr(-3);

        return (extension === ".js"); 
    };

    RequiredFilesDetailsStore.prototype.saveFileDetails = function(relativePath) {
        if (this.isJavaScript(relativePath) == false) {
            winston.info("Skipping file as it is not JavaScript: " + relativePath);            
            return;
        }

        if (relativePath === this.outputFileName) {
            winston.info("Skipping adding require statement for output file itself: " + relativePath);            
            return;
        }

        winston.info("Storing path to required file: " + relativePath);

        this.filePaths.push(relativePath);
    };

    RequiredFilesDetailsStore.prototype.getRequireStatementsString = function() {
        var addFileDetails = function(memo, filePath) { 
            return memo + "'" + filePath + "', " 
        };

        this.filePaths.sort();

        var requireStatements = _u.reduce(this.filePaths, addFileDetails, "")
        var minusTrailingCommandAndSpace = requireStatements.substring(0, requireStatements.length - 2);
        
        return minusTrailingCommandAndSpace;
    };

	return RequiredFilesDetailsStore;
}());