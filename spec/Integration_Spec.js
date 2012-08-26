var vows = require('vows'),
	assert = require('assert'),
    MainFileGenerator = require('../lib/MainFileGenerator'),
    fs = require('fs');

var directoryContainingJsFiles = __dirname + "/simpleRequireRoot";
var outputFileName = "main.js";
var outputFilePath = __dirname + "/" + outputFileName;
 
vows.describe('generate require file for all files in directory (integration)').addBatch({
    'when generating main require file for a simple directory structure': {
        topic: function () { 
            var onFileGenerated = function() {
                console.log("**************************sadsdaasdasdasdadsadsasdads");
                debugger;
                var writtenToFile = fs.readFileSync(outputFilePath);
                this.callback(writtenToFile);
            };

            var underTest = new MainFileGenerator(directoryContainingJsFiles, outputFileName)
            underTest.generate(onFileGenerated);
        },

        'should not get an error': function (err, result) {            
            assert.isNull(err);
        },

        'should have created the file': function (err, result) {
            assert.isFalse("errno" in result);
        },
        
        // 'the main.js starts out with a require statement': function (err, result) {
        //     console.log(result);
                

        //     //assert.equal (root(), correctReturnValue);
        // },

    }
}).run();