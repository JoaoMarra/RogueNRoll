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
			const before = ctx.level;
			const after = context_addLevel(ctx,1*amount);
			return `level ${before} - ${after}`;
		}
	},
	{ 
		name:"Apostar", time:END_TURN_TIME, description: "troca uma carta aleatória ao final de cada turno", 
		effect:(ctx,amount) => {
			return refreshActiveCards(ctx,amount)
		} 
	}
]

function newPassiveCard(context) {
	let c = PC_CARDS[rand(0,PC_CARDS.length-1)];
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