var roadImg, road;
var cop, carImg;
var prisoner, prisonerImg;
var fuel, fuelImg;
var fuelGroup;
var fuelAmount = 5;
var danger, screwImg;
var screwGroup;
var gameState = "play";
var score = 0;

function preload()
{
  roadImg = loadImage("road.png");
  carImg = loadImage("Cops.png");
  prisonerImg = loadImage("prisoner.png");
  fuelImg = loadImage("fuel.png");
  screwImg = loadImage("screw.png");
}

function setup() 
{
  createCanvas(windowWidth - 20, windowHeight);
  
  road = createSprite(windowWidth/2, windowHeight/5);
  road.addImage(roadImg);
  road.scale = 2.5;
  road.velocityY = 2;
  
  cop = createSprite(windowWidth/2, 700);
  cop.addImage(carImg);
  cop.scale = 0.35;
  
  prisoner = createSprite(windowWidth/2, 450, 10, 50);
  prisoner.addImage(prisonerImg);
  prisoner.scale = 0.28;

  
  screwGroup = new Group();
  fuelGroup = new Group();
 
}

function draw() 
{
  
   background("white");

    camera.position.x = displayWidth/2;
    camera.position.y = prisoner.y;


      //displaying fuel amount
    fill("red");
    textSize(20);
    text("Fuel Amount:" + fuelAmount, 100, 100);
    
    //displaying score
    fill("blue");
    textSize(20);
    text("Score:" + score,  1300, 100);

   if (gameState === "play")
   {
      if (road.y > 500)
      {
        road.y = windowHeight/2;
      }

      if(keyDown("right_arrow"))
      {
        prisoner.x = prisoner.x + 10;
      }
 
      if(keyDown("left_arrow"))
      {
        prisoner.x = prisoner.x - 10;
      }

      fuelSpawn();
      screws();

      if (frameCount % 180 === 0)
      {
        fuelAmount = fuelAmount - 1;
      }
    
      //increasing fuel by 1 if is touched
      if (fuelGroup.isTouching(prisoner))
        {
          fuelAmount = fuelAmount +1;
          fuelGroup.destroyEach();
        }
    
      if (screwGroup.isTouching(prisoner) || (fuelAmount === 0))
      {
        
        gameState = "end";
      }

      //increasing score evry 60 frames
      if (frameCount % 60 === 0)
        {
          score = score + 1;
        }

      
      
    }


     
     if (gameState === "end")
     {
       screwGroup.destroyEach();
       fuelGroup.destroyEach();
       cop.destroy();
       prisoner.destroy();
       road.destroy();
       score = 0;
       fuelAmount = 0;
       fill("yellow");
       textSize(25);
       text("GAME OVER!", 700,500);
       
     }
     
  
  
  
     drawSprites();


}

function fuelSpawn()
{
  if (frameCount % 150 === 0)
  {
    fuel = createSprite(random(400, 800), random(0, 200));
    fuel.velocityY = 3;
    fuel.lifetime = 300;
    fuel.addImage(fuelImg);
    fuel.scale = 0.1;
    fuelGroup.add(fuel);
  }
}

function screws()
{
  if (frameCount % 100 === 0)
  {
    danger = createSprite(random(400, 800), random(0, 400));
    danger.velocityY = 3;
    danger.lifetime = 300;
    danger.addImage(screwImg);
    danger.scale = 0.15;
    screwGroup.add(danger);
  }
}
