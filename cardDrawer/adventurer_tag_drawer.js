const AD_TAG_WIDTH = 220/2;
const AD_TAG_HEIGHT = AD_TAG_WIDTH;

var AD_TAG_SPRITE = null;

async function drawAdventurerTag(pos,back,front) {
    if(AD_TAG_SPRITE == null) {
        AD_TAG_SPRITE = await loadImageSafe('../sprites/adtag.png');
    }
    const canvas = document.createElement('canvas');
    canvas.width = TAG_WIDTH;
    canvas.height = TAG_HEIGHT;
    const ctx = canvas.getContext("2d");

    const boder = 3;
    ctx.fillStyle = back;
    ctx.beginPath();
    ctx.arc(AD_TAG_WIDTH/2,AD_TAG_HEIGHT/2,AD_TAG_WIDTH/2,0,2*Math.PI);
    ctx.fill();
    ctx.strokeStyle = front;
    ctx.beginPath();
    ctx.arc(AD_TAG_WIDTH/2,AD_TAG_HEIGHT/2,AD_TAG_WIDTH/2-2*boder,0,2*Math.PI);
    ctx.stroke();

    const sSize = 56;
    drawSprite(AD_TAG_WIDTH/2-sSize/2,AD_TAG_HEIGHT/2-sSize/2, AD_TAG_SPRITE, pos, sSize, sSize,ctx);

    return canvas;
}