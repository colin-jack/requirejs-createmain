var vows = require('vows'),
	assert = require('assert'),
    MainFileGenerator = require('../lib/MainFileGenerator'),
    fs = require('fs');

var directoryContainingJsFiles = __dirname + "/simpleRequireRoot";
var outputFileName = "main.js";
var outputFilePath = directoryContainingJsFiles + "/" + outputFileName;
 
vows.describe('generate require file for all files in directory (integration)').addBatch({
    'when generating main require file for a simple directory structure': {
        topic: function () { 
            var onFileGenerated = function() {
                var writtenToFile = fs.readFileSync(outputFilePath, "utf8");
                console.log(writtenToFile);
                this.callback(writtenToFile);
            }.bind(this);

            var underTest = new MainFileGenerator(directoryContainingJsFiles, outputFileName)
            underTest.generate(onFileGenerated);
        },

        'should have created the file': function (result) {
            assert.isFalse("errno" in result);
        },
        
        // 'the main.js starts out with a require statement': function (err, result) {
        //     console.log(result);
                

        //     //assert.equal (root(), correctReturnValue);
        // },

    }
}).run();