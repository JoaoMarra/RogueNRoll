function closeMenu() {
	if(menu) {
		menu.style.display = 'none';
		menuOpened = false;
	}
}

function openMenu() {
	if(menu) {
		menu.style.display = 'block';

		if(!sizeDefined) {
			menuCanvas.width = parseInt(window.getComputedStyle(menu).width);
			menuCanvas.height = parseInt(window.getComputedStyle(menu).height)-40;
			sizeDefined = true;
		}
		menuOpened = true;
	}
}

const menuCanvas = document.getElementById("menu_canvas");
const menuCtx = menuCanvas.getContext("2d");
var sizeDefined = false;
var menuOpened = false;

const passiveW = 160;
const passiveH = 50;

function menu_draw(context, delta) {
	if(!menuOpened)
		return;
	menuCtx.clearRect(0,0,menuCanvas.width,menuCanvas.height);

	const passives = Object.values(context.passiveCards);
	let perLine = Math.floor(menuCanvas.width/(passiveW+10));

	passives.forEach((p,i)=>{
		menuCtx.font="18px Arial";
		let line = Math.floor(i/perLine);
		let x = 10 + Math.floor(i%perLine)*(passiveW+10);
		let y = 10+line*60;
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
}

function menu_includes(context, cx, cy) {

	const passives = Object.values(context.passiveCards);
	let perLine = Math.floor(menuCanvas.width/(passiveW+10));
	let i = 0;
	for(const c of passives) {
		let line = Math.floor(i/perLine);
		let x = 10 + Math.floor(i%perLine)*(passiveW+10);
		let y = 10+line*60;

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
