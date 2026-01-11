const ENEMIES_SPRITES = new Image();
ENEMIES_SPRITES.src = "sprites/enemies.png"
ENEMIES_SPRITES.onload = function () {
	// console.log("=GOT=")
	START_GAME();
};

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