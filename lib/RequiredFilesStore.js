var fs = require('fs');
var _u = require('underscore');
var async = require('async');
var winston = require('winston');
var winston = require('winston');
var _u = require('underscore');

module.exports = (function() {
	var RequiredFilesDetailsStore = function() {
        this.filePaths = [];

        _u.bindAll(this);
	};

    RequiredFilesDetailsStore.prototype.saveFileDetails = function(relativePath) {
        var extension = relativePath.substr(-3);

        if (extension !== ".js") {
            winston.info("Skipping file as it is not JavaScript: " + relativePath);            
            return;
        }

        winston.info("Storing path to required file: " + relativePath);

        this.filePaths.push(relativePath);
    };

    RequiredFilesDetailsStore.prototype.getRequireStatementsString = function() {
        var requireStatements = _u.reduce(this.filePaths, function(memo, filePath) { return memo + "'" + filePath + "', " }, "")
        var minusTrailingCommandAndSpace = requireStatements.substring(0, requireStatements.length - 2);
        return minusTrailingCommandAndSpace;
    };

	return RequiredFilesDetailsStore;
}());