// file: tests/server/unit/tutorialDataModelSpec.js

"use strict";
describe("Tutorial", function () {
    it("should be created with name and capacity", function () {
        spyOn(Tutorials, "insert").and.callFake(function(doc, callback) {
            // simulate return of id = "1";
            callback(null, "1");
        });

        var tutorial = new Tutorial();
        expect(tutorial.currentCapacity).toBe(0);

        var tutorial = new Tutorial(null, "Tutorial 1", 20, 19, "Tomas");

        expect(tutorial.name).toBe("Tutorial 1");
        expect(tutorial.capacity).toBe(20);
        expect(tutorial.currentCapacity).toBe(19);
        expect(tutorial.owner).toBe("Tomas");

        tutorial.save();

        // id should appear
        expect(tutorial.id).toEqual("1");

        // use last call to access arguments
        expect(Tutorials.insert).toHaveBeenCalled();
        expect(Tutorials.insert.calls.mostRecent().args[0]).toEqual({owner: null, name: "Tutorial 1", capacity: 20, currentCapacity: 0});
    });

    it("should be possible to update name and collection", function () {
        spyOn(Tutorials, "update");
        var tutorial = new Tutorial(1, "Tutorial 1", 2);

        tutorial.name = "Tutorial 2";
        tutorial.capacity = 3;
        tutorial.save();

        // use last call to access arguments
        expect(Tutorials.update).toHaveBeenCalled();
        expect(Tutorials.update.calls.mostRecent().args[0]).toEqual(1);
        expect(Tutorials.update.calls.mostRecent().args[1]).toEqual({$set: { name: "Tutorial 2", capacity: 3}});
    });

    it("should not be possible to delete if it has active registrations", function () {
        var model = new Tutorial(null, "", 10, 2);
        expect(function() { model.delete(); }).toThrow("Tutorial has registrations!");

        //spyOn(Roles, "userIsInRole").and.returnValue(true);
        //spyOn(Tutorials, "remove");
        //spyOn(TutorialRegistrations, "find").and.returnValue({count: function() { return 2 }});
        //
        //try
        //{
        //    Meteor.methodMap.removeTutorial("1");
        //}
        //catch (ex) {
        //    expect(ex).toBeDefined();
        //}
        //
        //expect(Meteor.methodMap.removeTutorial).toThrow();
        //expect(TutorialRegistrations.find).toHaveBeenCalledWith({tutorialId: "1"});
        //expect(Tutorials.remove).not.toHaveBeenCalled();
    });

    it("should not save when name is not defined", function() {
        var model = new Tutorial(null, "", 10);
        expect(function() { model.save(); }).toThrow();
    });

    it("should not save when capacity is not defined", function() {
        var model = new Tutorial(null, "Name", 0);
        expect(function() { model.save(); }).toThrow();
    });

    it("should allow students to register for the tutorial", function() {
        var model = new Tutorial("1", "Name", 10, 5);
        var studentId = "2";

        spyOn(TutorialRegistrations, "insert").and.callFake(function(data, callback) {
            callback(null);
        });
        spyOn(Tutorials, "update");

        model.registerStudent(studentId);

        expect(model.currentCapacity).toBe(6);
        expect(TutorialRegistrations.insert).toHaveBeenCalled();
        expect(TutorialRegistrations.insert.calls.mostRecent().args[0]).toEqual({ tutorialId : '1', studentId : '2' });
        expect(Tutorials.update).toHaveBeenCalledWith({_id: "1"}, {$inc: {currentCapacity : 1}});
    });

    it("should be possible to remove tutorial", function () {
        spyOn(Tutorials, "remove");

        var tutorial = new Tutorial(1);
        tutorial.delete();

        // use last call to access arguments
        expect(Tutorials.remove).toHaveBeenCalled();
        expect(Tutorials.remove.calls.mostRecent().args[0]).toEqual(1);
    });

    it("should not be possible to register while at maximum capacity", function() {
        var tutorial = new Tutorial(1, "Name", 5, 5);

        expect(function() { tutorial.registerStudent(1); }).toThrow("Capacity of the tutorial has been reached!");
    });

    it("should not be possible to register if registration is present", function() {
        spyOn(TutorialRegistrations, "findOne").and.returnValue({});

        var tutorial = new Tutorial(1, "Name", 5, 4);
        expect(function() { tutorial.registerStudent(1); }).toThrow("Student already registered!");
    });


    it("should not be possible to de-register if registration not present", function() {
        spyOn(TutorialRegistrations, "findOne").and.returnValue();
        var tutorial = new Tutorial(1, "Name", 5, 4);
        expect(function() { tutorial.removeRegistration(1); }).toThrow("Student not registered!");
    });

    it("should be possible to de-register if registration exists", function() {
        spyOn(TutorialRegistrations, "findOne").and.returnValue({});
        var tutorial = new Tutorial("1", "Name", 5, 4);

        spyOn(TutorialRegistrations, "remove");
        spyOn(Tutorials, "update");

        tutorial.removeRegistration("2");

        expect(TutorialRegistrations.remove).toHaveBeenCalledWith({tutorialId: "1", userId: "2"});
        expect(Tutorials.update).toHaveBeenCalledWith({_id: "1"}, {$inc: {currentCapacity : -1}});
    });

});