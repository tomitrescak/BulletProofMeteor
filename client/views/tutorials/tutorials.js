Template.tutorials.helpers({
    canDelete: function() {
        return !this.currentCapacity;
    },
    canRegister: function() {
        return this.currentCapacity < this.capacity && TutorialRegistrations.find({tutorialId: this._id}).count() == 0;
    },
    isRegistered: function() {
        return TutorialRegistrations.find({tutorialId: this._id}).count() > 0;
    },
    tutorialModel: function() {
        return new Tutorial(this._id, this.name, this.capacity, this.currentCapacity);
    }
});

Template.tutorials.events({
    "click .registerForTutorial": function(e) {
        e.preventDefault();
        this.registerStudent();
    },
    "click .deregisterForTutorial": function(e) {
        e.preventDefault();
        this.removeRegistration();
    },
    "click .removeTutorial": function(e) {
        e.preventDefault();
        this.delete();
    }
});