
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
var boyImg, treeImg;
var mangoImg, stoneImg;
var flyFlag=false;

function preload()
{
  boyImg=loadImage("../img/plucking_mangoes/boy.png");
  treeImg=loadImage("../img/plucking_mangoes/tree.png");
}

class Tree extends StaticImg {
    constructor(x, y, width, height){
      super(x,y,width,height);
      this.image = loadImage("../img/plucking_mangoes/tree.png");
    } 
};

class Boy extends StaticImg {
    constructor(x, y, width, height){
      super(x,y,width,height);
      this.image = loadImage("../img/plucking_mangoes/boy.png");
    } 
}

class Mango extends BaseClass {
	constructor(x, y, width, height){
		super(x,y,width,height);
		Body.setStatic(this.body,true);
		this.image = loadImage("../img/plucking_mangoes/mango.png");
	  }

}
/*
class Stone extends BaseClass {
	constructor(x,y){
		super(x,y,50,50);
		this.image = loadImage("../img/plucking_mangoes/stone.png");
	  }
}
*/
class Stone {
	constructor(x,y,w,h){
		var options = {
			restitution: 0,
			friction: 1,
			density: 1.2,
			isStatic: false
		}
		this.body = Bodies.rectangle(x, y, w, h, options);
        this.width = w;
        this.height = h;
        this.image = loadImage("../img/plucking_mangoes/stone.png");
        World.add(world, this.body);
      }
      display(){
        var angle = this.body.angle;
        push();
        translate(this.body.position.x, this.body.position.y);
        // rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, 0, this.width, this.height);
        pop();
      }
}

class SS {
  constructor(point2, body1) {
      var options = {
          'bodyA': body1,
          'pointB': point2,
          'stiffness': 0.004,
          'length': 1
          
      }
      this.bodyA=body1;
      this.pointB=point2;
     // this.bodyB=bodyB;
      this.sling=Constraint.create(options);
      World.add(world,this.sling);       
  }

  fly() {
      //this.sling.pointA=null;
      this.sling.bodyA=null;
     
  }

  reset(stonebody)
  {
    this.sling.bodyA=stonebody;
  }

  display() {
      if(this.sling.bodyA)
      {
        var pointA=this.bodyA.position;
        var pointB=this.pointB;
        strokeWeight(3);
        line(pointA.x,pointA.y,pointB.x,pointB.y);
        //line(this.sling.bodyA.position.x,this.sling.bodyA.position.y, this.bodyB.position.x+this.pointB.x,this.bodyB.position.y+this.pointB.y);
        //line(this.sling.bodyA.position.x,this.sling.bodyA.position.y, this.sling.bodyB.position.x+this.sling.pointB.x, this.sling.bodyB.position.y+this.sling.pointB.y);
      }
  }
}

function setup() {
	createCanvas(800, 700);


	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
	//tree=new Tree(600,300,300,500);
	//boy=new Boy(250, 520,105,250);
	stone=new Stone(220,360,40,40);
	mango1=new Mango(550,350,20,20);
	mango2=new Mango(580,200,20,20);
	mango3=new Mango(520,300,20,20);
	//sling=new SS(stone.body, boy.body,-30,-40);
	slingshot=new SS( {x:150, y:320}, stone.body);

	Engine.run(engine);
  
}


function draw() {
  background("white");
  textSize(20);
  text("Press space to play again",50,50);
  imageMode(CENTER);
  image(boyImg,200,400,150,340);
  image(treeImg,600,300,300,500);
  //background(0);
  //tree.display();
  //boy.display();
  mango1.display();
  mango2.display();
  mango3.display();
  stone.display();
  slingshot.display();
  if(flyFlag)
  {
  istouching(mango1,stone,"mango1");
  istouching(mango2,stone,"mango2");
  istouching(mango3,stone,"mango3");
  }
  drawSprites();
 
}

function mouseDragged()
{
    Matter.Body.setPosition(stone.body, {x:mouseX, y:mouseY});
	console.log("Dragged");
}

function mouseReleased()
{
    slingshot.fly();
	console.log("released");
  flyFlag=true;
}

function istouching(curr_mango,the_stone,this_mango)
{
  var mangoPos=curr_mango.body.position;
  var stonePos=the_stone.body.position;
  var distX=Math.abs(mangoPos.x-stonePos.x);
  var distY=Math.abs(mangoPos.y-stonePos.y);
  if (distX < 70 && distY < 70)
  {
    Matter.Body.setStatic(curr_mango.body,false);
    console.log("HIT"+" "+this_mango);
  }
  console.log("Actual dist:"+dist+", "+this_mango);
  //console.log(mango.body);
  if(stonePos.x>750 || stonePos.y>600)
    flyFlag=false;
}

function keyPressed()
{
  if (keyCode===32)
  {
    Matter.Body.setPosition(stone.body,{x:220,y:360});
    slingshot.reset(stone.body);
  }
}
