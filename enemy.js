var ENEMY_LOADED = false;
const ENEMIES_SPRITES = new Image();
ENEMIES_SPRITES.src = "sprites/enemies.png"
ENEMIES_SPRITES.onload = function () {
	ENEMY_LOADED = true;
	try {
		playGame();
	} catch(e) {}
};

const ENEMY_WIDTH = 60;
const ENEMY_HEIGHT = 80;

const ENEMIES = [
	{
		name: "Baú-monstro",
		description: "Parece um tesouro… até morder você. Gosta de aventureiros desatentos e dedos desprotegidos.",
		draw:(x,y)=>{drawSprite(x,y,ENEMIES_SPRITES,0)},
		spritePos:0
	},
	{
		name: "Devorador de mentes",
		description: "Não quer seu dinheiro, sua experiência ou seu equipamento. Só quer suas ideias. Literalmente.",
		draw:(x,y)=>{drawSprite(x,y,ENEMIES_SPRITES,1)},
		spritePos:1
	},
	{
		name: "Dragão",
		description: "Enorme, cuspindo fogo e não se importa em pisar em você.",
		draw:(x,y)=>{drawSprite(x,y,ENEMIES_SPRITES,2)},
		spritePos:2
	},
	{
		name: "Escorpião",
		description: "Pequeno, rápido e armado na traseira. Persegue aventureiros só para provar um ponto: tamanho não é documento.",
		draw:(x,y)=>{drawSprite(x,y,ENEMIES_SPRITES,3)},
		spritePos:3
	},
	{
		name: "Homem-Peixe",
		description: "Metade homem, metade peixe, 100% fedido. Sai da água só quando percebe que aventureiros não nadam tão bem assim.",
		draw:(x,y)=>{drawSprite(x,y,ENEMIES_SPRITES,4)},
		spritePos:4
	},
	{
		name: "Fogo-Fátuo",
		description: "Uma luzinha simpática… que leva você direto para a morte. Curiosamente, nega responsabilidade legal.",
		draw:(x,y)=>{drawSprite(x,y,ENEMIES_SPRITES,5)},
		spritePos:5
	},
	{
		name: "Pantera Deslocadora",
		description: "Uma pantera que está ali… ou ali… ou talvez ali atrás de você.",
		draw:(x,y)=>{drawSprite(x,y,ENEMIES_SPRITES,6)},
		spritePos:6
	},
	{
		name: "Morcego",
		description: "Dorme de cabeça para baixo e acorda de mau humor. Ataques noturnos porque ninguém deixa ele dormir em paz.",
		draw:(x,y)=>{drawSprite(x,y,ENEMIES_SPRITES,7)},
		spritePos:7
	},
	{
		name: "Observador",
		description: "Um olho gigante cheio de olhos menores. Vive para vigiar, julgar e atirar raios que arruínam o seu dia.",
		draw:(x,y)=>{drawSprite(x,y,ENEMIES_SPRITES,8)},
		spritePos:8
	},
	{
		name: "Cavaleiro Púrpura",
		description: "rmadura pesada, espada afiada e zero senso de humor. A cor favorita é roxo e a atividade favorita é te derrubar.",
		draw:(x,y)=>{drawSprite(x,y,ENEMIES_SPRITES,9)},
		spritePos:9
	},
	{
		name: "Meleca-Viva",
		description: "Uma poça gosmenta com personalidade. Dissolve armas, armaduras e autoestima.",
		draw:(x,y)=>{drawSprite(x,y,ENEMIES_SPRITES,10)},
		spritePos:10
	},
	{
		name: "Troll",
		description: "Grande, forte. Bate em você e reclama quando você não cai logo.",
		draw:(x,y)=>{drawSprite(x,y,ENEMIES_SPRITES,11)},
		spritePos:11
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