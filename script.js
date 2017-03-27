$('.content > div .disappear').click(function() {
    if (this.className == "disappear") {
        this.className = "show";
    } else {
        this.className = "disappear";
    }
});
