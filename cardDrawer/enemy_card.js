
var SPRITE;
var ENEMY;
function enemy_drawCard(ene, canvas, backCanvas) {
	return new Promise(async (result)=> {
		ENEMY = ene;
		SPRITE = await loadImageSafe('../sprites/enemies.png');
		
		const drawer = new EnemyDrawer();
		drawer.draw(canvas, backCanvas);

		result();
	});
}
const ENEMY_RED = "#FF0000";


class EnemyDrawer {

	randomWeakness() {
		if (Math.random()<0.5) {
			const v=rand(1,6);
			return v;
		}
		let a=rand(1,5), b=rand(a+1,a+3);
		return `${a} - ${Math.min(b,6)}`;
	}

	draw(canvasToDraw,backCanvasToDraw) {
		ctx = canvasToDraw.getContext("2d");
		drawBorder(ENEMY_RED);
		drawArt(SPRITE,ENEMY.spritePos,PLATE_HEIGHT-20);
		drawPlate(WIDTH/2-ART_RECT/2,WIDTH/2-ART_RECT/2,ART_RECT,'#C20000','#FE8700');
		ctx.fillStyle = '#fff';
		setFontSize(30);
		const label = "INIMIGO";
		ctx.fillText(label, WIDTH/2-ctx.measureText(label).width/2,WIDTH/2-ART_RECT/2+PLATE_HEIGHT/2+15);
		const passive = ENEMY.passive != null? ENEMIES_PASSIVE[ENEMY.passive] : null;
		this.drawDescription(ENEMY.description, passive);
		this.drawName(ENEMY.name);
		this.drawWeakness(this.randomWeakness());

		ctx = backCanvasToDraw.getContext("2d");
		drawBackBorder(ENEMY_RED);
	}

	drawDescription(description, passive) {
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
		y += textSize+4;

		if(passive != null) {
			const plateW = ART_RECT-100;
			drawPlate(50, y+margin, plateW, "#cd7f32", "#a46628");
			let text = passive.name;
			ctx.fillText(text,(ART_RECT)/2-ctx.measureText(text).width/2,y+margin+PLATE_HEIGHT/2+textSize/2);
			x = sX;
			y = y+margin+PLATE_HEIGHT+20;
			for(text of passive.description.split(" ")) {
				const measure = ctx.measureText(text).width;
				if(x+measure > wW+sX) {
					x = sX;
					y += textSize+4;
				}
				ctx.fillText(text,x,y+textSize);
				x += measure+8;
			}
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

	drawWeakness(weakness) {
		setFontSize(20);
		const label = weakness;
		const measure = ctx.measureText(label).width;
		const totalWidth = 70+measure;

		ctx.save();
		ctx.translate(WIDTH-totalWidth-30,HEIGHT-60-40);
		drawPlate(0,0,totalWidth, "#cd7f32", "#a46628");
		ctx.fillStyle="#fff";
		ctx.fillText(label, 35,40);

		ctx.restore();
	}

}