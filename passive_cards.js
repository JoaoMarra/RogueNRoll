var PASSIVE_LOADED = false;
const PASSIVE_SPRITES = new Image();
PASSIVE_SPRITES.src = "sprites/passives.png"
PASSIVE_SPRITES.onload = function () {
	PASSIVE_LOADED = true;
	try {
		playGame();
	} catch(e) {}
};

const PC_CARDS = [
	{
		name:"Sempre +1", time:ROLL_TIME, description: "Adiciona 1 no valor da rolagem no [PÓS ROLAGEM].",
		effect:(ctx, amount) => {
			const before = ctx.calcValue;
			const after = context_addValue(ctx,1*amount);
			return `${before} - ${after}`;
		},
		spritePos:14,
		sprite:'p_sempremais1.png'
	},
	{ 
		name:"Sempre -1", time:ROLL_TIME, description: "Subtrai 1 do valor da rolagem no [PÓS ROLAGEM].",
		effect:(ctx, amount) => {
			const before = ctx.calcValue;
			const after = context_addValue(ctx,-1*amount);
			return `${before} - ${after}`;
		},
		spritePos:15,
		sprite:'p_sempremenos1.png'
	},
	{ 
		name:"Par +1", time:ROLL_TIME, description: "Adiciona 1 no valor da rolagem, se o valor da rolagem for par, no [PÓS ROLAGEM].", 
		effect:(ctx, amount) => {
			const before = ctx.calcValue;
			let after = ctx.calcValue;
			if(ctx.rollValue%2===0) {
				after = context_addValue(ctx,1*amount);
			}
			return `${before} - ${after}`;
		},
		spritePos:11,
		sprite:'p_parmais1.png'
	},
	{ 
		name:"Impar +1", time:ROLL_TIME, description: "Adiciona 1 no valor da rolagem, se o valor da rolagem for ímpar, no [PÓS ROLAGEM].", 
		effect:(ctx, amount) => {
			const before = ctx.calcValue;
			let after = ctx.calcValue;
			if(ctx.rollValue%2!==0) {
				after = context_addValue(ctx,1*amount);
			}
			return `${before} - ${after}`;
		},
		spritePos:8,
		sprite:'p_imparmais1.png'
	},
	{ 
		name:"Par -1", time:ROLL_TIME, description: "Subtrai 1 do valor da rolagem, se o valor da rolagem for par, no [PÓS ROLAGEM].", 
		effect:(ctx, amount) => {
			const before = ctx.calcValue;
			let after = ctx.calcValue;
			if(ctx.rollValue%2===0) {
				after = context_addValue(ctx,-1*amount);
			}
			return `${before} - ${after}`;
		},
		spritePos:12,
		sprite:'p_parmenos1.png'
	},
	{ 
		name:"Impar -1", time:ROLL_TIME, description: "Subtrai 1 do valor da rolagem, se o valor da rolagem for ímpar, no [PÓS ROLAGEM].", 
		effect:(ctx, amount) => {
			const before = ctx.calcValue;
			let after = ctx.calcValue;
			if(ctx.rollValue%2!==0) {
				after = context_addValue(ctx,-1*amount);
			}
			return `${before} - ${after}`;
		},
		spritePos:9,
		sprite:'p_imparmenos1.png'
	},
	{ 
		name:"Barreira +1", time:ENEMY_TIME, description: "Subtrai 1 do valor do dano dos inimigos na [DEFESA].", 
		effect:(ctx, amount) => {
			const before = ctx.enemyRoll;
			const after = context_addEnemyRoll(ctx,-1*amount);
			return `dano ${before} - ${after}`;
		},
		spritePos:1,
		sprite:'p_barreira1.png'
	},
	{ 
		name:"Escudo +1", time:END_ROUND_TIME, description: "Ganha 1 escudo no [FIM DE FASE].", 
		effect:(ctx, amount) => {
			const before = ctx.shield;
			const after = context_addShield(ctx,1*amount);
			return `escudo ${before} - ${after}`;
		},
		spritePos:4,
		sprite:'p_escudo1.png'
	},
	{ 
		name:"Rouba Alma", time:END_TURN_TIME, description: "Ganha 1 escudo para cada inimigo derrotado no [FIM DE TURNO].", 
		effect:(ctx,amount) => {
			if(ctx.turnKill == 0)
				return "nenhum inimigo derrotado";
			const before = ctx.shield;
			const after = context_addShield(ctx,ctx.turnKill*amount);
			return `escudo ${before} - ${after}`;
		} ,
		spritePos:13,
		sprite:'p_roubaalma.png'
	},
	{ 
		name:"Level +1", time:END_ROUND_TIME, description: "Ganha 1 nivel extra, no [FIM DE FASE].", 
		effect:(ctx,amount) => {
			const before = ctx.levelToUp;
			ctx.levelToUp += 1*amount;
			const after = ctx.levelToUp;
			return `subir de nivel ${before}x - ${after}x`;
		},
		spritePos:10,
		sprite:'p_levelup.png'
	},
	{ 
		name:"Apostar", time:END_TURN_TIME, description: "Descarta uma carta ativa e compra outra no [FIM DE TURNO].", 
		effect:(ctx,amount) => {
			return refreshActiveCards(ctx,amount)
		},
		spritePos:0,
		sprite:'p_apostar.png'
	},
	{ 
		name:"Compra Carta", time:END_TURN_TIME, description: "Compra uma carta ativa extra no [FIM DE TURNO].", 
		effect:(ctx,amount) => {
			let log = context_renewCards(ctx,3+amount,false);
			positionActiveCards(ctx);
			return log;
		},
		spritePos:2,
		sprite:'p_compracarta.png'
	},
	{ 
		name:"Contra Ataque", time:ROLL_TIME, description: "Caso tenha sido atingido pelos inimigos no turno anterior, o valor da rolagem após aplicação das cartas passivas, fica igual ao inimigo de menor fraqueza disponível.", 
		effect:(ctx,amount) => {
			if(ctx.lastEnemyRoll != null) {
				const before = ctx.rollValue;
				let min = 6;
				for(let e of ctx.enemies) {
					min = Math.min(min,e.min);
				}
				const after = context_setValue(ctx,min);
				return `${before} - ${after}`;	
			}
			return 'não tomou dano no turno';
		},
		spritePos:3,
		sprite:'p_contraataque.png'
	},
	{ 
		name:"Escudo +Crítico", time:END_TURN_TIME, description: "Ganha 1 escudo para cada inimigo derrotado com ataque crítico neste turno.", 
		effect:(ctx,amount) => {
			if(ctx.turnCritic == 0)
				return 'Nenhum ataque critico neste turno';
			const before = ctx.shield;
			const after = context_addShield(ctx,ctx.turnCritic*amount);
			return `escudo ${before} - ${after}`;
		},
		spritePos:6,
		sprite:'p_escudocritico.png'
	},
	{ 
		name:"Escudo +Carta", time:END_ATTACK, description: "Ganha 1 escudo para cada carta ativa utilizada no ataque deste turno.", 
		effect:(ctx,amount) => {
			const before = ctx.shield;
			if(ctx.playCards.length == 0)
				return 'Nenhuma carta usada neste turno';
			const after = context_addShield(ctx,ctx.playCards.length*amount);
			return `escudo ${before} - ${after}`;
		},
		spritePos:5,
		sprite:'p_escudocarta.png'
	},
	{
		name:"Escudo Extra", time:ROLL_TIME, description: "A quantidade de escudos máxima pode ultrapassar em 1 unidade por carta 'Escudo Extra'. No [FIM DE TURNO], a quantidade de escudos que ultrapassarem a quantidade de escudos máxima devem ser descartados.", 
		effect:(ctx,amount) => {
			const before = ctx.extraShield;
			ctx.extraShield += amount;
			const after = before+ctx.extraShield;
			return `escudo extra ${before} - ${after}`;
		},
		spritePos:7,
		sprite:'p_escudoextra.png'
	}
]

function newPassiveCard(context,passives=null) {
	let c;
	if(passives == null) {
		c = PC_CARDS[rand(0,PC_CARDS.length-1)];
	} else {
		if(passives.length == 0)
			return null;
		let random = rand(0,passives.length-1);
		c = PC_CARDS[passives[random]];
	}
	if(context.passiveCards[c.name]) {
		context.passiveCards[c.name].amount += 1;
	} else {
		c = { ...c, amount:1}
		context.passiveCards[c.name] = c;
	}
	return c;
}

function passive_apply(context, gameTime) {
	const passives = Object.values(context.passiveCards).filter((p)=>p.time == gameTime);

	var log = "";
	passives.forEach(p=>{
		let effect = p.effect(context,p.amount);
		log += `Passiva ${p.name} ${p.amount}x: ${effect}\n`;
	});

	return log.replace(/\n+$/, '');
}

function innate_apply(context, gameTime) {
	const passives = context.innate.filter((p)=>p.time == gameTime);

	var log = "";
	passives.forEach(p=>{
		if(p.time == gameTime) {
			let effect = p.effect(context,1);
			log += `Habilidade inata ${p.name}: ${effect}\n`;
		}
	});
	
	return log.replace(/\n+$/, '');
}