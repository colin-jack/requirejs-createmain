var vows = require('vows'),
	assert = require('assert'),
    mainFileCreator = require('../index');

var directoryContainingJsFiles = __dirname + "/simpleRequireRoot";
var outputFilePath = __dirname + "/main.js";
 
vows.describe('generate require file for all files in directory').addBatch({
    'when generating main require file for a simple directory structure': {
        topic: function () { 
            //assert.isNull({"dssad": "asddasdas"});
            //assert.isNull(mainFileCreator);
            return mainFileCreator;
            //return mainFileCreator.generateFile();
        },

        'should not get an error': function (err, result) {            
            //assert.isNull(result.foo());
            result.generateFile(directoryContainingJsFiles, "*.js", outputFilePath, this.callback);
            // //assert.isNull(err);
            // assert.isNull(err);
        },
        
        // 'the main.js starts out with a require statement': function (err) {
            

        //     assert.equal (root(), correctReturnValue);
        // },

    }
}).run();


// vows.describe('require all files in directory').addBatch({
//     'when requiring a simple hierarchy': {
//         topic: function () { 
//             namespace.create('domain', __dirname + '/files/simple_hierarchy/', this.callback); 
//         },
//         'we can require a module with dependencies': function (err, namespace) {
//             var root = namespace.require('root');

//             assert.equal (root(), correctReturnValue);
//         },
//         'we can access the module directly on the namespace': function (err, namespace) {
//             var root = namespace.root();

//             assert.equal (root(), correctReturnValue);
//         },
//         'we can access an exported object directly': function(err, namespace) {
//             var exported = namespace.require('exporting_object');
//             assert.equal(exported.getConstantValue(), 89);
//         }
//     }
// }).run();

// // TODO: No "/" at end of path.
// // TODO: Invalid path.
// // TODO: Multiple files with same name.
// // TODO: Directory does not exist.
// // TODO: Ignore casing
// // TODO: Example
// // TODO: No files in directory
// // TODO: useToExtend
// // TODO: Export is for a function