
var SPRITE;
var DICE;
var CHARACTER;
function character_drawCard(char, canvas, backCanvas) {
	return new Promise((result)=> {
		CHARACTER = char;
		DICE = new Image();
		DICE.src = "../sprites/dado.png";
		DICE.onload = () => {
			SPRITE = new Image();
			SPRITE.src = '../sprites/characters.png';
			SPRITE.onload = () => {
				const drawer = new CharDrawer();
				drawer.draw(canvas, backCanvas);

				result();
			};
		};
	});
}

const levelMargin = 80;
const charDescRect = HEIGHT-(ART_HEIGHT+(WIDTH/2-ART_RECT/2))-50-(PLATE_HEIGHT-20);
class CharDrawer {

	constructor() {
	}

	draw(canvasToDraw,backCanvasToDraw) {
		ctx = canvasToDraw.getContext("2d");

		drawBorder(CHARACTER.color);
		drawArt(SPRITE,CHARACTER.spritePos);
		this.drawDescription([CHARACTER.description,CHARACTER.can], PC_CARDS[CHARACTER.innate].name, PC_CARDS[CHARACTER.innate].description);
		this.drawLevel(CHARACTER.shield);
		this.drawName(CHARACTER.name);
		this.drawShield(CHARACTER.shield);
		this.drawDice(CHARACTER.dice);

		ctx = backCanvasToDraw.getContext("2d");
		drawBackBorder(CHARACTER.color);
	}

	drawLevel(shield) {
		const h = charDescRect-PLATE_HEIGHT+10;
		const w = levelMargin-10;
		ctx.save();
		ctx.translate(WIDTH/2-ART_RECT/2,WIDTH/2-ART_RECT/2+ART_HEIGHT+10);

		ctx.fillStyle = "#676767";
		ctx.beginPath();
		ctx.roundRect(0, 10+PLATE_HEIGHT, w, h, 20);
		ctx.fill();
		ctx.strokeStyle = "#0f0";
		ctx.lineWidth = 4;
		ctx.beginPath();
		ctx.roundRect(0, 10+PLATE_HEIGHT, w, h, 20);
		ctx.stroke();

		const hdelta = h/11;

		setFontSize(20);
		let label = "Nv.";
		ctx.fillStyle = "#0f0";
		ctx.fillText(label,w/2-ctx.measureText(label).width/2,10+PLATE_HEIGHT+hdelta);

		ctx.fillStyle = "#fff";
		let y = 10+PLATE_HEIGHT+h;
		for(let is = shield; is <= shield*10; is += shield) {
			label = is;
			ctx.fillText(label,w/2-ctx.measureText(label).width/2,y-10);
			y -= hdelta;
		}


		ctx.restore();
	}

	drawDescription(description,innateName, innateDescription) {
		ctx.save();
		ctx.translate(WIDTH/2-ART_RECT/2, WIDTH/2-ART_RECT/2+ART_HEIGHT+10);

		ctx.fillStyle = "#676767";
		ctx.beginPath();
		ctx.roundRect(levelMargin, 20, ART_RECT-levelMargin, charDescRect, 20);
		ctx.fill();
		ctx.strokeStyle = "#0f0";
		ctx.lineWidth = 4;
		ctx.beginPath();
		ctx.roundRect(levelMargin, 20, ART_RECT-levelMargin, charDescRect, 20);
		ctx.stroke();

		const margin = 20;
		ctx.translate(levelMargin, 20+(PLATE_HEIGHT-20));
		const sX = margin;
		const sY = margin;
		const wW = ART_RECT-2*sX-levelMargin;
		const wH = charDescRect-20-(PLATE_HEIGHT-20)-sY*2;

		const textSize = 20;
		setFontSize(textSize);
		ctx.fillStyle = "#fff";
		let x = sX;
		let y = sY;
		for(const line of description) {
			x = sX;
			const texts = line.split(" ");
			for(const text of texts) {
				const measure = ctx.measureText(text).width;
				if(x+measure > wW+sX) {
					x = sX;
					y += textSize+4;
				}
				ctx.fillText(text,x,y+textSize);
				x += measure+8;
			}
			y += textSize+8;
		}

		const plateW = ART_RECT-100-levelMargin;
		drawPlate(50, y+margin, plateW, "#cd7f32", "#a46628");
		let text = innateName;
		ctx.fillText(text,(ART_RECT-levelMargin)/2-ctx.measureText(text).width/2,y+margin+PLATE_HEIGHT/2+textSize/2);
		x = sX;
		y = y+margin+PLATE_HEIGHT+20;
		for(text of innateDescription.split(" ")) {
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
		ctx.translate(WIDTH/2-nameRect/2, WIDTH/2-nameRect/2+ART_HEIGHT+10);

		drawPlate(0,0,nameRect,"#474747","#333");

		setFontSize(24);
		ctx.fillStyle = "#fff";
		ctx.fillText(name, nameRect/2-ctx.measureText(name).width/2,PLATE_HEIGHT/2+12);

		ctx.restore();
	}

	drawShield(amount) {
		const size = 35;
		const lx = (WIDTH/2-ART_RECT/2)+size;
		const ly = (WIDTH/2-ART_RECT/2)+size*.5;
		ctx.fillStyle = "red"
		ctx.beginPath();
		ctx.arc(lx-size/2, ly, size, 0, 2 * Math.PI);
		ctx.arc(lx+size/2, ly, size, 0, 2 * Math.PI);
		ctx.fill();
		ctx.beginPath();
		ctx.arc(lx, ly+size/2, size, 0, 2 * Math.PI);
		ctx.fill();

		setFontSize(30);
		ctx.fillStyle="#fff";
		let shieldLabel=amount;
		let shieldW = ctx.measureText(shieldLabel).width;
		ctx.fillText(shieldLabel,lx-shieldW/2,ly+10);
		setFontSize(12);
		shieldLabel="escudo";
		ctx.fillText(shieldLabel,lx-ctx.measureText(shieldLabel).width/2,ly+30);
	}

	drawDice(dice) {
		setFontSize(20);
		const label = `[ ${dice} ]`;
		const measure = ctx.measureText(label).width;
		const diceW = 30;
		const diceH = diceW*DICE.height/DICE.width;
		const totalWidth = 75+measure+10+diceW;

		ctx.save();
		ctx.translate(WIDTH-totalWidth-30,HEIGHT-60-40);
		drawPlate(0,0,totalWidth, "#cd7f32", "#a46628")
		drawSprite(35,30-diceH/2,DICE,0,diceW,diceH);
		ctx.fillStyle="#fff";
		ctx.fillText(label, 35+diceW+10,40);

		ctx.restore();
	}
}