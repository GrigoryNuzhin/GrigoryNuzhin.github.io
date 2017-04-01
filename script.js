
var showDisappear = $('.content > div .disappear'),
    divs = showDisappear.children('div'),
    DISAPPEARHEIGHT = 63;

for (var i = 0; i < divs.length; i++) {
    divs[i].parentElement.className = "show";
    divs[i].defaultHeight = divs[i].offsetHeight + "px";
    divs[i].style.height = DISAPPEARHEIGHT + "px";
    divs[i].parentElement.className = "disappear";
}

showDisappear.children('div').wrapInner("<div class='wrapper'></div>");

showDisappear.on('click', function(e) {
    var div = $(this).children('div')[0],
        time = 500;
    if (this.className == "disappear") {
        this.className = "show";
        $(div).animate({ height: div.defaultHeight }, time);

    } else {
        if(e.target.tagName != 'NAV') return;
        $(div).animate({ height: DISAPPEARHEIGHT + "px" }, time, (function() {
            this.className = "disappear";
        }).bind(this));

    }
});
