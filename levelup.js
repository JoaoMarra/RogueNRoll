function closeLevelUP() {
	if(levelup) {
		levelup.style.display = 'none';
		levelupOpened = false;
	}
}

function openLevelup(context) {
	if(levelup) {
		selectedIndex = null;
		CURRENT_CONTEXT = context;
		levelup.style.display = 'block';
		const rect = levelupContent.getBoundingClientRect();
		levelupContent.style.height = (parseInt(window.getComputedStyle(levelup).height)-rect.top)+'px';

		levelupOpened = true;
		skillByChar = {};
		levelupDraw(context);
	}
}

var levelupOpened = false;
const levelupContent = document.getElementById("level_up_content");
var skillByChar = {};
var CURRENT_CONTEXT;
var selectedIndex;

function levelupDraw(context) {
	var html;
	if(VERTICAL) {
		html = '<div style="display: flex;width:100%;flex-wrap: wrap;justify-content: space-around;padding-left:10px;">';	
	} else {
		html = '<div style="display: flex;width:100%;justify-content: space-around;padding-left:10px;">';	
	}
	let passive;
	let index = 0;
	let id;
	for(const c of context.characters) {
		id = `level_id_${index}`;
		skillByChar[index] = [];
		html += `<div id="${id}" class="box-boder character-card" style="margin-right:10px;cursor:pointer;" >
		<div style="display: flex; align-items:center">
		<img src="sprites/${c.sprite}">
		<div>
		<div><strong style="margin-right:.25rem;font-size:20px;">${c.name}</strong></div>
		<div><span style="font-size:14px">Nv.${c.level}</span> -> <span style="font-size:14px;color:#fae634">Nv.${c.level + context.levelToUp}</span></div>
		<div style="display:flex;align-items:center;"><img src="sprites/shield.png" style="margin-right:5px"><span style="font-size:14px;margin-right:4px;">${c.shield * c.level}</span> -> <span style="margin-left:4px;font-size:14px;color:#fae634">${c.shield * (c.level+context.levelToUp)}</span></div>
	</div></div>`
	for(let i=0; i < context.levelToUp; i++) {
		passive = PC_CARDS[c.passives[rand(0,c.passives.length-1)]];
		html += `<div style="background:#444;padding:10px;margin-top:10px;">
		<div style="display:flex;align-items:center;"><img src="sprites/${passive.sprite}" style="margin-right:5px;width:28px;height:auto;"><strong style="font-size:18px;">${passive.name}</strong></div>
		<div style="margin-top:4px;">${passive.description}</div>
	</div>`;
	skillByChar[index].push(passive);
}
html += `</div>`;
index++;
}

html += '</div>';
levelupContent.innerHTML = html;

index = 0;
for(const c of context.characters) {
	id = `level_id_${index}`;
	document.getElementById(id).addEventListener("click",levelClick);
	index++;
}

}

function levelClick(e) {
	const target = e.currentTarget;
	const charPos = parseInt(target.id.substring(9));
	if(selectedIndex != charPos) {
		Array.from(document.getElementsByClassName('selected')).forEach((el)=> {
			el.classList.remove('selected');
		});

		target.classList.add("selected");
		selectedIndex = charPos;
	}
}

function confirmLevelUp() {
	if(selectedIndex != null) {
		const char = CURRENT_CONTEXT.characters[selectedIndex];
		let logs = "";
		logs += context_levelCharacter(CURRENT_CONTEXT, char);
		const passives = skillByChar[selectedIndex];
		passives.forEach((p)=> {
			if(CURRENT_CONTEXT.passiveCards[p.name]) {
				CURRENT_CONTEXT.passiveCards[p.name].amount += 1;
			} else {
				CURRENT_CONTEXT.passiveCards[p.name] = { ...p, amount:1};
			}
			logs += `Nova passiva: ${p.name}`;
		})
		
		closeLevelUP();
		continueNextLevel(logs);
	}
}