
var ACTIVE;
var ACTIVE_COLOR;
function active_drawCard(active, canvas, backCanvas) {
	return new Promise((result)=> {
		ACTIVE = active[0];
		ACTIVE_COLOR = active[1];
		SPRITE = new Image();
		SPRITE.src = '../sprites/enemies.png';
		SPRITE.onload = () => {
			const drawer = new ActiveDrawer();
			drawer.draw(canvas, backCanvas);

			result();
		};
	});
}

class ActiveDrawer {

	draw(canvasToDraw,backCanvasToDraw) {
		ctx = canvasToDraw.getContext("2d");
		drawBorder(ACTIVE_COLOR);
		//art
		drawPlate(WIDTH/2-ART_RECT/2,WIDTH/2-ART_RECT/2,ART_RECT,'#C20000','#FE8700');
		ctx.fillStyle = '#fff';
		setFontSize(30);
		const label = "ATIVA";
		ctx.fillText(label, WIDTH/2-ctx.measureText(label).width/2,WIDTH/2-ART_RECT/2+PLATE_HEIGHT/2+15);
		this.drawDescription(ACTIVE.description);
		this.drawName(ACTIVE.name);

		ctx = backCanvasToDraw.getContext("2d");
		drawBackBorder(ACTIVE_COLOR);
		ctx.fillStyle = '#fff';
		setFontSize(30);
		const measure = ctx.measureText(label).width;
		drawPlate(WIDTH/2-(measure+70)/2,HEIGHT/2+100,measure+70,"#474747","#333");
		ctx.fillText(label, WIDTH/2-measure/2,HEIGHT/2+100+PLATE_HEIGHT/2+15);
	}

	drawDescription(description) {
		const descRect = HEIGHT-(ART_HEIGHT+(WIDTH/2-ART_RECT/2))-50-(PLATE_HEIGHT-20)-(PLATE_HEIGHT-20);
		ctx.save();
		ctx.translate(WIDTH/2-ART_RECT/2, WIDTH/2-ART_RECT/2+ART_HEIGHT+10+(PLATE_HEIGHT-20));

		ctx.fillStyle = "#676767";
		ctx.beginPath();
		ctx.roundRect(0, 20, ART_RECT, descRect, 20);
		ctx.fill();
		ctx.strokeStyle = "#0f0";
		ctx.lineWidth = 4;
		ctx.beginPath();
		ctx.roundRect(0, 20, ART_RECT, descRect, 20);
		ctx.stroke();

		const margin = 20;
		ctx.translate(0, 20+(PLATE_HEIGHT-20));
		const sX = margin;
		const sY = margin;
		const wW = ART_RECT-2*sX;
		const wH = descRect-20-(PLATE_HEIGHT-20)-sY*2;

		const textSize = 20;
		setFontSize(textSize);
		ctx.fillStyle = "#fff";
		let x = sX;
		let y = sY;
		for(const text of description.split(" ")) {
			const measure = ctx.measureText(text).width;
			if(x+measure > wW+sX) {
				x = sX;
				y += textSize+4;
			}
			ctx.fillText(text,x,y+textSize);
			x += measure+8;
		}

		ctx.restore();
	}

	drawName(name) {
		const nameRect = WIDTH-120;

		ctx.save();
		ctx.translate(WIDTH/2-nameRect/2, WIDTH/2-nameRect/2+ART_HEIGHT+10+(PLATE_HEIGHT-20));

		drawPlate(0,0,nameRect,"#474747","#333");

		setFontSize(24);
		ctx.fillStyle = "#fff";
		ctx.fillText(name, nameRect/2-ctx.measureText(name).width/2,PLATE_HEIGHT/2+12);

		ctx.restore();
	}
}