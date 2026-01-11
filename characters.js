const CHARACTERS = [
	{
		name: "Paladino Ímpar",
		description: "Ele luta pela justiça e a ordem como ninguém",
		shield: 4,
		dice: [1,3,5],
		innate: ["escudo +1"],
		passives: ["barreira +1","Par +1", "Par -1"],
		actives: []
	},
	{
		name: "Mago Mediano",
		description: "Nem o pior nem o melhor"
		shield: 2,
		dice: [3,4],
		innate: [],
		passives: ["sempre +1","sempre -1","escudo +1","rouba alma"],
		actives: ["+2","-2"]
	},
	{
		name: "Atirador Cego",
		description: "Ele não sabe como faz, mas acerta o alvo",
		shield: 2,
		dice: [2,4,6],
		innate: ["alvo +escudo"],
		passives: ["escudo +1","level +1"],
		actives: ["set 3","set 1","set 6","+1","-1"]
	},
	{
		name: "Jogador Azarado",
		description: "Consegue ganhar no azar",
		shield: 3,
		dice: [1],
		innate: ["shield +carta"],
		passives: ["impar +1","impar -1","sempre +1","sempre -1","apostar","compra carta"],
		actives: ["rouba vida","set 6","set 3"]
	},
	{
		name: "Bispo Brigão",
		description: "Ele vai deitar o inferno na porrada",
		shield: 3,
		dice: [4,5,6],
		innate: ["barreira +1"],
		passives: ["set 6","Sempre +1","Par +1","impar +1","level +1","rouba alma","escudo +1"],
		actives: ["rouba vida","+2","+1"]
	}
]