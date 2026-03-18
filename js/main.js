import { MenuScene } from './scenes/Menu.js';
import { LobbyScene } from './scenes/Lobby.js';
import { GameScene } from './scenes/Game.js';
import { ShopScene } from './scenes/Shop.js';

const config = {
    type: Phaser.AUTO,
    width:720,
    height:1280,
    physics:{default:'arcade',arcade:{gravity:{y:1200},debug:false}},
    scene:[MenuScene,LobbyScene,GameScene,ShopScene],
    scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH}
};

new Phaser.Game(config);
