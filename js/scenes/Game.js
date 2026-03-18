import { gameData } from '../data.js';

export class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    preload() {
        // Load any additional assets if needed
        this.load.image("bg", "assets/images/bg.png");
        this.load.image("coin", "assets/images/coin.png");
        this.load.image("bike1", "assets/images/bike1.png");
        this.load.image("bike2", "assets/images/bike2.png");

        this.load.audio("jump", "assets/audio/jump.mp3");
        this.load.audio("coinS", "assets/audio/coin.mp3");
        this.load.audio("crash", "assets/audio/crash.mp3");
    }

    create() {
        // Background
        this.bg = this.add.tileSprite(360, 640, 720, 1280, "bg");

        // Player
        this.player = this.physics.add.sprite(200, 1000, gameData.selectedBike);
        this.player.setCollideWorldBounds(true);
        this.player.setAngularDrag(150);

        // Ground
        this.ground = this.physics.add.staticGroup();
        this.ground.create(360, 1270, null).setScale(720, 100).refreshBody();
        this.physics.add.collider(this.player, this.ground);

        // Coins
        this.coins = this.physics.add.group();
        for (let i = 0; i < 15; i++) {
            let coin = this.coins.create(200 * i, 800, "coin");
            coin.setBounce(0.5);
        }
        this.physics.add.overlap(this.player, this.coins, (player, coin) => {
            coin.destroy();
            gameData.coins++;
            this.sound.play("coinS");
        });

        // UI
        this.coinsText = this.add.text(20, 20, "Coins: 0", { fontSize: "28px", fill: "#fff" });
        this.levelText = this.add.text(500, 20, "Level: " + gameData.level, { fontSize: "28px", fill: "#fff" });

        // Nitro Bar
        this.nitroBarBg = this.add.rectangle(360, 1200, 300, 20, 0xffffff);
        this.nitroBar = this.add.rectangle(360, 1200, 300, 20, 0xffff00);

        // Buttons
        this.left = this.add.rectangle(100, 1100, 120, 120, 0xff0000).setInteractive();
        this.right = this.add.rectangle(250, 1100, 120, 120, 0x00ff00).setInteractive();
        this.jump = this.add.rectangle(620, 1100, 120, 120, 0x0000ff).setInteractive();
        this.nitroBtn = this.add.rectangle(500, 1100, 120, 120, 0xffff00).setInteractive();

        // Tilt Controls
        this.tiltL = this.add.rectangle(50, 950, 100, 100, 0x8888ff).setInteractive();
        this.tiltR = this.add.rectangle(650, 950, 100, 100, 0xff8888).setInteractive();

        // Control Flags
        this.L = this.R = this.J = this.nitro = this.tl = this.tr = false;

        // Event Handlers
        this.left.on("pointerdown", () => this.L = true);
        this.left.on("pointerup", () => this.L = false);

        this.right.on("pointerdown", () => this.R = true);
        this.right.on("pointerup", () => this.R = false);

        this.jump.on("pointerdown", () => this.J = true);
        this.jump.on("pointerup", () => this.J = false);

        this.nitroBtn.on("pointerdown", () => this.nitro = true);
        this.nitroBtn.on("pointerup", () => this.nitro = false);

        this.tiltL.on("pointerdown", () => this.tl = true);
        this.tiltL.on("pointerup", () => this.tl = false);

        this.tiltR.on("pointerdown", () => this.tr = true);
        this.tiltR.on("pointerup", () => this.tr = false);

        // Camera
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

        // Nitro power
        this.nitroPower = 100;
    }

    crash() {
        this.sound.play("crash");
        this.cameras.main.shake(300, 0.02);
        this.player.setTint(0xff0000);

        this.time.delayedCall(1500, () => {
            this.player.clearTint();
            this.player.setPosition(200, 1000);
        });
    }

    update() {
        // Update UI
        this.coinsText.setText("Coins: " + gameData.coins);

        // Determine speed
        let speed = this.nitro && this.nitroPower > 0 ? 600 : 300;

        // Nitro power handling
        if (this.nitro) this.nitroPower -= 0.5;
        else this.nitroPower += 0.2;
        this.nitroPower = Phaser.Math.Clamp(this.nitroPower, 0, 100);
        this.nitroBar.width = this.nitroPower * 3;

        // Movement
        if (this.L) this.player.setAccelerationX(-speed);
        else if (this.R) this.player.setAccelerationX(speed);
        else this.player.setAccelerationX(0);

        // Jump
        if (this.J && this.player.body.touching.down) {
            this.player.setVelocityY(-750);
            this.sound.play("jump");
        }

        // Tilt controls
        if (this.tl) this.player.setAngularVelocity(-200);
        else if (this.tr) this.player.setAngularVelocity(200);
        else this.player.setAngularVelocity(0);

        // Crash detection
        if (this.player.body.touching.down && Math.abs(this.player.angle) > 60) {
            this.crash();
        }

        // Camera zoom effect
        let sp = Math.abs(this.player.body.velocity.x);
        this.cameras.main.setZoom(1 + sp / 2000);
    }
    }
