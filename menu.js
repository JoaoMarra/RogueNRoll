function closeMenu() {
	if(menu) {
		menu.style.display = 'none';
		menuOpened = false;
	}
}

function openMenu(context) {
	if(menu) {
		menu.style.display = 'block';

		if(!sizeDefined) {
			menuCanvas.width = parseInt(window.getComputedStyle(menu).width);
			menuCanvas.height = parseInt(window.getComputedStyle(menu).height)-40;
			menuOffset = menuCanvas.getBoundingClientRect().top;
			passiveW = (menuCanvas.width-30)/2;
			sizeDefined = true;
		}
		menuOpened = true;
		offsetY = 0;
		menu_draw(context,0);
	}
}

const menuCanvas = document.getElementById("menu_canvas");
const menuCtx = menuCanvas.getContext("2d");
var menuOffset = 0;
var sizeDefined = false;
var menuOpened = false;

var passiveW = 160;
const passiveH = 50;

let offsetY = 0;
let maxOffsetY;
function menu_scroll(context, e) {
	offsetY += e.deltaY;
	if(offsetY < 0){
		offsetY = 0;
	} else if(offsetY > maxOffsetY) {
		offsetY = maxOffsetY;
	}
	menu_draw(context, 0);
}

function menu_draw(context, delta) {
	if(!menuOpened)
		return;
	menuCtx.clearRect(0,0,menuCanvas.width,menuCanvas.height);
	menuCtx.save();
	menuCtx.translate(0,-offsetY);
	menuCtx.clearRect(0,0,menuCanvas.width,menuCanvas.height);

	const passives = Object.values(context.passiveCards);
	let perLine = Math.floor(menuCanvas.width/(passiveW+10));
	let y = 0;
	passives.forEach((p,i)=>{
		menuCtx.font="14px Arial";
		let line = Math.floor(i/perLine);
		let x = 10 + Math.floor(i%perLine)*(passiveW+10);
		y = 10+line*60;
		menuCtx.fillStyle="#444";
		menuCtx.fillRect(x,y,passiveW,passiveH);
		menuCtx.fillStyle="white";
		menuCtx.fillText(p.name,x+10,y+passiveH/2+9);
		if(p.amount > 0) {
			menuCtx.fillStyle="#400";
			menuCtx.beginPath();
			menuCtx.arc(x+(passiveW-25), y+25, 15, 0, 2 * Math.PI);
			menuCtx.fill();
			menuCtx.fillStyle="white";
			label = p.amount;
			menuCtx.fillText(p.amount,x+(passiveW-25)-menuCtx.measureText(p.amount).width/2,y+passiveH/2+9);
		}
	});
	maxOffsetY = Math.max(0,y+60-menuCanvas.height);
	menuCtx.restore();
}

function menu_includes(context, cx, cy) {

	const passives = Object.values(context.passiveCards);
	let perLine = Math.floor(menuCanvas.width/(passiveW+10));
	let i = 0;
	for(const c of passives) {
		let line = Math.floor(i/perLine);
		let x = 10 + Math.floor(i%perLine)*(passiveW+10);
		let y = menuOffset+10+line*60-offsetY;

		if(cx >= x && cx <= x+passiveW && cy >= y && cy <= y+passiveH) {
			return {
				'x':cx,
				'y':cy,
				'label':c.description
			}
			break;
		}

		i++;
	}
	return null;
}
