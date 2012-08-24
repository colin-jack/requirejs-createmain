var fs = require('fs');
var _u = require('underscore');
var async = require('async');
var winston = require('winston');
var MainFileGenerator = require('./lib/MainFileGenerator')

module.exports = {
		generateFile: function(directoryToScan, pattern, outputFilePath, done) {
			var fileGenerator = new MainFileGenerator(directoryToScan, pattern, outputFilePath);
			console.log(fileGenerator);
			fileGenerator.generate(done);
		}
	};