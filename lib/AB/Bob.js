class Bob {
	constructor(x,y,dia) 
	{
		var options={restitution:0.3,
			isStatic:false,
			restitution:1,
			friction:0,
			density:0.8}					
		this.body=Bodies.circle(x,y,dia/2, options);
		World.add(world, this.body);
		this.radius=dia/2;						
	}
	display()
	{
		var pos=this.body.position;
		var angle=this.body.angle;
		push();
		translate(pos.x,pos.y);
		//rotate(pos.x,pos.y);
		rectMode(CENTER);
		fill("yellow");
		ellipse(0,0,this.radius*2,this.radius*2);
		pop();

	}
};