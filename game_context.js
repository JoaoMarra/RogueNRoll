const GAME_CONTEXT = {
    level : 1,
    levelSum : 0,
    shield : 1,
    maxShield: 0,
    extraShield: 0,
    rollValue: null,
    calcValue: null,
    previewValue: null,
    phase: null,
    passedTurn: false,
    activeCards: [],
    passiveCards: {},
    innate: [],
    enemies: [],
    turnKill: 0,
    turnCritic: 0,
    enemyRoll:null,
    lastEnemyRoll:null,
    playCards: [],
    characters: [],
    possibleActive: [],
    levelToUp:1
};

function context_resetTurn(context) {
    context.passedTurn = false;
    context.rollValue=null;
    context.calcValue=null;
    context.previewValue=null;
    context.lastEnemyRoll=context.enemyRoll;
    context.enemyRoll=null;
    context.playCards = []
    context.turnKill = 0;
    context.turnCritic = 0;
    context.extraShield = 0;
    context.shield = Math.min(context.shield, context.maxShield);
    context.phase=GAME_PHASES[0];
}

function context_rollDice(context) {
    let random = rand(1,context.levelSum);
    let values = [];
    let acc = 0;
    for(const char of context.characters) {
        if(random-acc <= char.level) {
            values = char.dice;
            break;
        }
        acc += char.level;
    }
    random = rand(0,values.length-1);
    context.rollValue = values[random];
    context.calcValue = context.rollValue;
    context.previewValue = previewTurn(context).calcValue;

    return context.rollValue;
}

function context_addValue(context, value) {
    context.calcValue += value;
    while(context.calcValue < 0) {
        context.calcValue += 6;
    }
    context.calcValue %= 6;
    if(context.calcValue == 0) {
        context.calcValue = 6;
    }
    return context.calcValue;
}

function context_setValue(context, value) {
    context.calcValue = value;
    context.calcValue %= 6;
    if(context.calcValue == 0) {
        context.calcValue = 6;
    }
    return context.calcValue;
}

function context_addEnemyRoll(context, value) {
    context.enemyRoll += value;
    if(context.enemyRoll <= 0) {
        context.enemyRoll = 1;
    }
    return context.enemyRoll;
}

function context_addShield(context, value) {
    context.shield += value;
    context.shield = Math.min(context.shield,context.maxShield+context.extraShield);
    return context.shield;
}

function context_addLevel(context) {
    context.level += context.levelToUp;
    context.levelToUp = 1;
    return context.level;
}

function context_renewCards(context, amount,clear=true) {
    if(clear)
        context.activeCards = []
    if(context.possibleActive.length == 0)
        return "Nenhuma carta disponível";
    var log = "";
    while(context.activeCards.length < amount) {
        const card = newActiveCard(context)
        log += card.name+",";
        context.activeCards.push(card);
    }
    return log.replace(/,+$/, '');
}

function context_playCard(context, card) {
    if(context.playCards.includes(card)) {
        context.playCards = context.playCards.filter(item => item !== card)
    } else {
        context.playCards.push(card)
    }
    context.previewValue = previewTurn(context).calcValue;
}

function context_applyCards(context,use=false) {
    var log = "";
    context.playCards.forEach(p=>{
        let effect = p.effect(context);
        if(use) {
            p.used = true;
        }
        log += `Ativa ${p.name}: ${effect}\n`;
    });
    return log.replace(/\n+$/, '');
}

function previewTurn(context) {
    const context2 = {...context};
    if(context.calcValue != null) {
        context_applyCards(context2);
    }
    return context2;
}

function context_setCharacters(context, characters) {
    for(const c of characters) {
        context.characters.push({ ...c, level:1});
        context.levelSum += 1;
        context.maxShield += c.shield;
        context.innate.push({...PC_CARDS[c.innate],char:c});
        context.possibleActive.push(...c.actives);
    }
    context.shield = context.maxShield;
}

function context_levelCharacter(context, char) {
    char.level += 1;
    context.maxShield += char.shield;
    context.shield += char.shield;
    context.levelSum += 1;

    context.characters.sort(function(a,b) {
        return b.level - a.level;
    });

    return `${char.name} - Nv${char.level}, +${char.shield} de escudo`;
}