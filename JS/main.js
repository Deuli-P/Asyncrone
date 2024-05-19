const canvasBG = document.querySelector("#bg-canvas");
const canvasBird = document.querySelector("#bird-canvas");
const canvasWidth = 320;
const CanvasHeight = 180;
const ctxBg = canvasBG.getContext("2d");
const ctxBird = canvasBird.getContext("2d");

import Bird from './class/Bird.js';

let json;
let frameIndex = 0; 
let imageBird = new Image();
let position = { x: canvasWidth / 2, y: CanvasHeight / 2 };
const imgBG = [ 
    "./../assets/img/Sky_Background_0.png",
    "./../assets/img/Sky_Background_1.png",
    "./../assets/img/Sky_Background_2.png"
];

// BUILD BG CANVAS
const buildBG = async () => {
    for (const image of imgBG) {
        const img = await loadImg(image)
        await new Promise((resolve) => {
            img.onload = () => {
                ctxBg.drawImage(img, 0, 0, canvasWidth, CanvasHeight);
                resolve();
            };
        });
    }
};

async function init(){
    console.log('init');
    try{
        buildBG();
        json = await loadJson();
        imageBird.src = json.file; // Charger l'image du bird
        imageBird.onload = () => { // Attendre que l'image soit chargée
            requestAnimationFrame(birdCanvas);
        };
    }
    catch{
        err => console.log("Error init fetchJson:", err);
    }
}

const loadImg = async(src)=> {
    try{
        const img = new Image();
        img.src = src
        return img

    }
    catch{
        err => {
            console.log("Error Load Image:",err);
        }
    }
}

async function loadJson(){
    return await fetch('./../assets/data/Bird_Spritesheet.json')
    .then(res => res.json())
    .then(jsonData => {
        console.log("[FETCH]JSON file location:", jsonData.file);
        return jsonData;
    });
}

// Construction du bird dans la canvas qui s'actualise avec l'intervalle
const birdCanvas = () => {
    ctxBird.clearRect(0, 0, canvasWidth, CanvasHeight);
    const sprites = json.sprites[frameIndex];
    const bird = new Bird(sprites.x*1, sprites.y*1, sprites.width*1, sprites.height*1);
    bird.draw(ctxBird, imageBird, position);
    if(frameIndex+1 === json.sprites.length){
        frameIndex = 0 
    }
    else{
        frameIndex ++
    }
    requestAnimationFrame(birdCanvas); 
}

const MovementY = (number)=> {
    if (position.y >= canvasBird.height) {
        position.y = canvasBird.height;
    } else if (position.y == 1) {
        return
    } else {
        position.y += number;
        console.log("y:", position.y);
    }
}

const MovementX = (number)=> {
    if (position.x >= canvasBird.width) {
        position.x = canvasBird.width;
    } else if (position.x == 1) {
        return
    } else {
        position.x += number;
        console.log("x:", position.x);
    }
}

window.addEventListener('keydown',(e)=> {
    let number = 5;
    const touche = e.key;
    console.log(e.key);
    if(touche === 'ArrowRight' ){
        MovementX(number);
    }
    if (touche === 'ArrowLeft'){
        MovementX(-number);
    }
    if(touche === "ArrowDown"){
        MovementY(number);
    }
    if(touche ==='ArrowUp'){
        MovementY(-number);
    } else {
        return;
    }
});

init();