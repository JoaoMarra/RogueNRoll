const charSelectInner = document.getElementById("char_select_inner");
const SELECTED_CHARS = {};

var html = "<div>";
var i=0;
for(const c of CHARACTERS) {
    const id = `char_${i}`;
    html += characterTemplate(c,id);
    i++;
}
html += "</div>"
charSelectInner.innerHTML = html;
i=0;
for(const c of CHARACTERS) {
    const id = `char_${i}`;
    document.getElementById(id).addEventListener("click",charClick);
    i++;
}

function characterTemplate(char,id) {
    return `<div id="${id}" class="box-boder" style="margin-left:10px;margin-right: 10px;padding: 10px">
        <div style="display: flex;align-items: top;">
            <img src="sprites/${char.sprite}">
            <div>
                <strong>${char.name}</strong><br>
                <i>${char.description}<br>${char.can}</i>
            </div>
        </div>
        <div style="display: flex; align-items: center;">
    <img src="sprites/shield.png" style="margin-right: 5px;">${char.shield}
    <img src="sprites/dado.png" style="margin-right: 5px;margin-left:10px;">[ ${char.dice} ]
    <img src="sprites/innate.png" style="margin-right: 5px;margin-left:10px;">${PC_CARDS[char.innate].name}
        </div>
    <div>
    </div>
    </div>`;
}

function charClick(e) {
    const target = e.currentTarget;
    const charPos = parseInt(target.id.substring(5));
    const char = CHARACTERS[charPos];
    if(SELECTED_CHARS[char.name]) {
        target.classList.remove("selected");
        delete SELECTED_CHARS[char.name];
    } else {
        if(Object.values(SELECTED_CHARS).length < 3) {
            target.classList.add("selected");
            SELECTED_CHARS[char.name] = char;
        }
    }
}