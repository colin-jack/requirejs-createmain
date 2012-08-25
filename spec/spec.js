var vows = require('vows'),
	assert = require('assert'),
    underTest = require('../index'),
    fs = require('fs');

var directoryContainingJsFiles = __dirname + "/simpleRequireRoot";
var outputFilePath = __dirname + "/main.js";
 
vows.describe('generate require file for all files in directory (integration)').addBatch({
    'when generating main require file for a simple directory structure': {
        topic: function () { 
            underTest.generateFile(directoryContainingJsFiles, "*.js", outputFilePath, this.callback);
            return fs.readFileSync(outputFilePath);
        },

        'should not get an error': function (err, result) {            
            assert.isNull(err);
        },
        
        'the main.js starts out with a require statement': function (err) {
                

            assert.equal (root(), correctReturnValue);
        },

    }
}).run();