Template.admin.events({
    "submit form": function(e) {
        e.preventDefault();
        this.name = $('#tutorialName').val();
        this.capacity = parseInt($('#tutorialCapacity').val());
        this.currentCapacity = 0;
        this.save();

        Router.go("tutorials");
    }
});