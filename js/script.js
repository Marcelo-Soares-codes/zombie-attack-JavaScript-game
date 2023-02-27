var soldier = document.querySelector(".soldier")
var soldier_id = document.getElementById("standing-soldier")
var soldier_shooting_id = document.getElementById("soldier-shooting")

var zombi_left = document.querySelector(".zombi-left")
var zombi_right = document.querySelector(".zombi-right")
var dying_zombie_left = document.querySelector(".dying-zombie-left")
var dying_zombie_right = document.querySelector(".dying-zombie-right")
var attack_zombie_left = document.querySelector(".attack-zombie-left")
var attack_zombie_right = document.querySelector(".attack-zombie-right")

var shot = document.querySelector(".shot")
var shot_left = document.querySelector(".shot-left")
var shot_right = document.querySelector(".shot-right")

var new_shot = true
var direction = "right"
var score = 0
var speed_left = 10
var speed_right = 10

const startBt = document.querySelector("#start")
const restartBt = document.querySelector("#restart")
const sprites = document.querySelector(".sprites")
const scoreId = document.getElementById("score")

startBt.addEventListener("click", function() {
    sprites.style.display = "flex"
})

restartBt.addEventListener("click", function() {
    zombi_left.style.display = "none"
    zombi_right.style.display = "none"
    attack_zombie_left.style.display = "none"
    attack_zombie_right.style.display = "none"
    score = 0
    speed_left = 10
    speed_right = 10
    scoreId.textContent = "SCORE " + score
    zombi_left.style.animationDuration = speed_left+"s"
    zombi_right.style.animationDuration = speed_right+"s"
    zombi_right.src = "../assets/walking-zombi.webp"
    zombi_left.src = "../assets/walking-zombi.webp"
    setTimeout(function() {
        zombi_left.style.display = "block"
        zombi_right.style.display = "block"
        sprites.style.display = "flex"
    }, 100)
})

const loop = setInterval(() => {
    const soldier_leftPosition = +window.getComputedStyle(soldier).left.replace("px", "")
    const soldier_rightPosition = +window.getComputedStyle(soldier).right.replace("px", "")

    const shot_leftPosition = +window.getComputedStyle(shot).right.replace("px", "")
    const zombi_leftPosition = +window.getComputedStyle(zombi_left).right.replace("px", "")

    const shot_rightPosition = +window.getComputedStyle(shot).left.replace("px", "")
    const zombi_rightPosition = +window.getComputedStyle(zombi_right).left.replace("px", "")
    if (shot_leftPosition >= zombi_leftPosition){
        shot.classList.remove("shot-left")
        zombi_left.style.display = "none"
        dying_zombie_left.style.display = "block"
        dying_zombie_left.style.right = zombi_leftPosition+"px"
        score += 1
        scoreId.textContent = "SCORE " + score
        if (speed_left >= 1){
            speed_left -= 0.5
            zombi_left.style.animationDuration = speed_left+"s"
        }
        if(speed_left <= 5){
            zombi_left.src = "../assets/speed-zombi.webp"
        }
        setTimeout(function() {
            zombi_left.style.display = "block"
        }, 1000)
        
        setTimeout(function() {
            dying_zombie_left.src = ""
            dying_zombie_left.style.display = "none"
            dying_zombie_left.src = "../assets/dying-zombie.webp" 
        }, 2000)
    }
    if (shot_rightPosition >= zombi_rightPosition){
        shot.classList.remove("shot-right")
        zombi_right.style.display = "none"
        dying_zombie_right.style.display = "block"
        dying_zombie_right.style.left = zombi_rightPosition+"px"
        score += 1
        scoreId.textContent = "SCORE " + score
        if (speed_right >= 1){
            speed_right -= 0.5
            zombi_right.style.animationDuration = speed_right+"s"
        }
        if(speed_right <= 5){
            zombi_right.src = "../assets/speed-zombi.webp"
            
        }
        console.log(speed_right)
        setTimeout(function(){
            zombi_right.style.display = "block"
        }, 1000)
        
        setTimeout(function() {
            dying_zombie_right.src = ""
            dying_zombie_right.style.display = "none"
            dying_zombie_right.src = "../assets/dying-zombie.webp" 
        }, 2000)
    }

    if (soldier_leftPosition >= (zombi_leftPosition - 35)){
        zombi_left.style.display = "none"
        attack_zombie_left.style.right = zombi_leftPosition+"px"
        attack_zombie_left.style.display = "block"
        attack_zombie_left.style.animation = "none"
    }
    if (soldier_rightPosition >= (zombi_rightPosition - 30)){
        zombi_right.style.display = "none"
        attack_zombie_right.style.left = zombi_rightPosition+"px"
        attack_zombie_right.style.display = "block"
        attack_zombie_right.style.animation = "none"
    }
}, 10)

document.addEventListener("keydown", function(event) {
    if (event.key == "a" || event.key === "A" || event.key === "ArrowLeft") { 
        soldier.classList.remove("girar-right")
        soldier.classList.add("girar-left")
        direction = "left"
    }

    else if (event.key == "d" || event.key === "D"|| event.key === "ArrowRight") { 
        soldier.classList.remove("girar-left")
        soldier.classList.add("girar-right")
        direction = "right"
    }
    if (event.keyCode === 32 || event.which === 32){
        if (new_shot){
            new_shot = false
            soldier_shooting_id.style.display = "block"
            soldier_id.style.display = "none"
            if (direction == "right"){            
                shot.classList.add("shot-right")
                soldier_shooting_id.style.transform = "scaleX(1)"
                soldier_shooting_id.style.right = "44%"
            }

            else if (direction == "left"){            
                shot.classList.add("shot-left")
                soldier.classList.add("girar-left")
                soldier_shooting_id.style.transform = "scaleX(-1)"
                soldier_shooting_id.style.right = "47%"
            }

            setTimeout(function(){
                soldier_shooting_id.style.display = "none"
                soldier_id.style.display = "block"
                shot.classList.remove("shot-right")
                shot.classList.remove("shot-left")
                new_shot = true
            }, 490);
        }

    }
});

