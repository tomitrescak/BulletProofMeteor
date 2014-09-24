//Meteor.startup(function() {
//
//    // login to system and wait for callback
//    Meteor.loginWithPassword("admin@tutorials.com", "admin3210", function(err) {
//        // create a new tutorial
//        var tut = new Tutorial();
//
//        // save the tutorial and use callback function to check for existence
//        var id = tut.save(function(error, result) {
//
//            tut.save(function(error, result) {
//                expect(error).toBeDefined();
//
//                // delete created tutorial
//                Tutorials.remove(id);
//
//                Meteor.logout(function() {
//                    done();
//                });
//            });
//        });
//    });
//});