var vows = require('vows'),
	assert = require('assert'),
    RequiredFilesStore = require('../lib/RequiredFilesStore');

vows.describe('add some js and some other files to required files store').addBatch({
    'when asking for require string': {
        topic: function () { 
            var underTest = new RequiredFilesStore();

            underTest.saveFileDetails("abc/file1.txt");
            underTest.saveFileDetails("abc/file1.txt");
            underTest.saveFileDetails("abc/def/file5.j");
            underTest.saveFileDetails("abc/file2.st");
            underTest.saveFileDetails("abc/file6.jsa");
            underTest.saveFileDetails("abc/file3.js");
            underTest.saveFileDetails("abc/file4.js");
            underTest.saveFileDetails("/file5.js");
            underTest.saveFileDetails("abc/def/ghi/file6.js");

            return underTest.getRequireStatementsString();
        },

        'should generate the correct require string containing only JS files': function (result) {            
            assert.equal(result, "'abc/file3.js', 'abc/file4.js', '/file5.js', 'abc/def/ghi/file6.js'");
        },
    }
}).run();