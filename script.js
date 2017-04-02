var showDisappear = $('.content > div .disappear'),
    divs = showDisappear.children('div'),
    DISAPPEARHEIGHT = 63, hide={};

showDisappear.children('div').wrapInner("<div class='wrapper'></div>");

for (var i = 0; i < divs.length; i++) {
    divs[i].parentElement.className = "show";
    divs[i].defaultHeight = divs[i].offsetHeight + "px";
    divs[i].style.height = DISAPPEARHEIGHT + "px";
    divs[i].parentElement.className = "disappear";
}



function fDisappear(elem1, elem2, time) {
    $(elem1).animate({ height: DISAPPEARHEIGHT + "px" }, time, (function() {
        elem2.className = "disappear";
    }));
}

showDisappear.on('click', function(e) {
    var div = $(this).children('div')[0],
        time = 500,
        divShow = $('.show');
    if (this.className == "disappear") {
        fDisappear(divShow.children("div")[0], divShow[0], time);
        this.className = "show";
        this.style.zIndex = "3";
        $(div).animate({ height: div.defaultHeight }, time, (function() { this.style.zIndex = ""; }).bind(this));
        hide.div = div;
        hide.saveThis = this;
        hide.time = time;
        hide.flag = true;
    } else {
        if (e.target.tagName != 'NAV') return;

        fDisappear(div, this, time);

    }
});

$(document).on('click',function(e){
    if (!(e.target.tagName == 'MAIN' ||
    e.target.tagName == 'HTML' ||
    e.target.tagName == 'P' ||
    e.target.tagName == 'SECTION' ||
    e.target.className == 'content clearfix' ||
    e.target.className == 'container')) return;
        if(!hide.flag) return;
        hide.flag = false;
    fDisappear(hide.div, hide.saveThis, hide.time);
});