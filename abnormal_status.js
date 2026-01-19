var ABNORMAL_LOADED = false;
const ABNORMAL_SPRITES = new Image();
ABNORMAL_SPRITES.src = "sprites/abnormal.png"
ABNORMAL_SPRITES.onload = function () {
	ABNORMAL_LOADED = true;
	try {
		playGame();
	} catch(e) {}
};

AB_STATUS = [
	{
		name:"Mudo",
		description:"Aventureiros mudos não podem usar cartas ativas",
		time:DECISION_TIME,
		apply:(ctx) => {
			return [false,'Você está mudo e não pode usar cartas ativas'];
		},
		offTime:END_ATTACK,
		draw:(x,y,w,h)=>{drawSprite(x,y,ABNORMAL_SPRITES,0,ctx,null,null,w,h)},
	},
	{
		name:"Veneno",
		description:"Aventureiros envenenados perdem 1 escudo no [FIM DE TURNO].",
		time:END_TURN_TIME,
		apply:(ctx) => {
			const before = ctx.shield;
			const after = context_addShield(ctx, -1);
			return [true,`escudo ${before} - ${after}`];
		},
		offTime:END_ROUND_TIME,
		draw:(x,y,w,h)=>{drawSprite(x,y,ABNORMAL_SPRITES,1,ctx,null,null,w,h)},
	},
]

function abnormal_apply(context, gameTime) {
	const abnormal = Object.values(context.abnormalStatus).filter((p)=>p.time == gameTime);

	var log = "";
	var turnOk = true;
	abnormal.forEach(p=>{
		let effect = p.apply(context,p.amount);
		log += `Estado anormal ${p.name}: ${effect[1]}\n`;
		turnOk = turnOk && effect[0];
	});
	return [turnOk,log.replace(/\n+$/, '')];
}

function abnormal_off(context, gameTime) {
	const abnormal = Object.values(context.abnormalStatus).filter((p)=>p.offTime == gameTime);

	var log = "";
	abnormal.forEach(p=>{
		delete context.abnormalStatus[p.name];
		log += `Estado anormal ${p.name} removido\n`;
	});
	return log.replace(/\n+$/, '');
}