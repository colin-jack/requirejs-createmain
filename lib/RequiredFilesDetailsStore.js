var fs = require('fs');
var _u = require('underscore');
var async = require('async');
var winston = require('winston');
var winston = require('winston');

module.exports = (function() {
	var RequiredFilesDetailsStore = function(filePathsRelativeTo) {
        this.filePaths = [];
        this.filePathsRelativeTo = filePathsRelativeTo;

        _u.bindAll(this);
	};

    RequiredFilesDetailsStore.prototype.saveFileDetails = function(fullPathToFileOrDirectory) {
        var relativePath  = fullPathToFileOrDirectory.replace(this.filePathsRelativeTo, '');

        winston.info("Storing path to required file: " + relativePath);

        this.filePaths.push(relativePath);
    };

	return RequiredFilesDetailsStore;
}());