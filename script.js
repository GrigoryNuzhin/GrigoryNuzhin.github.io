// НЕ работает адаптацию под экран
/* Функционал язычка */
var showDisappear = $('.content > div .disappear'),
    divs = showDisappear.children('div'),
    DISAPPEARHEIGHT = 63,
    hide = {},
    flagAnimation = false,
    prependScrollHeight = 0;

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
$(document).on('click', function(e) {
    if (!(e.target.tagName == 'MAIN' ||
            e.target.tagName == 'HTML' ||
            e.target.tagName == 'P' ||
            e.target.tagName == 'SECTION' ||
            e.target.className == 'content clearfix' ||
            e.target.className == 'container')) return;
    if (!hide.flag) return;
    hide.flag = false;
    fDisappear(hide.div, hide.saveThis, hide.time);
});
/* Конец блока, функционал язычка */






/* Навигация */
function pageRead() {
    $('.vh').removeClass('vh');
    $(".col-md-5").removeClass('anop');
    effectMagic.remove();
}
/* Автоматическая прокрутка nav */
$('main > nav').click(function() {
    destination = $('#footer').offset().top;
    $('html, body').animate({ scrollTop: destination }, 1000); // HTML - необходимо для работы в браузере Safari!
    pageRead();
});
/* Конец этого блока */

/* Клавиатура */
window.onkeydown = function(e) { // Пришлось использовать встроенное события так как в jQuery есть заглушка для клавиш PageUp, PageDown и End.
        console.log('Вы ввели символ с клавиатуры. Его код равен ' + e.keyCode);
        if (e.keyCode == 33 || e.keyCode == 34 || e.keyCode == 35) { // PageUp - 33, PageDown - 34 и End - 35.
            pageRead(); // Если поставить на PageDown и End, стандартное поведение как при прокрутке, то придется их то придется их временно блокировать тоже, а самое главное так как разрез получается большой то страница будет далеко прыгать так что для них лучше сделать отдельное поведения для элементов в будущей версии этого сайта.
        }
    }
    /* Конец этого блока */

/* Конец блока навигации */

/* Инструменты для magic эффекта собственного написания */

$("body").append("<div class='effectMagic1'></div>");
$("body").append("<div class='effectMagic1'></div>");
$("body").append("<div class='effectMagic1'></div>");
$("body").append("<div class='effectMagic1'></div>");
var effectMagic = $(".effectMagic1"),
    effectMagicVanillaJS = document.getElementsByClassName("effectMagic1");


function randomPosition(div) {
    console.log(div.offsetWidth)
    div.style.left = Math.round(Math.random() * (div.parentElement.offsetWidth - parseInt(div.style.widht))) + "px";
    div.style.top = Math.round(Math.random() * (div.parentElement.offsetHeight - parseInt(div.style.height))) + "px";
}

function createElementsDivs(quantity) {
    for (var i = 0; i < effectMagicVanillaJS.length; i++) {
        for (var j = 0; j < quantity; j++) {
            var div = document.createElement("div");
            div.className = "cube";
            effectMagicVanillaJS[i].appendChild(div);
            randomPosition(div);
        }
    }
}
createElementsDivs(13);

function animationMagicCube() {
    effectMagicVanillaJS.children().each(function(index, div) {
        randomPosition(div, effectMagicVanillaJS);
    })
}
/* Конец этого блока инструменты для magic эффекта */

/* Показ анимаций при прокрутке */
/* Блок отладки отслеживания координат элемента */
var div = document.createElement("div");
document.body.appendChild(div);
div.className = "test"
    /* Конец этого блока */

var scrollSwitch = new ScrollSwitch(); // Нельзя сокращать до new ScrollSwitch().off()/new ScrollSwitch().on(); иначе будет создаваться новый объект в котором будет создаваться новая функция preventDefault из чего removeEventListener не удалит preventDefault старую функцию из события только для FF, а хром будет работать нормально потому что для его события addEventListener не используются.

function test() {
    // Функция для отладки показа элементов
    $('.vh').each(function(index, elem) {
        if (index > 5) return;
        $(elem).removeClass("vh");
    })
}
//test();



function scrollEffects(e) {
    var effectElem, DOTANIMATION = 100,
        scrollTopAnimation, withoutTemporalBlocking = $('.scroll-to-end')[1],
        withoutTemporalBlockingHeight = $(withoutTemporalBlocking).offset().top - $(window).innerHeight() + $(withoutTemporalBlocking).innerHeight(),
        x = $(window).innerWidth() / 2,
        y = $(window).innerHeight() - DOTANIMATION;
    // console.log("x =" + x + " y =" +  y);
    effectElem = document.elementFromPoint(x, y);
    // div.style.top = y + 10 + "px";
    // div.style.left = x + 10 + "px";
    //console.log($(window).scrollTop())

    /* magic эффект собственного написания (3) */
    if (~effectElem.className.indexOf("vh") && $(effectElem).data().effectname == "magic" && !flagAnimation) {
        var colMd = $(".col-md-5");
        flagAnimation = true;
        $(effectElem).removeClass("vh");
        scrollTopAnimation = $(effectElem).offset().top - $(window).innerHeight() + $(effectElem).innerHeight();
        $('html, body').animate({ scrollTop: scrollTopAnimation }, 500);
        scrollSwitch.off();
        setTimeout(function() {
            effectMagic.css({ "opacity": "1", "display": "block" });
            var lastMessage = $(".chat p:last-child")[0],
                objPos = $(lastMessage).offset();
            objPos.top = objPos.top + lastMessage.offsetHeight / 2;
            objPos.left = objPos.left + lastMessage.offsetWidth / 2 - effectMagic.height() / 2;
            effectMagic.offset(objPos);
            animationMagicCube();

            var delCube = 0,
                idInt = setInterval(function() {
                    animationMagicCube();

                    createElementsDivs(1)
                    console.log(effectMagic.children().length)
                    if (effectMagic.children().length > 200) {
                        clearInterval(idInt);


                        idInt = setInterval(function() {
                            if (effectMagic[0].children[delCube] === undefined) {
                                clearInterval(idInt);


                                setTimeout(function() {
                                    colMd.css("opacity", "1");
                                    // http://stackoverflow.com/questions/7134584/how-do-i-use-transitionend-in-jquery
                                    colMd.on('transitionend webkitTransitionEnd oTransitionEnd', function() {
                                        effectMagic.remove();
                                        flagAnimation = false;
                                        scrollSwitch.on();
                                    });
                                }, 50);
                                return;
                            };
                            /* Нельзя использовать больше 4 - то что есть уже будет накладно для производительность в FF */
                            effectMagic[0].children[delCube].style.opacity = 0;
                            effectMagic[1].children[delCube].style.opacity = 0;
                            effectMagic[2].children[delCube].style.opacity = 0;
                            effectMagic[3].children[delCube++].style.opacity = 0;
                        }, 20);
                    }
                }, 150);
            /* Перемещение 4 главных блоков к место с портфолио */
            setTimeout(function() {
                colMd.each(function(index, elem) {
                    $(effectMagic[index]).offset($(elem).offset());
                });
            }, 5000);
        }, 800); /* Дождемся конца прокрутки */



        return;
    }

    /* Конец блока magic эффект */

    /* В одной блокировки прокрутки сразу 2 анимации элемента (2) */
    if (~effectElem.className.indexOf("scroll-to-end") &&
        ~effectElem.className.indexOf("vh") || $(window).scrollTop() > withoutTemporalBlockingHeight && ~effectElem.className.indexOf("vh")) {
        if (flagAnimation) return;
        flagAnimation = true;
        $('html, body').animate({ scrollTop: withoutTemporalBlockingHeight + 30 }, 300);
        scrollSwitch.off();
        setTimeout(function() {
            $(".vh").each(function(index, elem) {
                $(elem).removeClass("vh");
                $(elem).animateCss($(elem).data().effectname, index == 0, 100);

            });

        }, 1000);
        return;
    }
    /* Конец этого блока */

    /* В одной блокировке прокрутки 1 анимация элемента (1) */
    if (!(~effectElem.className.indexOf("vh") || $('.vh').length == 1)) return;
    effectElem = $('.vh')[0];
    if (flagAnimation || !effectElem) return;
    if (!$(effectElem).data().effectname) {
        $(effectElem).removeClass("vh");
        return;
    }
    scrollTopAnimation = $(effectElem).offset().top - $(window).innerHeight() + $(effectElem).innerHeight() + DOTANIMATION;
    if (prependScrollHeight > $(window).scrollTop()) return;
    //console.log(scrollTopAnimation + "==" + $(window).scrollTop());    
    flagAnimation = true;
    prependScrollHeight = scrollTopAnimation;
    scrollSwitch.off();
    $('html, body').animate({ scrollTop: scrollTopAnimation }, 300);
    setTimeout(function() {
        $(effectElem).removeClass("vh");
        $(effectElem).animateCss($(effectElem).data().effectname, true);
    }, 1000);
    /* Конец этого блока */

} // scrollEffects() end



/* Немного подредактированное мной авторское расширения для показа анимаций с сайта https://github.com/daneden/animate.css. Используется (2)
и (1). */
$.fn.extend({
    animateCss: function(animationName, onOff, time) {
        onOff && scrollSwitch.off();
        time = time || 500
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            onOff && setTimeout(function() {
                scrollSwitch.on();
                flagAnimation = false;
                //console.log("animationend " + flagAnimation);
            }, time);
        });
    }
});
/* Конец этого блока */

function ScrollSwitch() { // Блокировка прокрутки. С сайта http://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily/4770179#4770179. Используется (2) и (1).
    var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

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
        window.ontouchmove = preventDefault; // mobile
        document.onkeydown = preventDefaultForScrollKeys;
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
} // ScrollSwitch() end

/* Конец блока, показ анимаций при прокрутке */


/*$(window).scroll(function (){
    $('.vh').each(function (){
        var imagePos = $(this).offset().top;
        var topOfWindow = $(window).scrollTop();
        if (imagePos < topOfWindow+$(window).height()-250) {
            $(this).removeClass("vh");
            $(this).addClass("animated " + $(this).data().effectname);
        }
    });
});﻿*/

/* Временная заплатка конфликта тени в css. Удалить если удастся решить это другим способом.*/
$("p.vh").each(function(index, elem) {
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
/* Конец этого блока */

/* При обновлении страницы перемотать в начало */
$(document).ready(function() {
    setTimeout(function() {
        //window.scrollTo(0, 1264);

        setTimeout(function() {
            window.onscroll = scrollEffects; // Запуск происходит специально отдельно, для того, чтобы элементы случайно не раскрывались при автоматическом скролле случайно раскрытых элементов.
        }, 200);

    }, 100);
});
/* Конец этого блока */
