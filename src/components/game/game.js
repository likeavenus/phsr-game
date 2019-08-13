export default function game() {
    const game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser', { preload: preload, create: create, update: update });

    let player;
    let cursors;
    let bullets;
    let bullet;
    let fireButton;
    let bulletTime = 0;

    let enemy;


    function preload() {
        game.load.image('player', '../img/game/tank.png');
        game.load.image('bullet', 'https://examples.phaser.io/assets/games/invaders/bullet.png');
    }

    function create() {
        player = game.add.sprite(500, 300, 'player');
        player.scale.setTo(.1, .1);
        player.anchor.setTo(0.5, 0.5);
        player.physicsBodyType = Phaser.Physics.ARCADE;

        cursors = game.input.keyboard.createCursorKeys();
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(30, 'bullet');
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 1);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);
    }

    function update() {
        if (cursors.up.isDown) {
            player.y -= 4;
            player.rotation = 3.14;

            console.log(cursors.up);
        } else if (cursors.down.isDown) {
            player.y += 4;
            player.rotation = 0;
        } else if (cursors.left.isDown) {
            player.x -= 4;
            player.rotation = 1.58;
        } else if (cursors.right.isDown) {
            player.x += 4;
            player.rotation = 4.72;
        }

        if (fireButton.isDown) {
            fireBullet();
        }
    }

    
    function fireBullet() {
        if (game.time.now > bulletTime) {
            bullet = bullets.getFirstExists(false);

            if (bullet) {
                bullet.reset(player.x, player.y + 8);
                bullet.body.velocity.y = -400;
                bulletTime = game.time.now + 200;
            }
        }

    }


}