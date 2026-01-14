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
            <img style="width:56px;height:56px;" src="sprites/${char.sprite}">
            <div>
                <div style="font-size:18px;"><strong>${char.name}</strong></div>
                <div style="font-size:12px;"><i>${char.description}<br>${char.can}</i></div>
            </div>
        </div>
        <div style="display: flex; align-items: center;justify-content:space-around;margin-top:.5rem;">
    <div style="display:flex;align-items:center;"><img src="sprites/shield.png" style="margin-right:.2rem;">${char.shield}</div>
    <div style="display:flex;align-items:center;"><img src="sprites/dado.png" style="margin-right:.2rem;">[ ${char.dice} ]</div>
        </div>
    <div style="display:flex;align-items:center;margin-top:.5rem;"><img src="sprites/innate.png" style="margin-right:.5rem;">${PC_CARDS[char.innate].name}</div>
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

function fastStart() {
    for(let v=0; v < 3; v++) {
        SELECTED_CHARS[CHARACTERS[v].name] = CHARACTERS[v];
    }
    setTimeout(()=>{
        confirmCharacters()
    },100);
}
// fastStart();