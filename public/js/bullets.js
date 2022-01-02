class Bullet extends Phaser.Physics.Arcade.Sprite

// Class representing a single bullet object
// inherit from the sprite class

{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'bullet')

    }


    fire (x ,y)
    {
        this.setScale(0.1)
        this.body.reset(x,y)
        this.setActive(true)
        this.setVisible(true)
        this.setVelocityY(-10000);
    }

    location () {
        return [this.x, this.y]
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta)

        if (this.y <= -32)
        {
            this.destroy()
        }
    }
}


class Bullets extends Phaser.Physics.Arcade.Group

    /**
     * Bullet group class
     */


{
    constructor(scene)
    {
        super(scene.physics.world, scene)
        
        this.createMultiple({
            frameQuantity:1,
            key:'bullet',
            active:false,
            visible:false,
            classType:Bullet
        })
    }

    fireBullet (x, y)
    {
        let bullet = this.getFirstDead(true)

        if (bullet)
        {
            bullet.fire(x, y)
        }
    }
}
