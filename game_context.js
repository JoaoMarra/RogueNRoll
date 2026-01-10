const GAME_CONTEXT = {
    level : 1,
    shield : 10,
    rollValue: null,
    calcValue: null,
    phase: null,
    passedTurn: false,
    activeCards: [],
    passiveCards: {},
    enemies: [],
    turnKill: 0,
    enemyRoll:null,
    playCards: []
};

function context_resetTurn(context) {
    context.passedTurn = false;
}

function context_rollDice(context) {
    context.rollValue = rand(1,6);
    context.calcValue = context.rollValue;

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
    return context.shield;
}

function context_addLevel(context, value) {
    context.level += value;
    return context.level;
}

function context_renewCards(context, amount) {
    context.activeCards = []
    while(context.activeCards.length < amount) {
        context.activeCards.push(newActiveCard(context));
    }
    return context.activeCards;
}

function context_playCard(context, card) {
    if(context.playCards.includes(card)) {
        context.playCards = context.playCards.filter(item => item !== card)
    } else {
        context.playCards.push(card)
    }
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