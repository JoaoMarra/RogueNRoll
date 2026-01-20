const ROLL_TIME = 0;
const DECISION_TIME = 1;
const END_ATTACK = 2;
const ENEMY_TIME = 3;
const END_TURN_TIME = 4;
const END_ROUND_TIME = 5;
const ENEMY_DIE = 6;

const TURN_LABELS = [
	'PÓS ROLAGEM',
	'DECISÃO',
	'PÓS ATAQUE',
	'DEFESA',
	'FIM DE TURNO',
	'FIM DE FASE',
	'MORTE DO INIMIGO'
]

const rand = (a,b)=>{
	if(a==b)
		return a;
	else
		return a+Math.floor(Math.random()*(b-a+1));
};

function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }

  const clone = {};
  for (const key in obj) {
    clone[key] = deepClone(obj[key]);
  }
  return clone;
}


function breakText(text, width, font, color) {
	const virtualCanvas = document.createElement('canvas');
	virtualCanvas.width = Math.max(300,width);
	virtualCanvas.height = Math.max(300,width);
	let virtualCtx = virtualCanvas.getContext("2d");
	setFontSize(font, virtualCtx);
	virtualCtx.fillStyle = "#fff";

	let space = virtualCtx.measureText(" ").width;
	let x = 0;
	let y = 0;
	let maxX = 0;
	let h = virtualCtx.measureText("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
	h = h.actualBoundingBoxAscent+h.actualBoundingBoxDescent;
	let measure;
	for(const t of text.split(" ")) {
		measure = virtualCtx.measureText(t).width;
		if(x > 0 && x + measure > width) {
			y += h+space;
			x = 0;
		}
		virtualCtx.fillText(t, x, y + h);
		x += measure+space;
		maxX = Math.max(maxX, x);
	}
	const virtualCanvas2 = document.createElement('canvas');
	virtualCanvas2.width = maxX-space;
	virtualCanvas2.height = y+h+space;
	virtualCtx = virtualCanvas2.getContext("2d");
	virtualCtx.drawImage(virtualCanvas,0,0);

	return virtualCanvas2;
}

function drawStar(ctx, cx, cy, outerRadius,innerRadius) {
	const points = 5;
    const angle = Math.PI / points;
    
    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
    	const r = (i % 2 === 0) ? outerRadius : innerRadius;
    	const currAngle = (i * angle) - (Math.PI / 2); 

    	const x = cx + Math.cos(currAngle) * r;
    	const y = cy + Math.sin(currAngle) * r;

    	if (i === 0) {
    		ctx.moveTo(x, y);
    	} else {
    		ctx.lineTo(x, y);
    	}
    }
    ctx.closePath();
    ctx.fill();
  }