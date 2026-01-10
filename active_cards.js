const AC_CARDS = [
	{ 
		name:"+1", description: "+1 no valor de ataque", 
		effect:(ctx) => {
			const before = ctx.calcValue;
			const after = context_addValue(ctx,1);
			return `${before} - ${after}`;
		} 
	},
	{ 
		name:"+2", description: "+2 no valor de ataque",
		effect:(ctx) => {
			const before = ctx.calcValue;
			const after = context_addValue(ctx,2);
			return `${before} - ${after}`;
		} 
	},
	{ 
		name:"-1", description: "-1 no valor de ataque", 
		effect:(ctx) => {
			const before = ctx.calcValue;
			const after = context_addValue(ctx,-1);
			return `${before} - ${after}`;
		}
	},
	{ 
		name:"-2", description: "-2 no valor de ataque",
		effect:(ctx) => {
			const before = ctx.calcValue;
			const after = context_addValue(ctx,-2);
			return `${before} - ${after}`;
		}
	},
	{ 
		name:"set 3", description: "valor de ataque definido para 3", 
		effect:(ctx) => {
			const before = ctx.calcValue;
			const after = context_setValue(ctx, 3);
			return `${before} - ${after}`;
		}
	},
	{ 
		name:"set 1", description: "valor de ataque definido para 1", 
		effect:(ctx) => {
			const before = ctx.calcValue;
			const after = context_setValue(ctx, 1);
			return `${before} - ${after}`;
		}
	},
	{ 
		name:"set 6", description: "valor de ataque definido para 6", 
		effect:(ctx) => {
			const before = ctx.calcValue;
			const after = context_setValue(ctx, 6);
			return `${before} - ${after}`;
		}
	},
	{ 
		name:"Rouba vida", description: "ganha escudo de acordo com o valor de ataque",
		effect:(ctx) => {
			const before = ctx.shield;
			const after = context_addShield(ctx,ctx.calcValue);
			return `escudo ${before} - ${after}`;
		}
	},
]

function newActiveCard(context) {
	const c = AC_CARDS[rand(0,AC_CARDS.length-1)];
	return { ...c, used:false };
}

function refreshActiveCards(context,amount) {
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