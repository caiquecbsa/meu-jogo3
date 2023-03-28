var gary, crey, teste ;
var ataque, ataque2 , ataqueImgDireita, ataqueImgEsquerda;
var garyImgParado, lalauInimigo;
var chao, chao2, chaoE, fundoIMG;
var garyAtaqueD, garyAtaqueE;
var corridaDireita, corridaEsquerda, pulo;
var bolaFogo, bolaFogoIMG ;
var ataqueESP = 0;
var vida = 3;
var coletador = 0, teletra = 0;
var caixa, caixaIMG;
var icone, iconeIMG, ataqueArea, ataqueAreaIMG;
var tele1, tele2, teleIMG;
var laizer, laizerIMG;
var teleP, telePIMG;
var eleva, elevaIMG;


function preload(){
ataqueImgDireita = loadImage("assets/imported piskel (3).gif");
ataqueImgEsquerda = loadImage("assets/imported piskel (4).gif");
garyImgParado = loadImage("assets/Gparada.gif");
lalauInimigo = loadImage("assets/ini1.gif");
fundoIMG = loadImage("assets/começo1.gif");
garyAtaqueD  = loadImage("assets/Gataque.gif");
garyAtaqueE  = loadImage("assets/GataqueE.gif");
corridaDireita = loadAnimation("assets/GA1.gif");
corridaEsquerda = loadAnimation("assets/GA1-esquerda.gif");
//pulo  = loadImage("assets/Gpulo.png");
bolaFogoIMG = loadImage("assets/bolaDeFogo.gif");
caixaIMG = loadImage("assets/caixa.png");
iconeIMG = loadImage("assets/icone.gif");
ataqueAreaIMG = loadImage("assets/ataqueEspecial.gif");
teleIMG = loadImage("assets/tele.gif")
telePIMG = loadImage("assets/teleP.gif");
elevaIMG = loadImage("assets/eleva.png");
laizerIMG = loadImage("assets/laizer.gif");
} 


function setup(){
  createCanvas(4000,1300);

  teleP = createSprite(1500,300);
  teleP.addImage(telePIMG);
  teleP.scale = 2

  tele1 = createSprite(1100,300);
  tele1.addImage(teleIMG);
  tele1.scale = 4

  tele2 = createSprite(2900,380);
  tele2.addImage(teleIMG);
  tele2.scale = 4

  gary = createSprite(100,450,10,10);
  gary.scale = 2;
  //ADD TODAS AS IMAGENS AO GARY
  gary.addImage("parado", garyImgParado);
  gary.addAnimation("runing",corridaDireita);
  gary.addAnimation("runingEsquerda",corridaEsquerda);
  gary.addAnimation("ataque-direita", garyAtaqueD);
  gary.addAnimation("ataque-esquerda", garyAtaqueE);
  //gary.addImage("pulo", pulo);

  //teste = createSprite(200,450,60,300)

  caixa = createSprite(700,400);
  caixa.addImage(caixaIMG);
  caixa.scale = 9;

  icone = createSprite(700,300);
  icone.addImage(iconeIMG);
  icone.scale = 5

  crey = createSprite(500,440,10,10);
  crey.addImage(lalauInimigo);
  crey.scale = 1.5;

  ataque = createSprite(1, 1, 1, 1);
  ataque.addImage("faca",ataqueImgDireita);
  ataque.visible = false 
  ataque.scale = 0.2

  ataqueArea = createSprite(1,1,5,5);
  ataqueArea.addImage(ataqueAreaIMG);
  ataqueArea.scale = 5

  ataque2 = createSprite(1, 1, 1, 1);
  ataque2.addImage("faca", ataqueImgEsquerda);
  ataque2.visible = false 
  ataque2.scale = 0.2

  chao = createSprite(1200,450,2500,50);
  chao2 = createSprite(2850,500,400,50);
  chaoE = createSprite(3105,485,130,20);

  laizer = createSprite(1900,200,1,1);
  laizer.addImage(laizerIMG);
  laizer.scale = 7

  eleva = createSprite(3100,350);
  eleva.addImage(elevaIMG);
  eleva.scale = 4

  gary.debug = true;
  crey.debug = true;
  ataque.debug = true;
  caixa.debug = true;
  icone.debug = true
  ataqueArea.debug = true;
  laizer.debug = true;
  teleP.debug = true;
  tele1.debug = true;


  chao.visible = false; 
  chao2.visible = false; 
  icone.visible = false;
  ataqueArea.visible = false;

  caixa.setCollider("rectangle",2,-5,20,20);
  laizer.setCollider("rectangle",0,0,10,60);
  tele1.setCollider("rectangle",0,15,30,30);

}

function draw() {
  background(fundoIMG);
  
   gary.x = camera.x;
   gary.y = camera.y;


  if(ataque.isTouching(eleva)||ataque2.isTouching(eleva)){
    eleva.velocityY = 6;
    //chaoE.x = eleva.x + 30;
    chaoE.y = eleva.y +100;
  }

  if(gary.isTouching(teleP)){
    teleP.destroy();
    teletra +=1
  }

  if(keyDown("space") && gary.y >= 300) {
    gary.velocityY = -8;
    //gary.changeImage("pulo", pulo);
  }

  if(keyDown("d")){
    gary.changeAnimation("runing",corridaDireita);
    gary.x=gary.x+10 ;
    gary.scale = 2;
  }else if(keyDown("a")){
    gary.changeAnimation("runingEsquerda",corridaEsquerda);
    gary.scale = 2;
    gary.x=gary.x-10 ;
  }else{
    keyReleased();
  }

  if (ataque.isTouching(crey)||ataque2.isTouching(crey)) {
    crey.destroy();
    ataqueESP += 10;
  }

  if(ataqueESP >= 10 && keyDown("r")){
 bolaFogo = createSprite(gary.x,gary.y-20,20,20);
 bolaFogo.velocityX = 10
 bolaFogo.addImage(bolaFogoIMG);
 ataqueESP -= 10;
  }

  if(gary.isTouching(tele1) && keyDown("k") && teletra === 1){
  gary.x =tele2.x
  gary.y = tele2.y

  }

  if(keyDown("q")){
    gary.x=gary.x + 20 ;
  }

  gary.velocityY = gary.velocityY + 0.8;
  crey.velocityY = 8;
  gary.collide(chao);
  gary.collide(chao2);
  gary.collide(chaoE);
  crey.collide(chao);
  gary.collide(laizer);
  
  ataquePraEsquerda();
  ataquePraDireita();
  area();
  life();
  drawSprites();
 
}

function keyReleased(){
  gary.changeImage("parado", garyImgParado);
  ataque.visible = false;
  ataque2.visible = false;
  ataqueArea.visible
}

function ataquePraEsquerda(){

  if(keyDown(LEFT_ARROW)){
    gary.changeImage("ataque-esquerda", garyAtaqueE);
    ataque2.visible = true
    ataque2.x = gary.x - 30;
    ataque2.y = gary.y;
  }
}

function ataquePraDireita(){
  if(keyDown(RIGHT_ARROW)){
    gary.changeImage("ataque-direita", garyAtaqueD);
    ataque.visible = true
    ataque.x = gary.x + 30;
    ataque.y = gary.y;
  }
}

function area(){
  if(ataque.isTouching(caixa)||ataque2.isTouching(caixa)){
    caixa.destroy();
    icone.visible = true;
  }
  if(gary.isTouching(icone)){
    icone.destroy();
    coletador +=1
  }
  if(coletador === 1 && ataqueESP === 10 && keyDown("t")){
    coletador -= 1;
    ataqueArea.y = gary.y - 10;
    ataqueArea.x = gary.x;
    ataqueArea.visible = true;
  }else{
    //ataqueArea.visible = false;
  }
  if (ataqueArea.isTouching(crey)) {
    crey.destroy();
    ataqueESP += 10;
  }
}

function life(){
  if(gary.isTouching(crey) && vida === 3){
    vida -= 1;
    }
    if(gary.isTouching(crey) && vida === 2){
      vida -= 1;
      }
      if(gary.isTouching(crey) && vida ===1){
        vida -= 1;
        }
        if(gary.isTouching(crey) && vida === 0){
          gary.destroy()
          }
}
