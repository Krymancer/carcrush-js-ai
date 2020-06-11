export const bg = new Image();
export const car = new Image();

export function loadAssets() {
    car.src = './assets/blue.png'
    bg.src = './assets/street.png'
}

export function drawBackground(context){
    context.drawImage(bg,0,0);
}