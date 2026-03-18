export class LobbyScene extends Phaser.Scene{
    constructor(){super("LobbyScene");}
    create(){
        this.socket=io();
        this.add.text(150,300,"WAITING FOR OTHER PLAYERS",{fontSize:"40px"});

        let readyBtn = this.add.rectangle(360,700,300,120,0x00ff00).setInteractive();
        let readyText = this.add.text(270,670,"READY",{fontSize:"50px"});

        readyBtn.on("pointerdown",()=>{
            this.socket.emit("playerReady");
            readyText.setText("WAITING...");
        });

        this.socket.on("countdown",(num)=>{this.scene.start("GameScene");});
    }
}
