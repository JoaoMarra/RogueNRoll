const PC_CARDS = [
	{
		name:"Sempre +1", time:ROLL_TIME, description: "Adiciona 1 no valor da rolagem no [PÓS ROLAGEM].",
		effect:(ctx, amount) => {
			const before = ctx.calcValue;
			const after = context_addValue(ctx,1*amount);
			return `${before} - ${after}`;
		} 
	},
	{ 
		name:"Sempre -1", time:ROLL_TIME, description: "Subtrai 1 do valor da rolagem no [PÓS ROLAGEM].",
		effect:(ctx, amount) => {
			const before = ctx.calcValue;
			const after = context_addValue(ctx,-1*amount);
			return `${before} - ${after}`;
		},  
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
		}
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
		} 
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
		}
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
		} 
	},
	{ 
		name:"Barreira +1", time:ENEMY_TIME, description: "Subtrai 1 do valor do dano dos inimigos na [DEFESA].", 
		effect:(ctx, amount) => {
			const before = ctx.enemyRoll;
			const after = context_addEnemyRoll(ctx,-1*amount);
			return `dano ${before} - ${after}`;
		} 
	},
	{ 
		name:"Escudo +1", time:END_ROUND_TIME, description: "Ganha 1 escudo no [FIM DE FASE].", 
		effect:(ctx, amount) => {
			const before = ctx.shield;
			const after = context_addShield(ctx,1*amount);
			return `escudo ${before} - ${after}`;
		}
	},
	{ 
		name:"Rouba Alma", time:END_TURN_TIME, description: "Ganha 1 escudo para cada inimigo derrotado no [FIM DE TURNO].", 
		effect:(ctx,amount) => {
			const before = ctx.shield;
			const after = context_addShield(ctx,ctx.turnKill*amount);
			return `escudo ${before} - ${after}`;
		} 
	},
	{ 
		name:"Level +1", time:END_ROUND_TIME, description: "Ganha 1 nivel extra, no [FIM DE FASE].", 
		effect:(ctx,amount) => {
			const before = ctx.levelToUp;
			const after = ctx.levelToUp + 1*amount;
			return `subir de nivel ${before}x - ${after}x`;
		}
	},
	{ 
		name:"Apostar", time:END_TURN_TIME, description: "Descarta uma carta ativa e compra outra no [FIM DE TURNO].", 
		effect:(ctx,amount) => {
			return refreshActiveCards(ctx,amount)
		} 
	},
	{ 
		name:"Compra Carta", time:END_TURN_TIME, description: "Compra uma carta ativa extra no [FIM DE TURNO].", 
		effect:(ctx,amount) => {
			let log = context_renewCards(ctx,3+amount,false);
			positionActiveCards(ctx);
			return log;
		} 
	},
	{ 
		name:"Contra Ataque", time:ROLL_TIME, description: "Caso tenha sido atingido pelos inimigos no turno anterior, o valor da rolagem após aplicação das cartas passivas, fica igual ao inimigo de menor fraqueza disponível. Aplicada no [PÓS ROLAGEM].", 
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
		name:"Escudo +Crítico", time:END_TURN_TIME, description: "Ganha 1 escudo para cada inimigo derrotado com ataque crítico neste turno. Aplicada no [FIM DE TURNO].", 
		effect:(ctx,amount) => {
			if(ctx.turnCritic == 0)
				return 'Nenhum ataque critico neste turno';
			const before = ctx.shield;
			const after = context_addShield(ctx,ctx.turnCritic*amount);
			return `escudo ${before} - ${after}`;
		} 
	},
	{ 
		name:"Escudo +Carta", time:END_ATTACK, description: "Ganha 1 escudo para cada carta ativa utilizada no ataque deste turno. Aplicada no [PÓS ATAQUE].", 
		effect:(ctx,amount) => {
			const before = ctx.shield;
			if(ctx.playCards.length == 0)
				return 'Nenhuma carta usada neste turno';
			const after = context_addShield(ctx,ctx.playCards.length*amount);
			return `escudo ${before} - ${after}`;
		} 
	},
	{
		name:"Escudo Extra", time:ROLL_TIME, description: "A quantidade de escudos máxima pode ultrapassar em 1 unidade por carta 'Escudo Extra'. No [FIM DE TURNO], a quantidade de escudos que ultrapassarem a quantidade de escudos máxima devem ser descartados.", 
		effect:(ctx,amount) => {
			const before = ctx.extraShield;
			ctx.extraShield += amount;
			const after = before+ctx.extraShield;
			return `escudo extra ${before} - ${after}`;
		} 
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
	
	context.previewValue = previewTurn(context).calcValue;
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
	
	context.previewValue = previewTurn(context).calcValue;
	return log.replace(/\n+$/, '');
}