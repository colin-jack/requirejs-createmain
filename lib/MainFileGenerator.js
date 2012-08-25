var fs = require('fs');
var _u = require('underscore');
var async = require('async');
var winston = require('winston');

module.exports = (function() {
	var MainFileGenerator = function(directoryToScan, pattern, outputFilePath) {
		// TODO: Error if its not a directory
        // TODO: Validate arguments
		this.directoryToScan = directoryToScan;
		this.pattern = pattern;
        this.outputFilePath = outputFilePath;

        _u.bindAll(this);
	};

	MainFileGenerator.prototype.generate = function(allDone) {
		this.allDone = allDone;

        winston.info("About to generate main require.js file from files in: " + this.directoryToScan);

        fs.readdir(this.directoryToScan, this.processFiles);
	};

	MainFileGenerator.prototype.processFiles = function(err, files) {
        if (!files)
        {
            winston.info("No files in directory.")
            
            if (this.allDone) {
                this.allDone();
            }

            return;
        }

        async.forEach(files, this.processFile, function(err) {
        	// TODO: If err is not null we have to deal with it

        	// TODO: Write out the final file.

            this.allDone();
        });
    };

    MainFileGenerator.prototype.processFile = function(file, done) {
     // if (fileStats.isDirectory())
     //        {
     //            that.lazilyExportAllFiles(fullPathToFile + "/", done)
     //        }
     //        else
     //        {
     //            that.lazilyExportFile(file, fullPathToFile, done);
     //        }
    }

	return MainFileGenerator;
}());