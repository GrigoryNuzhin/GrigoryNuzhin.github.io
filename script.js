var showDisappear = $('.content > div .disappear'),
    divs = showDisappear.children('div'),
    DISAPPEARHEIGHT = 63;

for (var i = 0; i < divs.length; i++) {
    divs[i].parentElement.className = "show";
    divs[i].defaultHeight = divs[i].offsetHeight + "px";
    divs[i].style.height = DISAPPEARHEIGHT + "px";
    divs[i].parentElement.style.clip = "rect(0, auto," + (DISAPPEARHEIGHT + 8) + "px" + ", 0)";
    divs[i].parentElement.className = "disappear";
}


showDisappear.click(function() {
    var div = $(this).children('div')[0];
    if (this.className == "disappear") {
        this.className = "show";

        div.style.height = div.defaultHeight;
        this.style.clip = "rect(0, auto," + (parseInt(div.defaultHeight) + 8) + "px" + ", 0)";
        /*this.style.height = div.defaultHeight;*/
    } else {
        this.className = "disappear";
        div.style.height = DISAPPEARHEIGHT + "px";
        /*this.style.height = "0px";*/
        this.style.clip = "rect(0, auto," + (DISAPPEARHEIGHT + 8) + "px" + ", 0)";
    }
});