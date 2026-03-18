export function createButton(scene,x,y,w,h,color,label){
    let btn = scene.add.rectangle(x,y,w,h,color).setInteractive();
    btn.setAlpha(0.5);
    scene.add.text(x-w/4,y-20,label,{fontSize:"32px",fill:"#fff"});
    return btn;
}

export function clamp(val,min,max){return Math.max(min,Math.min(max,val));}
