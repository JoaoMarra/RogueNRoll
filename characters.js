var CHARACTERS_LOADED = false;
const CHARACTERS_SPRITES = new Image();
CHARACTERS_SPRITES.src = "sprites/characters.png"
CHARACTERS_SPRITES.onload = function () {
	CHARACTERS_LOADED = true;
	try {
		playGame();
	} catch(e) {}
};

const CHARACTERS = [
	{
		pos:0,
		name: "Paladino Ímpar",
		description: "Ele luta pela justiça e a ordem como ninguém.",
		shield: 4,
		dice: [1,3,5],
		innate: 16,//"Impulso Lateral",
		passives: [6,2,4],//["barreira +1","Par +1", "Par -1"],
		passiveProportion: [4,3,3],
		actives: [8,9,10,11],//bloqueios
		activeProportion: [2,2,2,2],
		sprite:"c_paladino.png",
		spritePos:4,
		draw:(x,y,ctx,cutW,cutH)=>{drawSprite(x,y,CHARACTERS_SPRITES,4,ctx,cutW,cutH)},
		can: "Sabe se defender, não gosta de números pares.",
		color: '#FDFCEF'
	},
	{
		pos:1,
		name: "Mago Mediano",
		description: "Nem o pior, nem o melhor.",
		shield: 2,
		dice: [3,4],
		innate: 12,//"contra ataque",
		passives: [0,1],//["sempre +1","sempre -1"],
		passiveProportion: [5,5],
		actives: [1,3,7],//["+2","-2","rouba vida"],
		activeProportion: [3,3,3],
		sprite:"c_mago.png",
		spritePos:3,
		draw:(x,y,ctx,cutW,cutH)=>{drawSprite(x,y,CHARACTERS_SPRITES,3,ctx,cutW,cutH)},
		can: "Tenta sempre adequar o ataque, e pode se curar quando acerta os oponentes.",
		color: '#51A6FF'
	},
	{
		pos:2,
		name: "Atirador Cego",
		description: "Ele não sabe como faz, mas acerta o alvo.",
		shield: 2,
		dice: [2,4,6],
		innate: 9,//"leve +1",
		passives: [7,13],//["escudo +1","escudo +critico"],
		passiveProportion: [6,4],
		actives: [4,0,2],//["fixa 3","+1","-1"],
		activeProportion: [3,3,3],
		sprite:"c_atirador.png",
		spritePos:0,
		draw:(x,y,ctx,cutW,cutH)=>{drawSprite(x,y,CHARACTERS_SPRITES,0,ctx,cutW,cutH)},
		can: "Tenta ser certeiro, tenta se defender e tenta ficar mais forte o mais rápido possível.",
		color: '#14B400'
	},
	{
		pos:3,
		name: "Jogador Azarado",
		description: "Consegue ganhar no azar.",
		shield: 3,
		dice: [1],
		innate: 14,//"escudo +carta",
		passives: [3,5,0,1,10,11],//["impar +1","impar -1","sempre +1","sempre -1","apostar","compra carta"],
		passiveProportion: [1,1,2,1,3,2],
		actives: [7,6,4],//["rouba vida","fixa 6","fixa 3"],
		activeProportion: [2,4,4],
		sprite:"c_jogador.png",
		spritePos:2,
		draw:(x,y,ctx,cutW,cutH)=>{drawSprite(x,y,CHARACTERS_SPRITES,2,ctx,cutW,cutH)},
		can: "Apesar do azar, pode mudar seu destino facilmente.",
		color: '#525252'
	},
	{
		pos:4,
		name: "Bispo Brigão",
		description: "Ele enfrenta seus pecados no soco.",
		shield: 3,
		dice: [4,5,6],
		innate: 15,//"escudo extra",
		passives: [6,7,15],//["escudo +1","barreira +1","escudo extra"],
		passiveProportion: [3,4,3],
		actives: [6,7,1,0],//["fixa 6","rouba vida","+2","+1"],
		activeProportion: [2,4,2,2],
		sprite:"c_bispo.png",
		spritePos:1,
		draw:(x,y,ctx,cutW,cutH)=>{drawSprite(x,y,CHARACTERS_SPRITES,1,ctx,cutW,cutH)},
		can: "Não liga para apanhar, está sempre se defendendo e se cura quando pode.",
		color: '#FFE000'
	}
]