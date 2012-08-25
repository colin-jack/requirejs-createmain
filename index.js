var MainFileGenerator = require('./lib/MainFileGenerator')

module.exports = {
		generateFile: function(directoryToScan, pattern, outputFilePath, done) {
			var fileGenerator = new MainFileGenerator(directoryToScan, pattern, outputFilePath);
			fileGenerator.generate(done);
		}
	};