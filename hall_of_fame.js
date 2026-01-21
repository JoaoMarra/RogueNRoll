
const hallOfFame = document.getElementById("hall_of_fame");
const rankingContent = document.getElementById("ranking_content");

async function buildRanking() {
	const snapshot = (await getRanking()).val();
	if(snapshot != null) {
		const ranking = [];
		for(const u of Object.keys(snapshot)) {
			ranking.push({...snapshot[u],'user':u});
		}
		ranking.sort((a,b) => b.score - a.score);

		let selfRank = await selfRanking();
		let index = 1;

		let html = '<div style="display:flex;flex-direction:column">';
		let color = '#fff';
		for(const r of ranking) {
			if(selfRank != null && r.user == selfRank.user) {
				color = '#00bbd4';
				selfRank = null;
			} else {
				color = '#fff';
			}
			html += rankData(r, color, index);
			index++;
		}
		if(selfRank != null) {
			html += rankData(selfRank, '#00bbd4', index);
		}
		html += '</div>';
		rankingContent.innerHTML = html;
	}
}

function rankData(r,color,index) {
	const characters = r.characters.split("_");
	let html = `<div class="ranking_row" style="display:flex; align-items:start;margin-bottom:10px;color:${color};">
			<div style="font-size:40px;">${index}</div>
			<div style="font-size:30px;margin-left:20px;width:100%">
	<div style="display:flex;align-items:end;">
			<div>${r.name}</div>
			<div style="margin-left:auto;font-size:15px;">${formatDate(r.time)}</div>
	</div>
			<div style="color:#faefb6;font-size:40px">${r.score}</div>
	<div style="margin-left:auto">`;
	for(const c of characters) {
		html += `<img src="sprites/${CHARACTERS[c].sprite}">`;
	}
	html += `</div></div></div>`

	return html;
}

async function openRanking() {
	hallOfFame.style.display = 'block';

	await buildRanking();
	const rect =  rankingContent.getBoundingClientRect();
	rankingContent.style.height = (parseInt(window.getComputedStyle(hallOfFame).height)-rect.top)+'px';
}

function closeRanking() {
	hallOfFame.style.display = 'none';
}

function formatDate(timestamp = Date.now()) {
	const d = new Date(timestamp);

	const dd = String(d.getDate()).padStart(2, "0");
	const mm = String(d.getMonth() + 1).padStart(2, "0");
	const yyyy = d.getFullYear();

	const HH = String(d.getHours()).padStart(2, "0");
	const MM = String(d.getMinutes()).padStart(2, "0");

	return `${dd}/${mm}/${yyyy} ${HH}:${MM}`;
}