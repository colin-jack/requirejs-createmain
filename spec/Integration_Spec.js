var vows = require('vows'),
	assert = require('assert'),
    underTest = require('../index'),
    fs = require('fs');

var directoryContainingJsFiles = __dirname + "/simpleRequireRoot";
var outputFileName = "main.js";
var outputFilePath = __dirname + "/" + outputFileName;
 
vows.describe('generate require file for all files in directory (integration)').addBatch({
    'when generating main require file for a simple directory structure': {
        topic: function () { 
            underTest.generateFile(directoryContainingJsFiles, outputFileName, this.callback);

            return fs.readFileSync(outputFilePath);
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