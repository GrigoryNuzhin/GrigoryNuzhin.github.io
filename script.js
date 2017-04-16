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


/* Автоматическая прокрутка nav */
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
var x = "200px", y="100px", flagAnimation = false;

var scrollSwitch = new ScrollSwitch(); // Нельзя сокращать до new ScrollSwitch().off()/new ScrollSwitch().on(); иначе будет создаваться новый объект в котором будет создаваться новая функция preventDefault из чего removeEventListener не удалит preventDefault старую функцию из события только для FF, а хром будет работать нормально потому что для его события addEventListener не используются.

function test(){
    $('.vh').each(function(index, elem){
        if(index > 4) return;
        $(elem).removeClass("vh");
    })
}
test();

function scrollEffects(e) {
    var effectElem, DOTANIMATION = 100,
        scrollTopAnimation;
    x = $(window).innerWidth() / 2;
    y = $(window).innerHeight() - DOTANIMATION;
    // console.log("x =" + x + " y =" +  y);
    effectElem = document.elementFromPoint(x, y);
    div.style.top = y + 10 + "px";
    div.style.left = x + 10 + "px";
    if (!(~effectElem.className.indexOf("vh") || $('.vh').length==1)) return;
    effectElem = $('.vh')[0]; // "Не все так быстро ;-)"
    //$('html, body').animate({scrollTop: $(effectElem).offset().top}, 1000);
    //console.dir(e);
    //console.log(flagAnimation)
    if (flagAnimation || !effectElem) return;
    scrollTopAnimation = $(effectElem).offset().top - $(window).innerHeight() + $(effectElem).innerHeight() + DOTANIMATION;
    //console.log(scrollTopAnimation + "==" + $(window).scrollTop());
    flagAnimation = true;
    scrollSwitch.off();
    $('html, body').animate({ scrollTop: scrollTopAnimation }, 300);
    setTimeout(function() {
            $(effectElem).removeClass("vh");
            $(effectElem).animateCss($(effectElem).data().classname, true);
        }, 1000) // превый любая прокрутка, проматать оставить необходимый размер элемента с низу, показать элемент с анимацие, во время этого его прокрутить будет нельзя.

    

    // console.log(document.elementFromPoint(x, y));

   
}



$.fn.extend({
    animateCss: function (animationName, onOff, time) {
        onOff && scrollSwitch.off();
        flagAnimation = true;
        time = time || 500
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            onOff && setTimeout(function(){
                scrollSwitch.on();
                flagAnimation = false;
            },time);
        });
    }
});


// http://getinstance.info/articles/javascript/css3-animation-javascript-event-handlers/


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
$(document).ready(function() {
    setTimeout(function() {
        window.scrollTo(0, 1264);

        setTimeout(function() {
        window.onscroll = scrollEffects; // Запуск происходит специально отдельно, для того, чтобы элементы случайно не раскрывались при автоматическом скролле случайно раскрытых элементов.
    }, 200);

    }, 100);
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