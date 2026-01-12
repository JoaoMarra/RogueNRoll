const ENEMIES_SPRITES = new Image();
ENEMIES_SPRITES.src = "sprites/enemies.png"
ENEMIES_SPRITES.onload = function () {
	// console.log("=GOT=")
	START_GAME();
};

const ENEMY_WIDTH = 60;
const ENEMY_HEIGHT = 80;

const ENEMIES = [
	{
		name: "Dragão",
		desc: "",
		draw:(x,y)=>{drawSprite(x,y,ENEMIES_SPRITES,0)}
	},
	{
		name: "Homem-Peixe",
		desc: "",
		draw:(x,y)=>{drawSprite(x,y,ENEMIES_SPRITES,1)}
	},
	{
		name: "Cavaleiro Púrpura",
		desc: "",
		draw:(x,y)=>{drawSprite(x,y,ENEMIES_SPRITES,2)}
	},
	{
		name: "Troll",
		desc: "",
		draw:(x,y)=>{drawSprite(x,y,ENEMIES_SPRITES,3)}
	},
]

function enemy_die(e,diceValue) {
  if(diceValue == null)
    return false
  return diceValue>=e.min && diceValue<=e.max;
}

function enemy_draw(ctx,x,y,e,previewValue) {
	let ex = x;
	let ey = y;
	if(enemy_die(e,previewValue)) {
		ey += 20
		ctx.fillStyle="#888";
	} else {
		ctx.fillStyle="#a03";
	}
	ctx.fillRect(ex,ey,ENEMY_WIDTH,ENEMY_HEIGHT);
	ctx.fillStyle = BACKGROUND_COLOR;
	ctx.fillRect(ex+2,ey+22,ENEMY_WIDTH-4,ENEMY_HEIGHT-24);
	ctx.fillStyle="white";
	ctx.font="20px Arial";
	ctx.fillText(
		e.min===e.max?e.min:`${e.min}-${e.max}`,
		ex+4,ey+20
		);

	e.data.draw(ex+2,ey+22);
}

function enemy_includes(e,previewValue,x,y) {
	let ex = e.x;
	let ey = e.y;
	if(enemy_die(e.enemy,previewValue)) {
		ey += 20
	}

	return (x >= ex && x <= ex+ENEMY_WIDTH && y >= ey && y <= ey+ENEMY_HEIGHT);
}