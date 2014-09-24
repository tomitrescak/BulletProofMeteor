Meteor.publish('tutorials', function() {
    return Tutorials.find();
});

Meteor.publish('tutorial', function(_id) {
    return Tutorials.find(_id);
});

Meteor.publish('registrations', function() {
    return TutorialRegistrations.find({userId: this.userId});
});