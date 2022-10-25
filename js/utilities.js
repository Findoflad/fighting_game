function collision({ rectangle_1, rectangle_2 }) {
    return (
        rectangle_1.attackBox.position.x + rectangle_1.attackBox.width >= rectangle_2.position.x &&
        rectangle_1.attackBox.position.x <= rectangle_2.position.x + rectangle_2.width &&
        rectangle_1.attackBox.position.y + rectangle_1.attackBox.height >= rectangle_2.position.y &&
        rectangle_1.attackBox.position.y <= rectangle_2.position.y + rectangle_2.height
    )
}

function determineWinner({ player, enemy, timerId }) {
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'
    if (player.health === enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Tie'
    }
    else if (player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
    }
    else if (player.health < enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
    }
}

let timer = 60
let timerId
function timerDecreasing() {
    timerId = setTimeout(timerDecreasing, 1000)
    if (timer > 0) {
        timer--
        document.querySelector('#timer').innerHTML = timer
    }

    if (timer === 0) { 
        determineWinner({ player, enemy })
    }
}