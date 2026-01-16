const ROLL_TIME = 0
const END_ATTACK = 1
const ENEMY_TIME = 2
const END_TURN_TIME = 3
const END_ROUND_TIME = 4

const TURN_LABELS = [
	'PÓS ROLAGEM',
	'PÓS ATAQUE',
	'DEFESA',
	'FIM DE TURNO',
	'FIM DE FASE'
]

const rand = (a,b)=>{
	if(a==b)
		return a;
	else
		return a+Math.floor(Math.random()*(b-a+1));
};