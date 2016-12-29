var hasLastClickFlag = false, // Для временного показа неправильного последнего элемента.
    date = 0,
    SIZERATING = 1e5,
    SIZEHP = 10,
    stateHp = SIZEHP,
    ratingFlag = true,
    transitionendFlag = false;
arryIcons = [],
    clickElements = [],
    clickCounter = 0,
    isContinueQuantityIcons = 0,
    quantityIcons = 6,
    quantityIconsCopy = 2;

function getImg(src) {
    var img = document.createElement("img");
    img.src = src;
    return img;
}

function wrapDiv(elem) {
    var div = document.createElement("div");
    div.appendChild(elem);
    return div;
}

function hyperbola(x) {
    var y = 1000 / x;
    return Math.ceil(y * SIZERATING);
}


function rating() {
    if (ratingFlag) date = Date.now();
    ratingFlag = false;
    return hyperbola(Date.now() - date);
}

function hpF() {
    var hp = document.getElementById("hp"),
        string = "";
    for (var i = 0; i < stateHp; i++) {
        if (i < 3) string += "<img src=\"img/twinkle" + 1 + ".png\"> ";
        else if (i < 8) string += "<img src=\"img/twinkle" + 3 + ".png\"> ";
        else string += "<img src=\"img/twinkle" + 2 + ".png\"> ";
    }
    hp.innerHTML = string;
    stateHp--;
}

function loadIco() {
    var img = [];
    for (var i = 0, j = 0; i < 83; i++) {
        img[i] = getImg("img/" + i + ".png");
    }

    for (var i = 0; i < 83; i++) {
        var div = wrapDiv(wrapDiv(img[i]));
        div.className = "ico";
        arryIcons[i] = div;
    }
}
loadIco();

function toDownloadAllErrorImgs() {
    var imgs = document.querySelectorAll("img");

    for (var i = 0, j=0; i < imgs.length; i++, j+=100) {       
        function f(){
            imgs[f.i].src = imgs[f.i].src;
        }
        f.i = i;
        setTimeout(f, j);
    }

}


window.onload = function() {
    setTimeout(toDownloadAllErrorImgs, 1500);
    hpF();
    var contentGame = document.getElementById("gaming-field");

    function addIconsInContentGame(quantity) {
        arryIcons.sort(function() {
            return Math.random() - 0.5;
        });
        for (var i = 0; i < quantity; i++) {
            contentGame.appendChild(arryIcons[i]);
        }
        quantityCopyElemetns(quantityIconsCopy);

        function quantityCopyElemetns(quantityCopy) {
            quantityCopy--;
            for (var i = 0; i < quantityCopy; i++) {
                for (var j = 0; j < quantity; j++) {
                    contentGame.appendChild(arryIcons[j].cloneNode(true));
                }
            }

        }
    }

    function addDivs(size, quantity) {
        for (var i = 0; i < quantity; i++) {
            var div = document.createElement("div");
            contentGame.appendChild(div);
            div.style.width = size + 2 + "px";
            div.style.height = size + 2 + "px";
        }
    }


    addIconsInContentGame(quantityIcons);
    addDivs(64, 12);

    function mixImgOnDiv() {
        var contentGameM = [];
        for (var i = 0; i < contentGame.children.length; i++) {
            contentGameM[i] = contentGame.children[i];
        }
        contentGameM.sort(function() {
            return Math.random() - 0.5;
        });
        for (var i = 0; i < contentGameM.length; i++) {
            contentGame.appendChild(contentGameM[i]);
        }

    }

    function imgImposeNewImg() {
        var images = contentGame.querySelectorAll("img");
        for (var i = 0; i < images.length; i++) {
            var img = getImg("img/console.png");
            img.className = "hide-imgs";
            document.body.appendChild(img);
            images[i].parentElement.appendChild(img);
        }
    }


    mixImgOnDiv();
    imgImposeNewImg();

    contentGame.ondragstart = function() {
        return false;
    };

    function reset() {
        hasLastClickFlag = false;
        clickElements = [];
        clickCounter = 0;
    }

    function gameField(event) {

        if (event.target.tagName !== "IMG") return;
        var isThisClick = clickElements.some(function(elem, index, array) {
            return elem === event.target;
        });

        if (isThisClick || hasLastClickFlag) return;

        var targetIcoImg = event.target.parentElement;

        if (targetIcoImg.className) return;

        clickElements[clickCounter++] = targetIcoImg.firstChild;
        rating();
        if (clickElements.length > 1) {
            var isTrueClicks = clickElements.every(function(elem, index, array) {
                if (index > 0) {
                    return (array[index - 1] !== array[index]) ==
                        (array[index - 1].getAttribute("src") == array[index].getAttribute("src"));
                }
                return true;
            });
        }

        var divWrapImage = event.target.parentNode;

        divWrapImage.className = "open-animation";



        function openElems(openElements) {
            for (var i = 0; i < openElements.length; i++) {
                openElements[i].className = "open";
            }
        }
        //console.log(clickElements)
        if (clickCounter === quantityIconsCopy) {
            var openAnimation = contentGame.querySelectorAll(".open-animation"),
                isQuantityCopyElemetns = clickElements.every(function(elem) {
                    return divWrapImage.firstChild.getAttribute("src") === elem.getAttribute("src");
                });
            if (isQuantityCopyElemetns) {

                if (++isContinueQuantityIcons === quantityIcons - 1) {
                    var divsNoneClassName = contentGame.querySelectorAll('.ico div:not(.open)');
                    hasLastClickFlag = true;

                    var resultRating = rating();
                    setTimeout(function() {
                        ratingFlag = true;
                        openElems(divsNoneClassName);
                        reset();
                        setTimeout(function() {
                            victoryEndGameOver("Вы выиграли! Ваш результат " + resultRating + ".", "green", contentGame.parentElement);
                        }, 900);
                    }, 100);
                    return;
                }
                openElems(openAnimation);
                reset();
            }
        }

        if (isTrueClicks === false) {
            hasLastClickFlag = true;

            setTimeout(function() {
                var openAnimation = contentGame.querySelectorAll(".open-animation");

                for (var i = 0; i < openAnimation.length; i++) {
                    openAnimation[i].className = "";
                }
                hpF();
                if (stateHp < 0) {
                    contentGame.onclick = null;
                    setTimeout(function() {
                        victoryEndGameOver(" Вы проиграли! ", "red", contentGame)
                    }, 900);
                }
                reset();
            }, 500);

        }
    }
    contentGame.onclick = gameField;
    var repeatButton = document.getElementById("repeat");

    function repeat() {
        var openAnimations = contentGame.querySelectorAll(".open-animation, .open");
        for (var i = 0; i < openAnimations.length; i++) {
            openAnimations[i].className = "";
        }
        reset();
        isContinueQuantityIcons = 0
        ratingFlag = true;
        stateHp = SIZEHP;
        hpF();
        mixImgOnDiv();
    }

    repeatButton.onclick = repeat;

    function victoryEndGameOver(text, className, screenGame) {
        var div = document.createElement("div"),
            prScreenGame,
            messageDiv;
        div.appendChild(document.createTextNode(text));
        div.className = className;
        messageDiv = wrapDiv(wrapDiv(wrapDiv(div)));
        messageDiv.className = "message";
        prScreenGame = screenGame.closest("#content-game");



        prScreenGame.addEventListener("transitionend", function repeatWraper() {
            repeat();
            prScreenGame.removeEventListener("transitionend", repeatWraper);



            setTimeout(function() {
                prScreenGame.parentElement.onclick = function() {
                    mixImgOnDiv();
                    transitionendFlag = true;
                    prScreenGame.id = "content-game";
                    prScreenGame.addEventListener("transitionend", function messageDivRemove() {
                        messageDiv.remove();
                        prScreenGame.removeEventListener("transitionend", messageDivRemove);
                    });
                    prScreenGame.parentElement.onclick = null;
                    contentGame.onclick = gameField;
                }
            }, 200);
        });

        if (className === "green") {
            prScreenGame.appendChild(messageDiv);
            prScreenGame.id = "victory";
        } else {
            prScreenGame.insertBefore(messageDiv, prScreenGame.firstChild);
            prScreenGame.id = "game-over";
        }

    } // victoryEndGameOver() end

}; // window.onload end
