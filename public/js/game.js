const WORLD_WIDTH = 1800
const WORLD_HEIGHT = 800


class GameObject extends Phaser.Scene {

    /**
     * Main game object that is loaded into the screen
     * consists of three methods:
     *  preload calls the image_loader and adds static files
     *  create creates the game with actors and platform
     *  update is ran during the game to check for changes
     */

    constructor () {
        super()
        var platforms;
        var spaceship;
        var bullets;

        var monsters;

        var leftKey;
        var rightKey;
        var spaceKey;
        var hasFired;
        var score;
        var scoreText;
    }
    
    preload ()
    {
        // call the imageload function from loader.js
        /// to provide the name and url for the images
        var imageArray = image_loader()
        imageArray.forEach( image => { this.load.image(image.name, image.link)})
    }


    create ()
    {
        this.bullets = new Bullets(this);
        this.aliens = new Aliens(this);
        
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // build static world
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(600, 800, 'ground')
        
        // build player
        this.spaceship = this.physics.add.sprite(600, 710, 'spaceship')
        this.spaceship.setScale(0.3)
        this.spaceship.setCollideWorldBounds(true);

        this.score = -10;
        this.scoreText = this.add.text(90, 0, 'score: 0', { fontSize: '32px', fill: '#ffffff' });

        // make player move on barrier
        this.physics.add.collider(this.spaceship, this.platforms);

    }

    update ()
    {
        // check if there are aliens, if not spawn them
        if (this.aliens.children.entries.length === 0) {
            for (let i=100; i < WORLD_WIDTH; i = i + 100 ){
                this.aliens.spawnAlien(i, Math.floor(Math.random() * 150))
            }
        }
        
        // check if a bullet hits an alien within the given radius
        this.bullets.children.entries.forEach( bullet => {
            this.aliens.children.entries.forEach( alien => {

                let bullenSplashLeft = bullet.x - 25
                let bulletSplashRight = bullet.x + 25

                if (alien.x > bullenSplashLeft && alien.x < bulletSplashRight) {
                        alien.destroy()
                        this.score += 10;
                        this.scoreText.setText('Score: ' + this.score);
                        console.log(this.score)
                    } 
            })
        })

        // Check if keys are pressed and eather move or shoot.
        if (this.leftKey.isDown)
            {
                this.spaceship.x -= 3

            }
        if (this.rightKey.isDown)
            {
                this.spaceship.x += 3
            }
        
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.bullets.fireBullet(this.spaceship.x, this.spaceship.y);
        }
    }
}


// Create the game from the GameObject with its configurations
var config = {
    type: Phaser.AUTO,
    width: WORLD_WIDTH,
    height: WORLD_HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1 },
            debug: false
        }
    },
    scene: GameObject
};

var game = new Phaser.Game(config);