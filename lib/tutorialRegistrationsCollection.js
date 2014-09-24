TutorialRegistrations = new Mongo.Collection("tutorialRegistrations");

TutorialRegistrations.allow({
    insert: function (userId, doc) {
        // for safer access we can even check for limits here
        var tutorial = Tutorials.findOne(doc.tutorialId);

        return tutorial.currentCapacity < tutorial.capacity &&
            ((userId && doc.studentId === Meteor.userId()) ||
                Roles.userIsInRole(userId, "admin"));
    },
    remove: function (userId, doc) {
        // can only remove your own documents or admin
        return (userId && doc.studentId === userId) || Roles.userIsInRole(userId, "admin");
    },
    fetch: ['owner']
});