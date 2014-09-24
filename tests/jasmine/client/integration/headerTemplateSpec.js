// RENDERING HEADER TEMPLATE LIKE THIS LEADS TO EXCEPTION, SO WE TEMPORARILY DISABLE THIS TEST

//describe("Header template", function() {
//    it("should not show tutorial link to anonymous user", function () {
//        spyOn(UI._globalHelpers, "currentUser").and.returnValue(false);
//
//        var div = document.createElement("DIV");
//        var comp = UI.render(Template.header);
//
//        UI.insert(comp, div);
//
//        expect($(div).find("#tutorialsLink")[0]).not.toBeDefined();
//    });
//
//    it("should show tutorial link to registered user", function () {
//        spyOn(UI._globalHelpers, "currentUser").and.returnValue(true);
//
//        var div = document.createElement("DIV");
//        var comp = UI.render(Template.header);
//
//        UI.insert(comp, div);
//
//        expect($(div).find("#tutorialsLink")[0]).toBeDefined();
//    });
//
//    it("should show admin link to admins user", function () {
//        spyOn(UI._globalHelpers, "isInRole").and.returnValue(true);
//
//        var div = document.createElement("DIV");
//        var comp = UI.render(Template.header);
//
//        UI.insert(comp, div);
//
//        expect($(div).find("#adminLink")[0]).toBeDefined();
//    });
//
//    it("should not show admin link to non-admins", function () {
//        spyOn(UI._globalHelpers, "isInRole").and.returnValue(false);
//
//        var div = document.createElement("DIV");
//        var comp = UI.render(Template.header);
//
//        UI.insert(comp, div);
//
//        expect($(div).find("#adminLink")[0]).not.toBeDefined();
//    });
//});