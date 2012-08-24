module.exports = (function() {
	var MainFileGenerator = function(directoryToScan, pattern, directoryToScan) {
		// TODO: Error if its not a directory
        // TODO: Validate arguments
		this.directoryToScan = directoryToScan;
		this.pattern = pattern;
	};

	MainFileGenerator.prototype.generate = function(allDone) {
		this.allDone = allDone;

        winston.log("About to generate main require.js file from files in: " + this.directoryToScan);

        fs.readdir(associatedDir, processFiles);
	};

	MainFileGenerator.prototype.processFiles = function(err, files) {
        if (!files)
        {
            winston.info("No files in directory.")
            this.allDone();
            return;
        }

        async.forEach(files, this.processFile, function(err) {
        	// TODO: If err is not null we have to deal with it

        	// TODO: Write out the final file.

            allDone();
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