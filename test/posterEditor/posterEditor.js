var content = document.querySelector(".col-md-12");
// replaceBg(content.querySelector(".poster"), "default_bg.jpg"); // Если закоментировать то не будет работать, создания скриншетов.

starPoster();

/* Работа с текстом */
var divEdit = content.querySelector("div.edit");

controlFormatText(divEdit);
placeholder(divEdit);
divEdit.oninput = function(){
	placeholder(this);
	controlFormatText(this);
};
/* Конец блока работа с текстом */

/* Кнопки навигации */
document.querySelector(".arrowLeft").onclick = function(){
	var arrHref = document.querySelector(".imgListHref").textContent.split("\n");
	replaceBg(content.querySelector(".poster"), arrHref[back(arrHref)].trim());
}
document.querySelector(".arrowRight").onclick = function(){
	var arrHref = document.querySelector(".imgListHref").textContent.split("\n");
	replaceBg(content.querySelector(".poster"), arrHref[next(arrHref)].trim());
	
}
var winIndex = 0;
document.querySelector("button").onclick = function(){
	var win = window.open(location.href, "Poster Editor win" + winIndex++, "width=550,height=413");
	
	win.onload = function(){
		win.document.querySelector("main").remove();
		var main = document.querySelector("main").cloneNode(true);
		main.style.margin = "0";
		main.style.padding = "0";
		main.style.overflow = "hidden";
		
		win.document.body.appendChild(main);
		
		win.document.querySelector(".poster").innerHTML="";		
		var wrap = document.querySelector(".wrap").cloneNode(true);
		
		var edit = wrap.querySelector(".edit");
		edit.innerHTML = edit.innerHTML.replace(/\n/g,"<br>");		
		edit.removeAttribute("contenteditable","true");

		win.document.querySelector(".poster").appendChild(wrap);
	}	
}
/* Конец блока кнопки навигации */

/* Блок функций */

function starPoster(){
	var arrHref = document.querySelector(".imgListHref").textContent.split("\n");
	replaceBg(content.querySelector(".poster"), arrHref[ramdomIndxeArray(arrHref)].trim());
	
	function ramdomIndxeArray(arr){
		return Math.floor(Math.random()*arr.length);
	}
}

function nav(){
	var index = -1;
	return{
		next: function(arr){
		if(arr.length-1 > index) return ++index;
		index = 0;
		return index;
	},
	 back: function(arr){
		if(index > arr.length-1 || index < 0) index = 0;
		if(0 < index) return --index;
		index = arr.length-1;
		return index;
	}
};
}
var nav = nav(),
next = nav.next,
back = nav.back;


/* Работа с текстом */ 
function placeholder(elem){
	if(elem.textContent==""){
		elem.className = "edit noneEdit";
	} else {
		elem.className = "edit";
	}
}

function controlFormatText(elem){
	var textLenth = elem.textContent.length;
	if(textLenth<104){		
		elem.style.fontSize = "36px"; // "38px"
		elem.style.lineHeight = "44px";
		
	} else if(textLenth<160){		
		elem.style.fontSize = "34px";
		elem.style.lineHeight = "40px";	 
	} else if(textLenth<216){
		elem.style.fontSize = "30px";
		elem.style.lineHeight = "39px";
	} else if(textLenth<300){
		elem.style.fontSize = "24px";
		elem.style.lineHeight = "34px";
	} else if(textLenth<450){
		elem.style.fontSize = "20px";
		elem.style.lineHeight = "30px";
	} else if(textLenth<600){
		elem.style.fontSize = "18px";
		elem.style.lineHeight = "25px";
	} else {
		elem.style.fontSize = "16px";
		elem.style.lineHeight = "19px";
	}
}


document.getElementById("btn-download").addEventListener("click", function(e) {
    makeScreenshot(".poster");
});


function makeScreenshot(contentImg) {
// Размеры div элемента, зависят от настройки css.
    html2canvas(document.querySelector(contentImg), { allowTaint: true, useCORS: false }).then(contentImgCanvas => {
        var canavasElems = document.querySelectorAll("canvas");
        
        for (var i = 0; i < canavasElems.length; i++) {
            canavasElems[i].remove();
        }

        document.querySelector(".poster").appendChild(contentImgCanvas);       
    });

};

/* Конец блока работы с текстом */

function replaceBg(elem, urlbg){
	if(!urlbg.trim()) return;
	elem.style.backgroundImage = "url(" + urlbg + ")";
}

/* Конец блока функций */