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
		name: "Paladino Ímpar",
		description: "Ele luta pela justiça e a ordem como ninguém",
		shield: 4,
		dice: [1,3,5],
		innate: 7,//"escudo +1",
		passives: [6,2,4],//["barreira +1","Par +1", "Par -1"],
		actives: [],
		sprite:"c_paladino.png",
		spritePos:4,
		draw:(x,y,ctx,cutW,cutH)=>{drawSprite(x,y,CHARACTERS_SPRITES,4,ctx,cutW,cutH)},
		can: "Se defende bem, não gosta de números pares",
		color: '#FDFCEF'
	},
	{
		name: "Mago Mediano",
		description: "Nem o pior nem o melhor",
		shield: 2,
		dice: [3,4],
		innate: 12,//"contra ataque",
		passives: [0,1,8],//["sempre +1","sempre -1","rouba alma"],
		actives: [1,3],//["+2","-2"],
		sprite:"c_mago.png",
		spritePos:3,
		draw:(x,y,ctx,cutW,cutH)=>{drawSprite(x,y,CHARACTERS_SPRITES,3,ctx,cutW,cutH)},
		can: "Tenta sempre adequar o ataque, e pode se curar quando acerta os oponentes",
		color: '#51A6FF'
	},
	{
		name: "Atirador Cego",
		description: "Ele não sabe como faz, mas acerta o alvo",
		shield: 2,
		dice: [2,4,6],
		innate: 13,//"escudo +critico",
		passives: [7,9],//["escudo +1","level +1"],
		actives: [4,5,6,0,2],//["set 3","set 1","set 6","+1","-1"],
		sprite:"c_atirador.png",
		spritePos:0,
		draw:(x,y,ctx,cutW,cutH)=>{drawSprite(x,y,CHARACTERS_SPRITES,0,ctx,cutW,cutH)},
		can: "Tenta ser certeiro, tenta se defender e tenta ficar mais forte o mais rápido possível",
		color: '#14B400'
	},
	{
		name: "Jogador Azarado",
		description: "Consegue ganhar no azar",
		shield: 3,
		dice: [1],
		innate: 14,//"escudo +carta",
		passives: [3,5,0,1,10,11],//["impar +1","impar -1","sempre +1","sempre -1","apostar","compra carta"],
		actives: [7,6,4],//["rouba vida","set 6","set 3"],
		sprite:"c_jogador.png",
		spritePos:2,
		draw:(x,y,ctx,cutW,cutH)=>{drawSprite(x,y,CHARACTERS_SPRITES,2,ctx,cutW,cutH)},
		can: "Apesar do azar, pode mudar seu destino facilmente",
		color: '#525252'
	},
	{
		name: "Bispo Brigão",
		description: "Ele vai deitar o inferno na porrada",
		shield: 3,
		dice: [4,5,6],
		innate: 15,//"escudo extra",
		passives: [6,7,15],//["escudo +1","barreira +1","escudo extra"],
		actives: [6,7,1,0],//["set 6","rouba vida","+2","+1"],
		sprite:"c_bispo.png",
		spritePos:1,
		draw:(x,y,ctx,cutW,cutH)=>{drawSprite(x,y,CHARACTERS_SPRITES,1,ctx,cutW,cutH)},
		can: "Não liga para apanhar, está sempre se defendendo e se cura quando pode",
		color: '#FFE000'
	}
]