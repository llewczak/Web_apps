class mainScene {

    preload() {
        this.load.image('bird', './assets/bird/yellowbird-midflap.png');
        this.load.image('birdDown', './assets/bird/yellowbird-downflap.png');
        this.load.image('birdUp', './assets/bird/yellowbird-upflap.png');
        this.load.image('pipe', './assets/bird/pipe-green.png');
        this.load.image('base', './assets/bird/base.png');
        this.load.image('background', './assets/bird/background-day.png');
        this.load.image('message', './assets/UI/message.png');
        this.load.image('gameOver', './assets/UI/gameover.png');
    }

    create() {
        //background and bird
        this.background = this.add.image(288, 512, 'background').setOrigin(1, 1);
        this.bird = this.physics.add.sprite(25, 250, 'bird');

        //pipes
        this.pipeFirstDown = this.physics.add.sprite(200, 550, 'pipe');
        this.pipeFirstUp = this.physics.add.sprite(200, 100, 'pipe');
        this.pipeFirstUp.flipY = true;
        this.pipeSecondDown = this.physics.add.sprite(400, 500, 'pipe');
        this.pipeSecondUp = this.physics.add.sprite(400, 70, 'pipe');
        this.pipeSecondUp.flipY = true;

        //base
        this.base = this.physics.add.sprite(288, 560, 'base').setOrigin(1, 1);

        //score
        this.score = 0;
        let style = {fontFamily: '"Press Start 2P"', fontSize: '10px', fill: '#fff'}
        this.scoreText = this.add.text(200, 20, 'score:' + this.score, style);

        //scoreboard
        this.scoreboard = this.add.container(0, 0);
        const scores = this.loadScores();
        this.scoreboard.add(this.add.text(144, 150, 'SCOREBOARD', style).setOrigin(0.5, 0.5));
        scores.forEach((score, i) => {
            this.scoreboard.add(this.add.text(144, 170 + i * 20, `${i + 1}.${score}`, style).setOrigin(0.5, 0.5));
        });
        this.scoreboard.setVisible(false);

        //jump control
        this.arrow = this.input.keyboard.createCursorKeys();

        //play again button
        this.resetButton = this.add.text(144, 400, 'PLAY AGAIN', style).setOrigin(0.5, 0.5).setInteractive({useHandCursor: true}).on('pointerdown', () => this.reset());
        this.resetButton.setVisible(false);


        //UI
        this.message = this.add.image(144, 256, 'message').setOrigin(0.5, 0.5);
        this.gameOver = this.add.image(144, 100, 'gameOver').setOrigin(0.5, 0.5);
        this.gameOver.setVisible(false);

        //gamestate
        this.running = false;

        //gravity
        this.birdVelocity = 0;
        this.gravity = 0.4;
        this.jumpStrength = -7;
    }

    update() {

        //gamestart
        if (this.arrow.space.isDown && !this.running) {
            this.running = true;
            this.message.setVisible(false);
            this.gameOver.setVisible(false);
            this.scoreboard.setVisible(false);
            this.resetButton.setVisible(false);
            this.reset();
        }

        if (this.running) {
            //collision beahviour
            if (this.physics.overlap(this.bird, this.pipeFirstUp) || this.physics.overlap(this.bird, this.pipeFirstDown) || this.physics.overlap(this.bird, this.pipeSecondUp) || this.physics.overlap(this.bird, this.pipeSecondDown) || this.physics.overlap(this.bird, this.base)) {
                this.hit();
            }

            //bird behaviour
            if (this.bird.y < 500) {
                this.birdVelocity += this.gravity;
                this.bird.y += this.birdVelocity;
            }
            if (Phaser.Input.Keyboard.JustDown(this.arrow.space) && this.bird.y > 10) {
                this.birdVelocity = this.jumpStrength;
            }

            if (this.birdVelocity <= 0){
                this.bird.setTexture('birdDown');
                this.bird.angle = -20;
            } else{
                this.bird.setTexture('birdUp');
                this.bird.angle = 20;
            }

            //pipes behaviour
            if (this.pipeFirstDown.x > -50) {
                this.pipeFirstUp.x -= 1;
                this.pipeFirstDown.x -= 1;
            } else {
                this.pipeFirstUp.x = 400;
                this.pipeFirstDown.x = 400;
                this.pipeFirstDown.y = Phaser.Math.Between(355, 550);
                this.pipeFirstUp.y = this.pipeFirstDown.y - 450;
            }

            if (this.pipeSecondDown.x > -50) {
                this.pipeSecondUp.x -= 1;
                this.pipeSecondDown.x -= 1;
            } else {
                this.pipeSecondUp.x = 400;
                this.pipeSecondDown.x = 400;
                this.pipeSecondDown.y = Phaser.Math.Between(355, 550);
                this.pipeSecondUp.y = this.pipeSecondDown.y - 450;
            }

            this.scoreText.setText('score:' + this.score);

            if (this.bird.x === this.pipeFirstUp.x || this.bird.x === this.pipeSecondUp.x) {
                this.score += 1;
            }
        }

    }

    hit() {
        this.gameOver.setVisible(true);
        this.scoreboard.setVisible(true);
        this.resetButton.setVisible(true);
        this.saveScore(this.score);
        this.updateScoreboard();
        this.running = false;
    }

    reset() {
        this.score = 0;
        this.bird.x = 25;
        this.bird.y = 250;
        this.pipeFirstDown.x = 200;
        this.pipeFirstDown.y = 550;
        this.pipeFirstUp.x = 200;
        this.pipeFirstUp.y = 100;
        this.pipeSecondDown.x = 400;
        this.pipeSecondDown.y = 500;
        this.pipeSecondUp.x = 400;
        this.pipeSecondUp.y = 70;

        this.birdVelocity = 0;
        this.gravity = 0.4;
        this.jumpStrength = -7;

        this.running = true;
        this.message.setVisible(false);
        this.gameOver.setVisible(false);
        this.scoreboard.setVisible(false);
        this.resetButton.setVisible(false);
    }

    saveScore(score) {
        let scores = JSON.parse(localStorage.getItem('scores')) || [];
        scores.push(score);
        scores.sort((a, b) => b - a);
        scores = scores.slice(0, 5);
        localStorage.setItem('scores', JSON.stringify(scores));
    }

    loadScores() {
        return JSON.parse(localStorage.getItem('scores')) || [];
    }

    updateScoreboard() {
        const style = {fontFamily: '"Press Start 2P"', fontSize: '10px', fill: '#fff'};
        this.scoreboard.removeAll(true);
        const scores = this.loadScores();
        this.scoreboard.add(this.add.text(144, 150, 'SCOREBOARD', style).setOrigin(0.5, 0.5));
        scores.forEach((score, i) => {
            this.scoreboard.add(this.add.text(144, 170 + i * 20, `${i + 1}.${score}`, style).setOrigin(0.5, 0.5));
        });
    }
}

new Phaser.Game({
    width: 288,
    height: 512,
    backgroundColor: '#3498db',
    scene: mainScene,
    physics: {default: 'arcade'},
    parent: 'game',
});