var ACTIVE_LOADED = false;
const ACTIVE_SPRITES = new Image();
ACTIVE_SPRITES.src = "sprites/actives.png"
ACTIVE_SPRITES.onload = function () {
	ACTIVE_LOADED = true;
	try {
		playGame();
	} catch(e) {}
};


const ACTIVE_WIDTH = 60;
const ACTIVE_HEIGHT = 80;

const AC_CARDS = [
	{ 
		name:"+1", description: "Adiciona 1 no valor do ataque.", 
		effect:(ctx) => {
			const before = ctx.calcValue;
			const after = context_addValue(ctx,1);
			return `${before} - ${after}`;
		},
		spritePos:4
	},
	{ 
		name:"+2", description: "Adiciona 2 no valor do ataque.",
		effect:(ctx) => {
			const before = ctx.calcValue;
			const after = context_addValue(ctx,2);
			return `${before} - ${after}`;
		},
		spritePos:5
	},
	{ 
		name:"-1", description: "Subtrai 1 no valor do ataque.", 
		effect:(ctx) => {
			const before = ctx.calcValue;
			const after = context_addValue(ctx,-1);
			return `${before} - ${after}`;
		},
		spritePos:6
	},
	{ 
		name:"-2", description: "Subtrai 2 no valor do ataque.",
		effect:(ctx) => {
			const before = ctx.calcValue;
			const after = context_addValue(ctx,-2);
			return `${before} - ${after}`;
		},
		spritePos:7
	},
	{ 
		name:"Fixa 3", description: "Muda o valor do ataque para 3.", 
		effect:(ctx) => {
			const before = ctx.calcValue;
			const after = context_setValue(ctx, 3);
			return `${before} - ${after}`;
		},
		spritePos:10
	},
	{ 
		name:"Fixa 1", description: "Muda o valor do ataque para 1.", 
		effect:(ctx) => {
			const before = ctx.calcValue;
			const after = context_setValue(ctx, 1);
			return `${before} - ${after}`;
		},
		spritePos:9
	},
	{ 
		name:"Fixa 6", description: "Muda o valor do ataque para 6.", 
		effect:(ctx) => {
			const before = ctx.calcValue;
			const after = context_setValue(ctx, 6);
			return `${before} - ${after}`;
		},
		spritePos:11
	},
	{ 
		name:"Rouba Vida", description: "Ganha escudo de acordo com o valor do ataque no momento da aplicação da carta.",
		effect:(ctx) => {
			const before = ctx.shield;
			const after = context_addShield(ctx,ctx.calcValue);
			return `escudo ${before} - ${after}`;
		},
		spritePos:8
	},
	{
		name:"Bloqueio Par",description: "Bloqueia os inimigos que tem fraqueza igual a um número par ou que o mínimo e máximo da fraqueza sejam números pares.",
		effect:(ctx) => {
			return context_blockEvenEnemies(ctx);
		},
		spritePos:2
	},
	{
		name:"Bloqueio Ímpar",description: "Bloqueia os inimigos que tem fraqueza igual a um número ímpar ou que o mínimo e máximo da fraqueza sejam números pares.",
		effect:(ctx) => {
			return context_blockOddEnemies(ctx);
		},
		spritePos:0
	},
	{
		name:"Bloqueio Superior",description: "Bloqueia os inimigos com fraqueza ou mínimo da fraqueza MAIOR que o valor do ataque no momento da aplicação da carta.",
		effect:(ctx) => {
			return context_blockGreaterEnemies(ctx);
		},
		spritePos:3
	},
	{
		name:"Bloqueio Inferior",description: "Bloqueia os inimigos com fraqueza ou máximo da fraqueza MENOR que o valor do ataque no momento da aplicação da carta.",
		effect:(ctx) => {
			return context_blockLesserEnemies(ctx);
		},
		spritePos:1
	}
]

function drawActiveSprite(ctx,x,y,pos,size) {
	drawSprite(x,y,ACTIVE_SPRITES,pos,ctx,56,56,size,size);
}

function newActiveCard(context) {
	if(context.possibleActive.length == 0)
		return null;
	let random = rand(0,context.possibleActive.length-1);
	const c = AC_CARDS[context.possibleActive[random]];
	return { ...c, used:false };
}

function refreshActiveCards(context,amount) {
	if(context.possibleActive.length == 0)
		return "Nenhuma carta disponível";
	let log = "";
	let index;
	for(let i = 0; i < amount; i++) {
		index = rand(0,context.activeCards.length-1)
		log += `"${context.activeCards[index].name}" -> `;
		if(index < context.activeCards.length) {
			context.activeCards.splice(index,1,newActiveCard(context))
			log += `"${context.activeCards[index].name}"`;
		}
		if(i < amount-1)
			log += ", ";
	}
	return log;
}

const active_draw = (ctx,x,y,card,context) => {
	let cx = x;
	let cy = y;

	let fColor = "#3366cc";
	if(context.phase.name != "decision") {
		fColor = "#142a57";
	}
	if(context.phase.name == "decision" && !card.used) {
		cy -= 30;
	}
	if(context.playCards.includes(card)) {
		cy-=10;
		ctx.fillStyle="#2a2";
		ctx.fillRect(cx-3,cy-3,ACTIVE_WIDTH+6,ACTIVE_HEIGHT+6);
	}

	ctx.fillStyle=card.used?"#555":fColor;
	ctx.fillRect(cx,cy,ACTIVE_WIDTH,ACTIVE_HEIGHT);

	const size = 28;
	drawActiveSprite(ctx,cx+ACTIVE_WIDTH/2-size/2,cy+ACTIVE_HEIGHT/2-size/2,card.spritePos,size);
}

function active_include(card,context,x,y) {
	let cx = card.x;
	let cy = card.y;

	if(context.phase.name == "decision" && !context.activeCards[card.index].used) {
		cy -= 30;
	}
	if(context.playCards.includes(context.activeCards[card.index])) {
		cy-=10;
	}
	return (x >= cx && x <= cx + ACTIVE_WIDTH && y >= cy && y <= cy + ACTIVE_HEIGHT);
}