
const hallOfFame = document.getElementById("hall_of_fame");
const rankingContent = document.getElementById("ranking_content");

async function buildRanking() {
	const snapshot = await getRanking();

	const ranking = [];
	snapshot.forEach(c => ranking.push(c.val()));

	ranking.reverse();
	let index = 1;

	let html = '<div style="display:flex;flex-direction:column">';
	for(const r of ranking) {
		const characters = r.characters.split("_");
		html += `<div class="ranking_row" style="display:flex; align-items:top;margin-bottom:10px;">
		<h1>${index}</h1>
		<div style="font-size:30px;margin-left:20px;width:100%">
		<div style="margin-left:auto">${formatDate(r.time)}</div>
		<div>${r.name}</div>
		<div style="color:#faefb6;font-size:40px">${r.score}</div>
		<div style="margin-left:auto">`;
		for(const c of characters) {
			html += `<img src="sprites/${CHARACTERS[c].sprite}">`;
		}
		html += `</div></div>
	</div>`;
	index++;
}
html += '</div>';

rankingContent.innerHTML = html;

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