import { gameData, saveGame } from '../data.js';
export class ShopScene extends Phaser.Scene{
    constructor(){super("ShopScene");}
    create(){
        this.add.text(250,200,"SHOP",{fontSize:"50px"});
        let buyBtn = this.add.text(200,500,"Buy Bike2 - 20 Coins",{fontSize:"35px"}).setInteractive();
        buyBtn.on("pointerdown",()=>{
            if(gameData.coins>=20){gameData.coins-=20;gameData.bikes.push("bike2");saveGame();}
        });
        let back = this.add.text(50,1100,"BACK",{fontSize:"40px"}).setInteractive();
        back.on("pointerdown",()=>this.scene.start("MenuScene"));
    }
}
