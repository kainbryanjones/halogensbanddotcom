export class VisualiserSpec {
    constructor(lineWidth,strokeStyle,fillStyle){
        this.lineWidth=lineWidth;
        this.strokeStyle=strokeStyle;
        this.fillStyle=fillStyle;
    }
}

export const fixBlurryCanvas = (canvas) => {
    let dpi = window.devicePixelRatio;
    let styleHeight = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    let styleWidth = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    canvas.setAttribute('height', styleHeight * dpi);
    canvas.setAttribute('width', styleWidth * dpi);
}