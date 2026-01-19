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

const ENEMIES_PASSIVE = [
	{
		name:"Limpa mente",
		description:"Aplica efeito de [MUDO] até o [FIM DE TURNO], caso os inimigos tenham causado algum dano neste turno.",
		time:END_TURN_TIME,
		apply:(ctx,e)=>{
			const abnormal = AB_STATUS[0];
			return context_causeAbnormal(ctx, abnormal);
		}
	},
	{
		name:"Envenenamento",
		description:"Aplica o efeito de [VENENO] até o [FIM DE FASE], caso os inimigos tenham causado algum dano neste turno.",
		time:END_TURN_TIME,
		apply:(ctx,e)=>{
			const abnormal = AB_STATUS[1];
			return context_causeAbnormal(ctx, abnormal);
		}
	},
	{
		name:"Deslocamento ligeiro",
		description:"Só pode ser acertado por ataques críticos.",
		time:ENEMY_DIE,
		apply:(ctx,e)=>{
			return (e.min == ctx.calcValue || e.max == ctx.calcValue);
		}
	},
	{
		name:"Multiplicar",
		description:"Duplica a efetividade do inimigo, caso os inimigos tenham causado algum dano neste turno.",
		time:END_TURN_TIME,
		apply:(ctx,e)=>{
			e.effect *= 2;
			return true;
		}
	},
	{
		name:"Ataque bruto",
		description:"Dobra o dano causado pelos inimigos.",
		time:ENEMY_TIME,
		apply:(ctx,e)=>{
			ctx.enemyRoll *= 2;
			return true;
		}
	}
]

const ENEMIES = [
	{
		name: "Baú-monstro",
		description: "Parece um tesouro… até morder você. Gosta de aventureiros desatentos e dedos desprotegidos.",
		draw:(x,y)=>{drawSprite(x,y,ENEMIES_SPRITES,0)},
		spritePos:0,
		passive:null
	},
	{
		name: "Devorador de mentes",
		description: "Não quer seu dinheiro, sua experiência ou seu equipamento. Só quer suas ideias. Literalmente.",
		draw:(x,y)=>{drawSprite(x,y,ENEMIES_SPRITES,1)},
		spritePos:1,
		passive:0
	},
	{
		name: "Dragão",
		description: "Enorme, cuspindo fogo e não se importa em pisar em você.",
		draw:(x,y)=>{drawSprite(x,y,ENEMIES_SPRITES,2)},
		spritePos:2,
		passive:null
	},
	{
		name: "Escorpião",
		description: "Pequeno, rápido e armado na traseira. Persegue aventureiros só para provar um ponto: tamanho não é documento.",
		draw:(x,y)=>{drawSprite(x,y,ENEMIES_SPRITES,3)},
		spritePos:3,
		passive:1
	},
	{
		name: "Homem-Peixe",
		description: "Metade homem, metade peixe, 100% fedido. Sai da água só quando percebe que aventureiros não nadam tão bem assim.",
		draw:(x,y)=>{drawSprite(x,y,ENEMIES_SPRITES,4)},
		spritePos:4,
		passive:null
	},
	{
		name: "Fogo-Fátuo",
		description: "Uma luzinha simpática… que leva você direto para a morte. Curiosamente, nega responsabilidade legal.",
		draw:(x,y)=>{drawSprite(x,y,ENEMIES_SPRITES,5)},
		spritePos:5,
		passive:null
	},
	{
		name: "Pantera Deslocadora",
		description: "Uma pantera que está ali… ou ali… ou talvez ali atrás de você.",
		draw:(x,y)=>{drawSprite(x,y,ENEMIES_SPRITES,6)},
		spritePos:6,
		passive:2
	},
	{
		name: "Morcego",
		description: "Dorme de cabeça para baixo e acorda de mau humor. Ataques noturnos porque ninguém deixa ele dormir em paz.",
		draw:(x,y)=>{drawSprite(x,y,ENEMIES_SPRITES,7)},
		spritePos:7,
		passive:1
	},
	{
		name: "Observador",
		description: "Um olho gigante cheio de olhos menores. Vive para vigiar, julgar e atirar raios que arruínam o seu dia.",
		draw:(x,y)=>{drawSprite(x,y,ENEMIES_SPRITES,8)},
		spritePos:8,
		passive:null
	},
	{
		name: "Cavaleiro Púrpura",
		description: "rmadura pesada, espada afiada e zero senso de humor. A cor favorita é roxo e a atividade favorita é te derrubar.",
		draw:(x,y)=>{drawSprite(x,y,ENEMIES_SPRITES,9)},
		spritePos:9,
		passive:4
	},
	{
		name: "Meleca-Viva",
		description: "Uma poça gosmenta com personalidade. Dissolve armas, armaduras e autoestima.",
		draw:(x,y)=>{drawSprite(x,y,ENEMIES_SPRITES,10)},
		spritePos:10,
		passive:3
	},
	{
		name: "Troll",
		description: "Grande, forte. Bate em você e reclama quando você não cai logo.",
		draw:(x,y)=>{drawSprite(x,y,ENEMIES_SPRITES,11)},
		spritePos:11,
		passive:null
	},
]

function enemy_die(e,context) {
	if(context.calcValue == null)
		return false
	let passive = true;
	if(e.data.passive && ENEMIES_PASSIVE[e.data.passive].time == ENEMY_DIE) {
		passive = ENEMIES_PASSIVE[e.data.passive].apply(context, e);
	}
	return (context.calcValue>=e.min && context.calcValue<=e.max) && passive;
}

function enemy_draw(ctx,x,y,e,context) {
	let ex = x;
	let ey = y;
	if(enemy_die(e,context)) {
		ey += 20
		ctx.fillStyle="#888";
	} else {
		ctx.fillStyle="#a03";
	}

	ctx.save();
	ctx.translate(ex+ENEMY_WIDTH/2,ey+ENEMY_HEIGHT/2);
	if(e.block) {
		ctx.rotate(90 * Math.PI/180);
	}

	ctx.fillRect(-ENEMY_WIDTH/2,-ENEMY_HEIGHT/2,ENEMY_WIDTH,ENEMY_HEIGHT);
	ctx.fillStyle = BACKGROUND_COLOR;
	ctx.fillRect(-ENEMY_WIDTH/2+2,-ENEMY_HEIGHT/2+22,ENEMY_WIDTH-4,ENEMY_HEIGHT-24);
	ctx.fillStyle="white";
	ctx.font="20px Arial";
	ctx.fillText(
		e.min===e.max?e.min:`${e.min}-${e.max}`,
		-ENEMY_WIDTH/2+4,-ENEMY_HEIGHT/2+20
		);
	e.data.draw(-ENEMY_WIDTH/2+2,-ENEMY_HEIGHT/2+22);
	if(e.effect > 1) {
		ctx.fillStyle="#a03";
		ctx.font = "18px Arial";
		let label = `${e.effect}x`;
		let measure = ctx.measureText(label);
		ctx.beginPath();
		ctx.arc(ENEMY_WIDTH/2,ENEMY_HEIGHT/2,measure.width/2, 0, 2*Math.PI);
		ctx.fill();
		ctx.fillStyle="#fff";
		ctx.fillText(label,ENEMY_WIDTH/2-measure.width/2,ENEMY_HEIGHT/2+6);
	}
	if(e.data.passive != null) {
		ctx.fillStyle="#7c14de";
		drawStar(ctx, ENEMY_WIDTH/2-10,-ENEMY_HEIGHT/2+10, 8,4);
	}
	ctx.restore();
}

function enemy_includes(ctx,e,x,y) {
	let ex = e.x;
	let ey = e.y;
	if(enemy_die(ctx.enemies[e.enemy],ctx)) {
		ey += 20
	}

	return (x >= ex && x <= ex+ENEMY_WIDTH && y >= ey && y <= ey+ENEMY_HEIGHT);
}

function enemy_pasive_apply(context, time) {
	var log = "";
	if(context.enemyRoll > 0) {
		const enemiesiWithStatus = context.enemies.filter((e)=>{return (!e.block && e.data.passive != null && ENEMIES_PASSIVE[e.data.passive].time == time)});
		enemiesiWithStatus.forEach((es)=> {
			if(ENEMIES_PASSIVE[es.data.passive].apply(context,es)) {
				log += `${es.data.name} aplicou ${ENEMIES_PASSIVE[es.data.passive].name}\n`;
			}
		});
	}
	return log.replace(/\n+$/, '');
}