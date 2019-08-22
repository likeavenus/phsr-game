export default function game() {
    const game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser', { preload: preload, create: create, update: update, render: render });

    let player;
    let cursors;
    let fireButton;
    let weapon;


    function preload() {
        game.load.image('player', '../img/game/tank.png');
        game.load.image('bullet', '../img/game/bullet.png');
    }

    function create() {
        player = game.add.sprite(500, 300, 'player');
        player.scale.setTo(.1, .1);
        player.anchor.setTo(0.5, 0.5);
        player.angle = 270;

        game.physics.arcade.enable(player);

        cursors = game.input.keyboard.createCursorKeys();
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        weapon = game.add.weapon(1, 'bullet');
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.bulletAngleOffset = 90;
        weapon.bulletSpeed = 400;
        weapon.trackSprite(player, 0, 0, false);

        weapon.fireAngle = player.angle + 90;
        weapon.trackRotation = false


    }

    function update() {

        if (cursors.up.isDown) {
            player.y -= 4;
            player.angle = 180;
            weapon.fireAngle = 270;
        } else if (cursors.down.isDown) {
            player.y += 4;
            player.angle = 0;
            weapon.fireAngle = 90;
        } else if (cursors.left.isDown) {
            player.x -= 4;
            player.angle = 90;
            weapon.fireAngle = 180;
        } else if (cursors.right.isDown) {
            player.x += 4;
            player.angle = 270;
            weapon.fireAngle = 360;
        }

        if (fireButton.isDown) {
            weapon.fire()
        }
    }


    function render() {
    }

}