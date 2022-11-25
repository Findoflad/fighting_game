const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const gravity = 0.7
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

//game screen
canvas.width = 1024
canvas.height = 576

context.fillRect(0, 0, canvas.width, canvas.height)

function animate() {
    window.requestAnimationFrame(animate)
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    test.update()
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    //player movement
    player.image = player.sprites.idle.image
    player.framesMax = player.sprites.idle.framesMax
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
        player.image = player.sprites.run.image
        player.framesMax = player.sprites.run.framesMax
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
        player.image = player.sprites.run.image
        player.framesMax = player.sprites.run.framesMax
    }

    //enemy movement
    enemy.image = enemy.sprites.idle.image
    enemy.framesMax = enemy.sprites.idle.framesMax
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
    }

    //collision detect
    if (collision({ rectangle_1: player, rectangle_2: enemy }) && player.isAttacking) {
        player.isAttacking = false
        enemy.health -= 10
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    }

    if (collision({ rectangle_1: enemy, rectangle_2: player }) && enemy.isAttacking) {
        enemy.isAttacking = false
        player.health -= 10
        document.querySelector('#playerHealth').style.width = player.health + '%'
    }

    //game end
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({ player, enemy, timerId })
    }
}

const background = new Sprite({
    position: { x: 0, y: 0 },
    imageSrc: './background/back_image.png',
    framesMax: 24
})

const test = new Sprite({
    position: { x: 0, y: 0 },
    imageSrc: './sprites/Player_2/idle.png',
    framesMax: 7,
    scale: 0.7
})

//creating players
const player = new Fighter({
    position: { x: 256, y: 100 },
    velocity: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    imageSrc: './sprites/Player_1/idle.png',
    framesMax: 9,
    scale: 0.7,
    offset: {x: 215, y: 145},
    sprites: {
        idle:{
            imageSrc:'./sprites/Player_1/idle.png',
            framesMax: 9
        },
        run:{
            imageSrc:'./sprites/Player_1/run.png',
            framesMax: 14
        }
    }
})

const enemy = new Fighter({
    position: { x: 768, y: 100 },
    velocity: { x: 0, y: 0 },
    offset: { x: -50, y: 0 },
    imageSrc: './sprites/Player_2/idle.png',
    framesMax: 7,
    scale: 0.6,
    offset: {x: 215, y: 125},
    sprites: {
        idle:{
            imageSrc:'./sprites/Player_2/idle.png',
            framesMax: 7
        }
    }
})


timerDecreasing()

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        //player keys
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -15
            break
        case ' ':
            player.attack()
            break

        //enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -15
            break
        case 'k':
            enemy.attack()
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        //player keys
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break

        //enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
})