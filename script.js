/* Функционал язычка */
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


/* Автоматическая прокрутка */
$('main > nav').click(function () { 
    destination = $('#footer').offset().top;
    $('html, body').animate({scrollTop: destination}, 1000); // HTML - необходимо для работы в браузере Safari!
    $('.vh').removeClass('vh');
    return false;
});




/* Показ анимаций при прокрутке */
var div = document.createElement("div");
document.body.appendChild(div);
div.className = "test"
var x = "200px", y="100px", f


function scrollEffects() {
    var footer = $('footer')[0],
        effectElem;
    x = footer.getBoundingClientRect().left + footer.offsetWidth / 2;
    y = footer.getBoundingClientRect().top + footer.offsetHeight / 2;
    effectElem = document.elementFromPoint(x, y);
    if (!~effectElem.className.indexOf("vh") ) return;    
    $(effectElem).removeClass("vh");
    $(effectElem).addClass("animated " + $(effectElem).data().classname);
    // div.style.top = y + "px";
    // div.style.left = x + "px";
    // Footer не будем искать, будет легче узнать конец прокрутки, из-за того что у него фиксированная позиция.
    new ScrollSwitch().off();
    console.log(document.elementFromPoint(x, y));
    // Использовать событие анимация, нужно включать во время её overflo: hiden;
}

// http://getinstance.info/articles/javascript/css3-animation-javascript-event-handlers/
var pfx = ["webkit", "moz", "MS", "o", ""];
function PrefixedEvent(element, type, callback) {
    for (var p = 0; p < pfx.length; p++) {
        if (!pfx[p]) type = type.toLowerCase();
        element.addEventListener(pfx[p] + type, callback, false);
    }
}

$('.vh').each(function(index, pTransitionend){
    PrefixedEvent(pTransitionend, "AnimationEnd", function(){
        new ScrollSwitch().on();
       setTimeout(function(){        
       },500)
  });
})

/*$(this).addClass($(this).data('animation'));*/


/*$(window).scroll(function (){
    $('.vh').each(function (){
        var imagePos = $(this).offset().top;
        var topOfWindow = $(window).scrollTop();
        if (imagePos < topOfWindow+$(window).height()-250) {
            $(this).removeClass("vh");
            $(this).addClass("animated " + $(this).data().classname);
        }
    });
});﻿*/

/* Временная заплатка конфликта тени в css. Удалить если удастся решить это другим способом.*/
$(".vh").each(function(index, elem) {
    if (index < 5) {
        if (index % 2) {
            $(elem).append("<span class='odd'></span>");
        } else {
            $(elem).append("<span class='even'></span>");
        }
    } else {
        if (index % 2) {
            $(elem).append("<span class='even'></span>");
        } else {
            $(elem).append("<span class='odd'></span>");
        }
    }

});
$(document).ready(function(){
    setTimeout(function(){
    window.scrollTo(0,0);
    window.onscroll = scrollEffects; // Запуск происходит специально отдельно, для того, чтобы элементы случайно не раскрывались при автоматическом скролле случайно раскрытых элементов.
    },50);
});




function ScrollSwitch(){
    // http://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily/4770179#4770179
    var keys = {37: 1, 38: 1, 39: 1, 40: 1};

    function preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault)
          e.preventDefault();
      e.returnValue = false;  
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    function disableScroll() {
      if (window.addEventListener) // older FF
          window.addEventListener('DOMMouseScroll', preventDefault, false);
      window.onwheel = preventDefault; // modern standard
      window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
      window.ontouchmove  = preventDefault; // mobile
      document.onkeydown  = preventDefaultForScrollKeys;
    }

    function enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.onmousewheel = document.onmousewheel = null; 
        window.onwheel = null; 
        window.ontouchmove = null;  
        document.onkeydown = null;  
    }

    return {
        off: disableScroll,
        on: enableScroll
    }
}