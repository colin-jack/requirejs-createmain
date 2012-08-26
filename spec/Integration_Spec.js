var vows = require('vows'),
	assert = require('assert'),
    MainFileGenerator = require('../lib/MainFileGenerator'),
    fs = require('fs');

var directoryContainingJsFiles = __dirname + "/../spec-files/simpleRequireRoot";
var outputFileName = "main.js";
var outputFilePath = directoryContainingJsFiles + "/" + outputFileName;
 
vows.describe('generate require file for all files in directory (integration)').addBatch({
    'when generating main require file for a simple directory structure': {
        topic: function () { 
            var that = this;

            var onFileGenerated = function() {
                debugger;
                var writtenToFile = fs.readFileSync(outputFilePath, "utf8");
                that.callback(null, writtenToFile);
            };

            var underTest = new MainFileGenerator(directoryContainingJsFiles, outputFileName)
            underTest.generate(onFileGenerated);
        },

        'should not get an error': function (err, fileContents) {
            assert.isNull(err);
        },

        'should have created the file with expexcted content': function (err, fileContents) {
            assert.equal(fileContents, 
                        "require(['requireSubDir1/definesFunction1.js', 'requireSubDir1/requireSubDir2/definesFunction2.js', 'requireSubDir1/requireSubDir2/definesFunction4.js', 'requireSubDir3/definesFunction3.js']);");
        }
    }
}).export(module);