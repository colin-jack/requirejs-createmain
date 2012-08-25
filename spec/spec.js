var vows = require('vows'),
	assert = require('assert'),
    underTest = require('../index');

var directoryContainingJsFiles = __dirname + "/simpleRequireRoot";
var outputFilePath = __dirname + "/main.js";
 
vows.describe('generate require file for all files in directory').addBatch({
    'when generating main require file for a simple directory structure': {
        topic: function () { 
            return underTest;
            //underTest.generateFile(directoryContainingJsFiles, "*.js", outputFilePath, this.callback);
        },

        'should not get an error': function (err, result) {            
            underTest.generateFile(directoryContainingJsFiles, "*.js", outputFilePath, this.callback);
            // result.generateFile(directoryContainingJsFiles, "*.js", outputFilePath, this.callback);
            //assert.isNull(err);
            assert.isNull(err);
        },
        
        // 'the main.js starts out with a require statement': function (err) {
            

        //     assert.equal (root(), correctReturnValue);
        // },

    }
}).run();