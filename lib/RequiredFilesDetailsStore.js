var fs = require('fs');
var _u = require('underscore');
var async = require('async');
var winston = require('winston');
var winston = require('winston');
var _u = require('underscore');

module.exports = (function() {
	var RequiredFilesDetailsStore = function(filePathsRelativeTo) {
        this.filePaths = [];
        this.filePathsRelativeTo = filePathsRelativeTo;

        _u.bindAll(this);
	};

    RequiredFilesDetailsStore.prototype.saveFileDetails = function(relativePath) {
        winston.info("Storing path to required file: " + relativePath);

        this.filePaths.push(relativePath);
    };

    RequiredFilesDetailsStore.prototype.getRequireStatementsString = function() {
        var requireStatements = _u.reduce(this.filePaths, function(memo, filePath) { return memo + "'" + filePath + "'," }, "")
        debugger;
        winston.info(requireStatements);
        return requireStatements.substring(0, requireStatements.length - 1);
    };

    //require(['file1', file2])

	return RequiredFilesDetailsStore;
}());