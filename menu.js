function closeMenu() {
	if(menu) {
		menu.style.display = 'none';
		menuOpened = false;
	}
}

function openMenu(context) {
	if(menu) {
		menu_set_chars(context);
		menu.style.display = 'block';

		if(!sizeDefined) {
			const menuCanvasRect = menuCanvas.getBoundingClientRect();
			menuCanvas.width = parseInt(window.getComputedStyle(menu).width);
			menuCanvas.height = parseInt(window.getComputedStyle(menu).height)-menuCanvasRect.top;
			menuOffset = menuCanvasRect.top;
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
const menu_char_div = document.getElementById("menu_char_div");
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

function menu_set_chars(context) {
	var html = '<div style="display: flex;width:100%;justify-content: space-around;">';
	for(const c of context.characters) {
		html += `<div class="box-boder" style="align-text:center;padding:1rem;">
		<center>
		<div style="margin-bottom:.5rem"><strong style="margin-right:.25rem;font-size:20px;">${c.name}</strong> <span style="font-size:14px">Nv.${c.level}</span></div>
		<div ><img src="sprites/${c.sprite}"></div>
		<div style="display: flex; align-items: center;justify-content: space-around;">
    <div style="display:flex;align-items:center;"><img src="sprites/shield.png" style="margin-right:5px">${c.shield}</div>
    <div style="display:flex;align-items:center;"><img src="sprites/dado.png" style="margin-right:5px">[ ${c.dice} ]</div>
		</div>
		</center>
	</div>`;
}
html += '</div>';
menu_char_div.innerHTML = html;
}

function menu_draw(context, delta) {
	if(!menuOpened)
		return;
	menuCtx.clearRect(0,0,menuCanvas.width,menuCanvas.height);
	menuCtx.save();
	menuCtx.translate(0,-offsetY);
	menuCtx.clearRect(0,0,menuCanvas.width,menuCanvas.height);

	let perLine = Math.floor(menuCanvas.width/(passiveW+10));
	let y = 0;
	const innate = context.innate;
	
	const passives = context.innate.concat(Object.values(context.passiveCards));
	passives.forEach((p,i)=>{
		menuCtx.font="14px Arial";
		let line = Math.floor(i/perLine);
		let x = 10 + Math.floor(i%perLine)*(passiveW+10);
		y = 10+line*60;

		menuCtx.fillStyle="#444";
		menuCtx.fillRect(x,y,passiveW,passiveH);

		if(p.char != null) {
			p.char.draw(x,y,menuCtx);
			x += 60;
		}
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

	const innate = context.innate;
	let perLine = Math.floor(menuCanvas.width/(passiveW+10));
	let i = 0;
	const passives = context.innate.concat(Object.values(context.passiveCards));
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
