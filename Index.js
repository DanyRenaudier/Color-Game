var body= document.body;
var colorDisplay= document.querySelector("#colorDisplay");
var squares= document.querySelectorAll(".square");
var colors= generateRandomColor(6);
var pickedColor= colors[pickRandomColor(6)];
var message= document.getElementById("message");
var h1= document.getElementById("h1");
var btnHard= document.getElementById("hard");
var btnEasy= document.getElementById("easy");
var mode=6;
colorDisplay.textContent= pickedColor.toUpperCase();
message.textContent=".";


var btnReset=document.getElementById("reset");

//Evento Boton Reset
btnReset.addEventListener("click", function(){
    reset(mode);
    fadeIn(mode);
})

//Evento Boton Easy
btnEasy.addEventListener("click", function(){
    mode=3;
    this.classList.add("selected");
    btnHard.classList.remove("selected");
    reset(mode)

    fadeIn(mode);
    fadeOut(mode)
})

//Evento Boton Hard
btnHard.addEventListener("click", function(){
    mode=6;
     
    this.classList.add("selected");
    btnEasy.classList.remove("selected");
    reset(mode);
    
    fadeIn(mode);
    fadeOut(mode);
})

//aplica las funciones a todos los cuadrados
squares.forEach(function(square, index){
    square.style.backgroundColor= colors[index];
    fadeOut(mode);
    square.addEventListener("click", function(){
        var colorMatch= this.style.backgroundColor;
        
        if(colorMatch !== pickedColor){
            this.style.backgroundColor = body.style.backgroundColor;
            fadeIn("false");
        }
        else{
            fadeIn("true");
            h1.style.backgroundColor = pickedColor;
            
            squares.forEach(function(square){
                square.style.backgroundColor= pickedColor;
            })
            document.querySelector("#reset").textContent="Play Again?";
        }
    }) 
})

//Elige un color random dentro del array
function pickRandomColor(num){
    return Math.floor(Math.random()*num);
}

//Crea colores random y almacena colores random en el array
function generateRandomColor(num){
    var color=[];

    for(var i=0; i<num;i++){
         color[i]= "rgb("+Math.floor(Math.random()*255)+", "+Math.floor(Math.random()*255)+", "+Math.floor(Math.random()*255)+")";
    }
    return color;   
}

//Funcion para boton Reset
function reset(num){
    colors=generateRandomColor(num);
    pickedColor= colors[pickRandomColor(num)];
    colorDisplay.textContent=pickedColor.toUpperCase();

    if(mode==3){
        for(var i=3; i<squares.length; i++){
            squares[i].style.display= "none";
        }
    }
    else{
        for(var i=3; i<squares.length; i++){
            squares[i].style.display= "block";
        }
    }
    
    squares.forEach(function(square, index){
        square.style.backgroundColor= colors[index];
    })
    document.querySelector("#reset").textContent="New Colors";
    message.textContent= null;
    h1.style.backgroundColor= "rgba(0, 247, 255, 0.452)";
}

function fadeIn(mode){
    message.style.trasition="1.2s ease-out";
    message.style.color="black";

    if(mode===3){
        message.textContent="Easy Mode";
    }
    else if(mode===6){
        message.textContent="Hard Mode";
    }
    else if(mode=="true"){
        message.textContent="Correct!";
    }
    else if(mode==="false"){
        message.textContent="Try Again!";
    }
}

function fadeOut(mode){
    message.style.trasition="0s ease-out";
    message.style.color="white";
    if(mode===3){
        message.textContent="Easy Mode";
    }
    else if(mode===6){
        message.textContent="Hard Mode";
    }
}

//comportamiento de los mensajes de dificultad
function showMode(){
    
    $("#easy").mouseover(function(){
        message.style.color="black";
        if(mode!=3){
        message.textContent= "Wanna set Easy?" 
        }
        else{
            message.textContent="Click to reset Easy!"
        }
    })
    $("#hard").mouseover(function(){
        message.style.color="black";
        if(mode!=6){
            message.textContent= "Wanna set Hard?" 
            }
            else{
                message.textContent="Click to reset Hard!"
            }
    })
    $(".btn").mouseleave(fadeOut)
}

showMode();
