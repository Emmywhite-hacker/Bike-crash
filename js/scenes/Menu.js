import { loadGame, gameData } from '../data.js';

export class MenuScene extends Phaser.Scene{
    constructor(){super("MenuScene");}
    preload(){
        this.load.image("bg","assets/images/bg.png");
        this.load.audio("bgm","assets/audio/bgm.mp3");
    }
    create(){
        loadGame();
        this.add.image(360,640,"bg").setScale(2);
        this.add.text(100,200,"HD MOTORBIKE RACING",{fontSize:"50px",fill:"#fff"});

        let playBtn = this.add.rectangle(360,600,300,100,0x00ff00).setInteractive();
        this.add.text(280,570,"PLAY",{fontSize:"40px"});
        playBtn.on("pointerdown",()=>this.scene.start("LobbyScene"));

        let shopBtn = this.add.rectangle(360,750,300,100,0xffff00).setInteractive();
        this.add.text(280,720,"SHOP",{fontSize:"40px"});
        shopBtn.on("pointerdown",()=>this.scene.start("ShopScene"));

        if(!this.bgm){this.bgm=this.sound.add("bgm",{loop:true,volume:0.5});this.bgm.play();}
    }
}
