var backI,back;
var monkey, monkeyr;
var ground

var bangroup, bananaI;
var stonegroup, obstacleI;

var gameover;
var score=0;


function preload(){
  backI=loadImage("jungle2.jpg");
  monkeyr = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  

  bananaI = loadImage("Banana.png");
  obstacleI = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  back=createSprite(0,0,800,400);
  back.addImage(backI);
  back.scale=1.5;
  back.x=back.width/2;
  back.velocityX=-4;
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("r",monkeyr);
  monkey.scale = 0.2;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  bangroup = new Group();
  stonegroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(back.x<100){
    back.x=back.width/2;
  }
  
    if(bangroup.isTouching(monkey)){
      bangroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
  
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);
    spawnFood();
    spawnObstacles();
 
    if(stonegroup.isTouching(monkey)){  
        monkey.scale=0.15;
     // score=score-2;
    }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaI);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add each banana to the group
    bangroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var stone = createSprite(800,350,10,40);
    stone.velocityX = -6;
    stone.addImage(obstacleI);
    
    //assign scale and lifetime to the obstacle     
    stone.scale = 0.2;
    stone.lifetime = 300;
    
    //add each obstacle to the group
    stonegroup.add(stone);
  }
}


  
