const MOVE_FRAMES = .3*FPS;

const DICE = {
	'values' : [1,2,3,4,5,6],
	'currentValue' : 1,
	'moveValue' : 1,
	'moveCount' : 0
};

function drawDice(dice, ctx, number, delta, x, y) {
	if(number == null)
		number = dice.currentValue;
	if(dice.moveValue != number) {
		dice.currentValue = dice.moveValue;
		dice.moveCount = MOVE_FRAMES;
		dice.moveValue = number;
	}
	if(dice.moveCount > 0) {
		dice.moveCount -= delta;
		if(dice.moveCount <= 0) {
			dice.currentValue = number;
			dice.moveCount = 0;
		}	
	}

	ctx.fillStyle = "#fff";
	ctx.beginPath();
	ctx.arc(x, y, 50, 0, 2 * Math.PI);
	ctx.fill();

	const values = [1,2,3,4,5,6];
	setFontSize(22);
	ctx.fillStyle="#000";
	const angle = 360/values.length;

	ctx.save();
	ctx.translate(x, y);
	ctx.rotate(-1*angle * (dice.currentValue-1) * Math.PI/180);

	if(dice.moveValue != dice.currentValue) {	
		let angleDif = (dice.moveValue-dice.currentValue);
		if(Math.abs(angleDif) > 3) {
			angleDif = angleDif+((angleDif/Math.abs(angleDif))*-6);
		}
		ctx.rotate(-1*angle * angleDif * (MOVE_FRAMES-dice.moveCount)/MOVE_FRAMES * Math.PI/180);
	}

	dice.values.forEach((v,i)=> {
		ctx.save();
		ctx.rotate(angle * i * Math.PI/180);
		ctx.fillText(v,0-ctx.measureText(v).width/2,-25);
		ctx.restore();
	});
	ctx.restore();

	ctx.fillStyle = "#333";
	ctx.beginPath();
	ctx.moveTo(x-5, y);
	ctx.lineTo(x+5, y);
	ctx.lineTo(x, y-15);
	ctx.closePath();
	ctx.fill();
}