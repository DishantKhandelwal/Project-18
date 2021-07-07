var monkey, monkey_running;
var banana , bananaImage , obstacle , obstacleImage;
var bananasGroup , obstaclesGroup;
var backgroundImage , background;
var score;

function preloa() {
  backgroundImage = loadImage("jungle.jpg");
 
  monkey_running = loadAnimation ("Monkey-01.png","Monkey-02.png","Monkey-03.png","Monkey-04.png","Monkey-05.png","Monkey-06.png","Monkey-07.png","Monkey-08.png","Monkey-09.png","Monkey-10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  
}

function setup() {
  createCanvas(700, 450);
  
  background = createSprite(0,0,700,450);
  background.addImage(backgroundImage);
  background.scale = 1.5;
  
  monkey = createSprite(100,400,20,20);
  monkey.addAnimation("monkey_running" , monkey_running);
  monkey.scale= 0.2;
  
  ground = createSprite(100,420,700,20);
  ground.x = ground.width/2;
  ground.visible = false;
  
  obstaclesGroup = createGroup();
  bananasGroup = createGroup();
  
  score = 0;
}

function draw() {
  background.velocityX = -3;
  
  if (background.x < 0){
    background.x = background.width/2;
  }
  
  if(bananasGroup.isTouching(monkey)){
    bananasgroup = bananasGroup.destroyEach();
    score = score+2;
  }
  
  switch(score){
    case 10: monkey.scale = 0.22;
      break;
    case 20: monkey.scale = 0.24;
      break;
    case 30: monkey.scale = 0.26;
      break;
    case 40: monkey.scale = 0.28;
      break;
  }
  
  if(obstaclesGroup.isTouching(monkey)){
    monkey.scale = 0.2;
  }
  
  if(keyDown("space") && monkey.y>=250){
    monkey.velocityY = -11;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  
  spawnObstacles();
  spawnbananas();
  
  drawSprites();
  
  fill("white")
  text("Score :" + score,500,50);
}

function spawnBananas(){
  if(frameCount % 160 ===0){
    banana = createSprite(600,100,40,10);
    banana.y = math.round(random(250,300));
    banana.addImage(bananaImage);
    banana.scale = 0.2;
    banana.velocityX = -3;
    banana.lifetime = 500;
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth+1;
    bananasGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 140 ===0){
    obstacle = createSprite(500,530,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.25;
    obstacle.velocityX = -4;
    obstacle.lifetime = 500;
    obstaclesGroup.add(obstacle);
  }
  }