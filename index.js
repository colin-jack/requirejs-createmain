var MainFileGenerator = require('./lib/MainFileGenerator')

module.exports = {
		generateFile: function(directoryToScan, outputFilePath, done) {
			var fileGenerator = new MainFileGenerator(directoryToScan, outputFilePath);
			fileGenerator.generate(done);
		}
	};