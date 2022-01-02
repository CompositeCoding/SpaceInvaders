class Alien extends Phaser.Physics.Arcade.Sprite

// Class representing a single alien object
// inherit from the sprite class

{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'alien')

    }

    spawn (x, y){
        this.setScale(0.2)
        this.body.reset(x,y)
        this.setActive(true)
        this.setVisible(true)
        this.setVelocityY(10);
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta)

        if (this.y <= -32)
        {
            this.setActive(false)
            this.setVisible(false)
        }
    }
}


class Aliens extends Phaser.Physics.Arcade.Group 

    /**
     * Alien group class, allows to create alien
     * objects who share common properties
     */

{
    constructor(scene)
    {
        super(scene.physics.world, scene)
        
        this.createMultiple({
            frameQuantity:1,
            key:'alien',
            active:false,
            visible:false,
            classType:Alien
        })
    }

    spawnAlien (x, y)
    {   
        let alien = this.getFirstDead(true)

        if (alien)
        {
            alien.spawn(x, y)
        }
    }
}
