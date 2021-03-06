export default function game() {
    const game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser', { preload: preload, create: create, update: update, render: render });

    let player;
    let cursors;
    let fireButton;
    let weapon;
    let  weapon2;
    let controls;

    let enemy;


    function preload() {
        game.load.image('player', '../img/game/tank.png');
        game.load.image('bullet', '../img/game/bullet.png');
    }

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0, 0, 800, 600);

        player = game.add.sprite(500, 300, 'player');
        player.scale.setTo(.1, .1);
        player.anchor.setTo(0.5, 0.5);
        player.angle = 270;
        player.enableBody = true;

        cursors = game.input.keyboard.createCursorKeys();

        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        weapon = game.add.weapon(1, 'bullet');
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.bulletAngleOffset = 90;
        weapon.bulletSpeed = 400;
        weapon.trackSprite(player, 0, 0, false);
        weapon.fireAngle = player.angle + 90;

        enemy = game.add.sprite(500, 100, 'player');
        enemy.scale.setTo(.1, .1);
        enemy.anchor.setTo(0.5, 0.5);
        enemy.angle = 270;
        enemy.enableBody = true;


        weapon2 = game.add.weapon(1, 'bullet');
        weapon2.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon2.bulletAngleOffset = 90;
        weapon2.bulletSpeed = 1400;
        weapon2.trackSprite(enemy, 0, 0, false);
        weapon2.fireAngle = enemy.angle + 90;



        controls = {
            right : this.input.keyboard.addKey(Phaser.Keyboard.D),
            left : this.input.keyboard.addKey(Phaser.Keyboard.A),
            up : this.input.keyboard.addKey(Phaser.Keyboard.W),
            down : this.input.keyboard.addKey(Phaser.Keyboard.S),
            fire : this.input.keyboard.addKey(Phaser.Keyboard.Q),
        };


        game.physics.arcade.enable(player);
        game.physics.arcade.enable(enemy);

        player.body.collideWorldBounds = true;
        enemy.body.collideWorldBounds = true;

        console.log(player);

    }

    function killThem(enemy,  bullet) {
        console.dir(weapon);
        enemy.kill();
        bullet.kill();

    }

    function collisionHandler () {
        //nothing goes here
    }

    function update() {
        game.physics.arcade.collide(weapon.bullets, enemy, killThem);
        game.physics.arcade.collide(weapon2.bullets, player, killThem);

        game.physics.arcade.collide(player, enemy, collisionHandler, null, this);



        if (cursors.up.isDown) {
            player.body.velocity.x = 0;
            player.body.velocity.y = -200;
            player.angle = 180;
            weapon.fireAngle = 270;
        } else if (cursors.down.isDown) {
            player.body.velocity.x = 0;
            player.body.velocity.y = 200;
            player.angle = 0;
            weapon.fireAngle = 90;
        } else if (cursors.left.isDown) {
            player.body.velocity.y = 0;
            player.body.velocity.x = -200;
            player.angle = 90;
            weapon.fireAngle = 180;
        } else if (cursors.right.isDown) {
            player.body.velocity.y = 0;
            player.body.velocity.x = 200;
            player.angle = 270;
            weapon.fireAngle = 360;
        } else {
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
        }



        if (fireButton.isDown) {
            weapon.fire()
        }


        if (controls.up.isDown) {
            enemy.body.velocity.x = 0;
            enemy.body.velocity.y = -200;
            enemy.angle = 180;
            weapon2.fireAngle = 270;
        } else if (controls.down.isDown) {
            enemy.body.velocity.x = 0;
            enemy.body.velocity.y = 200;
            enemy.angle = 0;
            weapon2.fireAngle = 90;
        } else if (controls.left.isDown) {
            enemy.body.velocity.y = 0;
            enemy.body.velocity.x = -200;
            enemy.angle = 90;
            weapon2.fireAngle = 180;
        } else if (controls.right.isDown) {
            enemy.body.velocity.y = 0;
            enemy.body.velocity.x = 200;
            enemy.angle = 270;
            weapon2.fireAngle = 360;
        }  else {
            enemy.body.velocity.x = 0;
            enemy.body.velocity.y = 0;
        }


        if (controls.fire.isDown) {
            weapon2.fire()
        }
    }


    function render() {
        weapon.debug()
    }

}