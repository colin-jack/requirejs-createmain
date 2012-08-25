var fs = require('fs');
var _u = require('underscore');
var async = require('async');
var winston = require('winston');

module.exports = (function() {
	var RequiredFilesDetailsStore = function(filePathsRelativeTo) {
        this.filePaths = [];
        this.filePathsRelativeTo = filePathsRelativeTo;

        _u.bindAll(this);
	};

    RequiredFilesDetailsStore.prototype.saveFileDetails = function(fileOrDirectory, fullPathToFileOrDirectory) {
        this.filePaths.push(fullPathToFileOrDirectory + fileOrDirectory);
    };

	return RequiredFilesDetailsStore;
}());