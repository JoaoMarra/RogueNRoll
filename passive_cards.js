const PC_CARDS = [
	{
		name:"Sempre +1", time:ROLL_TIME, description: "+1 no valor do dado",
		effect:(ctx, amount) => {
			const before = ctx.calcValue;
			const after = context_addValue(ctx,1*amount);
			return `${before} - ${after}`;
		} 
	},
	{ 
		name:"Sempre -1", time:ROLL_TIME, description: "-1 no valor do dado",
		effect:(ctx, amount) => {
			const before = ctx.calcValue;
			const after = context_addValue(ctx,-1*amount);
			return `${before} - ${after}`;
		},  
	},
	{ 
		name:"Par +1", time:ROLL_TIME, description: "+1 no valor do dado, se ele for par", 
		effect:(ctx, amount) => {
			const before = ctx.calcValue;
			let after = ctx.calcValue;
			if(ctx.rollValue%2===0) {
				after = context_addValue(ctx,1*amount);
			}
			return `${before} - ${after}`;
		}
	},
	{ 
		name:"Impar +1", time:ROLL_TIME, description: "+1 no valor do dado, se ele for impar", 
		effect:(ctx, amount) => {
			const before = ctx.calcValue;
			let after = ctx.calcValue;
			if(ctx.rollValue%2!==0) {
				after = context_addValue(ctx,1*amount);
			}
			return `${before} - ${after}`;
		} 
	},
	{ 
		name:"Par -1", time:ROLL_TIME, description: "-1 no valor do dado, se ele for par", 
		effect:(ctx, amount) => {
			const before = ctx.calcValue;
			let after = ctx.calcValue;
			if(ctx.rollValue%2===0) {
				after = context_addValue(ctx,-1*amount);
			}
			return `${before} - ${after}`;
		}
	},
	{ 
		name:"Impar -1", time:ROLL_TIME, description: "-1 no valor do dado, se ele for impar", 
		effect:(ctx, amount) => {
			const before = ctx.calcValue;
			let after = ctx.calcValue;
			if(ctx.rollValue%2!==0) {
				after = context_addValue(ctx,-1*amount);
			}
			return `${before} - ${after}`;
		} 
	},
	{ 
		name:"Barreira +1", time:ENEMY_TIME, description: "-1 no valor do dano dos inimigos", 
		effect:(ctx, amount) => {
			const before = ctx.enemyRoll;
			const after = context_addEnemyRoll(ctx,-1*amount);
			return `dano ${before} - ${after}`;
		} 
	},
	{ 
		name:"Escudo +1", time:END_ROUND_TIME, description: "+1 de escudo ao final da fase", 
		effect:(ctx, amount) => {
			const before = ctx.shield;
			const after = context_addShield(ctx,1*amount);
			return `escudo ${before} - ${after}`;
		}
	},
	{ 
		name:"Rouba alma", time:END_TURN_TIME, description: "+1 de escudo para cada inimigo derrotado", 
		effect:(ctx,amount) => {
			const before = ctx.shield;
			const after = context_addShield(ctx,ctx.turnKill*amount);
			return `escudo ${before} - ${after}`;
		} 
	},
	{ 
		name:"Level +1", time:END_ROUND_TIME, description: "+1 nivel no final da fase", 
		effect:(ctx,amount) => {
			const before = ctx.levelToUp;
			const after = ctx.levelToUp + 1*amount;
			return `subir de nivel ${before}x - ${after}x`;
		}
	},
	{ 
		name:"Apostar", time:END_TURN_TIME, description: "troca uma carta aleatória ao final de cada turno", 
		effect:(ctx,amount) => {
			return refreshActiveCards(ctx,amount)
		} 
	},
	{ 
		name:"Compra carta", time:END_TURN_TIME, description: "compra uma carta aleatória ao final de cada turno", 
		effect:(ctx,amount) => {
			return context_renewCards(ctx,amount,false);
		} 
	},
	{ 
		name:"Contra ataque", time:ROLL_TIME, description: "caso tome dano no turno anterior, a rolagem fica igual ao alvo de menor valor disponível", 
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
		} 
	},
	{ 
		name:"Escudo +Crítico", time:END_TURN_TIME, description: "+1 de escudo para cada ataque crítico", 
		effect:(ctx,amount) => {
			if(ctx.turnCritic == 0)
				return 'Nenhum ataque critico neste turno';
			const before = ctx.shield;
			const after = context_addShield(ctx,ctx.turnCritic*amount);
			return `escudo ${before} - ${after}`;
		} 
	},
	{ 
		name:"Escudo +Carta", time:END_TURN_TIME, description: "+1 de escudo para cada carta ativa utilizada", 
		effect:(ctx,amount) => {
			const before = ctx.shield;
			if(ctx.playCards.length == 0)
				return 'Nenhuma carta usada neste turno';
			const after = context_addShield(ctx,ctx.playCards.length*amount);
			return `escudo ${before} - ${after}`;
		} 
	},
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
	const passives = Object.values(context.passiveCards);

	var log = "";
	passives.forEach(p=>{
		if(p.time == gameTime) {
			let effect = p.effect(context,p.amount);
			log += `Passiva ${p.name} ${p.amount}x: ${effect}\n`;
		}
	});
	
	context.previewValue = previewTurn(context).calcValue;
	return log.replace(/\n+$/, '');
}

function innate_apply(context, gameTime) {
	const passives = context.innate;

	var log = "";
	passives.forEach(p=>{
		if(p.time == gameTime) {
			let effect = p.effect(context,1);
			log += `Habilidade inata ${p.name}: ${effect}\n`;
		}
	});
	
	context.previewValue = previewTurn(context).calcValue;
	return log.replace(/\n+$/, '');
}