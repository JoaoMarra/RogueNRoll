const TAG_WIDTH = 440/2;
const TAG_HEIGHT = TAG_WIDTH/1.65;

var TAG_SPRITE = null;

async function drawTag(pos, text,back,front) {
    if(TAG_SPRITE == null) {
        TAG_SPRITE = await loadImageSafe('../sprites/abnormal.png');
    }
    const canvas = document.createElement('canvas');
    canvas.width = TAG_WIDTH;
    canvas.height = TAG_HEIGHT;
    const ctx = canvas.getContext("2d");

    const boder = 10;
    ctx.fillStyle = back;
    ctx.beginPath();
    ctx.roundRect(0, 0, TAG_WIDTH, TAG_HEIGHT, 20);
    ctx.fill();
    ctx.strokeStyle = front;
    ctx.beginPath();
    ctx.roundRect(boder, boder, TAG_WIDTH-2*boder, TAG_HEIGHT-2*boder, 20);
    ctx.stroke();

    const sSize = 56;
    const y = (TAG_HEIGHT-2*boder)/2-sSize/2;
    ctx.fillStyle = front;

    drawSprite(TAG_WIDTH/2-sSize/2,y, TAG_SPRITE, pos, sSize, sSize,ctx);

    setFontSize(18, ctx);
    ctx.fillText(text,TAG_WIDTH/2 - ctx.measureText(text).width/2, y+sSize+30);

    return canvas;
}