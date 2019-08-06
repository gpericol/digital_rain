/*
*  Copyright (C) 2019 Gianluca Pericoli, All Rights Reserved.
*
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License version 2 as
* published by the Free Software Foundation.
*
*/

// the rainy charset, this one seems like the original
let charSet = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ㄥ9ގㄣƐᄅ⇂ ";

// alpha channel manages the chars disappearing effect  0.040 is cool
let backgroundColor = "rgba(0, 0, 0, 0.040)";
let fontSize = 18;
let dropPercent = 0.2;
let fastDropsPercent = 0.2;
let slowDrops = 50;
let fastDrops = 30;

// like a gradient from white to green 
let fontColor1 = "#FFFFFF";
let fontColor2 = "#99FF99";
let fontColor3 = "#33FF33";
let fontColor4 = "#00FF00";

 
let dictionary = charSet.split("");
let columns = 0; 
let rows = 0; 
let drops = [];
let fast = [];
let oldChar1 = [];
let oldChar2 = [];
let oldChar3 = [];

let canvas = document.getElementById("digitalRain");
let ctx = canvas.getContext("2d");
let resizeTimeout = null;

function init(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    
    columns = canvas.width/fontSize;
    rows = canvas.height/fontSize;
    
    for(let x = 0; x < columns; x++){
        drops[x] = 0;
        fast[x] = 0;
        oldChar1[x] = "";
        oldChar2[x] = "";
        oldChar3[x] = "";
    }
}

function drawRect(){
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw(all){
    drawRect();
    
    ctx.font = "bold " + fontSize + "px Courier";
    for(let i = 0; i < drops.length; i++){
        if( all || fast[i] ){
            let text = dictionary[Math.floor(Math.random()*dictionary.length)];
            ctx.fillStyle = fontColor1;
            ctx.fillText(text, i*fontSize, drops[i]*fontSize);
            ctx.fillStyle = fontColor2;
            ctx.fillText(oldChar1[i], i*fontSize, (drops[i] - 1)*fontSize);
            ctx.fillStyle = fontColor3;
            ctx.fillText(oldChar2[i], i*fontSize, (drops[i] - 2)*fontSize);
            ctx.fillStyle = fontColor4;
            ctx.fillText(oldChar3[i], i*fontSize, (drops[i] - 3)*fontSize);

            oldChar3[i] = oldChar2[i];
            oldChar2[i] = oldChar1[i];
            oldChar1[i] = text;

            if(drops[i]*fontSize > canvas.height && Math.random() < dropPercent){
                drops[i] = 0;
                fast[i] = Math.random() < fastDropsPercent;
            }
            drops[i]++;
        }
    }
}

// prevent glitchy resize
window.onresize = function(event) {
    if(resizeTimeout != null){
        clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(init, 250);
};

init();
setInterval(draw, fastDrops, false);
setInterval(draw, slowDrops, true);