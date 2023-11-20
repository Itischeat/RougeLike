
let fil = document.querySelector('.field');


let n = 40, m = 24;
let mas = [];

function init() {
    for (let i = 0; i < m; i++){
	    mas[i] = new Array();
	    for (let j = 0; j < n; j++) {
            if (i === 0 || i === m - 1 || j === 0 || j === n - 1) {
                mas[i][j] = 2
                creatWall(j, i)
            } else if (i % 8 === 0 && j % 10 !== 0 || j % 13 === 0 && i % 4 !== 0) {
                creatWall(j, i)
                
            } else {
                creatFloor(j, i)
                mas[i][j] = 1
            }
        }
    }
}
init()

function createAllObj() {
    cntS = 0
    cntH = 0
    cntE = 0
    for (i = 0; i < mas.length; i++){
        for (j = 0; j < mas[i].length; j++) {
            let rx = getRandomInt().x
            let ry = getRandomInt().y
            if (mas[ry][rx] === 1 && cntS < 2) {
                creatSword(rx, ry)
                cntS++
            } else if (mas[ry][rx] === 1 && cntH < 10) {
                creatPosion(rx, ry)
                cntH++
            } else if (mas[ry][rx] === 1 && cntE < 10)  {
                setEnemy(rx, ry)
                cntE++
            }
        }
    }
    for (i = 0; i < 960; i++) {
        let px = getRandomInt().x
        let py = getRandomInt().y 
        if (mas[py][px] === 1) {
            setHero(px, py)
            return
        }
    }
}
createAllObj()
function creatWall(x, y) {
    let div = document.createElement('div')
    div.className = 'tile tileW'
    div.style.left = 50 * x + 'px'
    div.style.top = 50 * y + 'px'
    fil.append(div)
    mas[y][x] = 2
}

function creatFloor(x, y) {
    let div = document.createElement('div')
    div.className = 'tile'
    div.style.left = 50 * x + 'px'
    div.style.top = 50 * y + 'px'
    fil.append(div)
}

function creatSword(x, y) {
    let div = document.createElement('div')
    div.className = 'tile tileSW'
    div.style.left = 50 * x + 'px'
    div.style.top = 50 * y + 'px'
    fil.append(div)
    mas[y][x] = 3
}
function creatPosion(x, y) {
    let div = document.createElement('div')
    div.className = 'tile tileHP'
    div.style.left = 50 * x + 'px'
    div.style.top = 50 * y + 'px'
    fil.append(div)
    mas[y][x] = 4
}
function getRandomInt() {
    let numRan = Math.floor(Math.random() * 960);
    let y = Math.floor(numRan / 40)
    let x = Math.floor(numRan / 24)
    return {x, y}
}
function setHero(x, y) {
    let div = document.createElement('div')
    div.className = 'tile tileP'
    div.style.left = 50 * x + 'px'
    div.style.top = 50 * y + 'px'
    fil.append(div)
    let health = document.createElement('div')
    health.className = 'health'
    health.style.width = 100 + '%'
    div.append(health)
    mas[y][x] = 5
}

function setEnemy(x, y) {
    let div = document.createElement('div')
    div.className = 'tile health tileE'
    div.style.left = 50 * x + 'px'
    div.style.top = 50 * y + 'px'
    fil.append(div)
    let health = document.createElement('div')
    health.className = 'health'
    health.style.width = 100 + '%'
    div.append(health)
    mas[y][x] = 6
}


const hero = document.querySelector('.tileP')
let enemy = document.querySelectorAll('.tileE')
let Ehealth = document.querySelectorAll('.tile .health')

let e_health = document.querySelectorAll('.tileE .health')

document.addEventListener('keydown', (event) => {
    let hx = hero.style.left = parseInt(hero.style.left) / 50
    let hy = hero.style.top = parseInt(hero.style.top) / 50
    switch (event.code) {
        case "KeyW":
            if (mas[hy - 1][hx] !== 1) {
                return
            }
            mas[hy][hx] = 1
            mas[hy - 1][hx] = 5
            hero.style.top = (hy - 1) * 50 + 'px'
            break;
        case "KeyA":
            if (mas[hy][hx - 1] !== 1) {
                return
            }
            mas[hy][hx] = 1
            mas[hy][hx - 1] = 5
            hero.style.left = (hx - 1) * 50 + 'px'
            break;
        case "KeyS":
            if (mas[hy + 1][hx] !== 1) {
                return
            }
            mas[hy][hx] = 1
            mas[hy + 1][hx] = 5
            hero.style.top = (hy + 1) * 50 + 'px'
            break;
        case "KeyD":
            if (mas[hy][hx + 1] !== 1) {
                return
            }
            mas[hy][hx] = 1
            mas[hy][hx + 1] = 5
            hero.style.left = (hx + 1) * 50 + 'px'
            break;
        case "Space":
            findEnemy(hy, hx)
    }
})



setInterval(() => {
    enemy.forEach((elem) => {
        let ex = parseInt(elem.style.left) / 50
        let ey = parseInt(elem.style.top) / 50
        
        setInterval(() => {
            let direction = Math.floor(Math.random() * 4)
            switch (direction) {
                case 1:
                    mas[ey][ex] = 1
                    if (mas[ey - 1][ex] !== 1) {
                        break;
                    }
                    mas[ey - 1][ex] = 6
                    elem.style.top = (ey - 1) * 50 + 'px'
                    break;
                case 2:
                    mas[ey][ex] = 1
                    if (mas[ey][ex - 1] !== 1) {
                        break;
                    }
                    mas[ey][ex - 1] = 6
                    elem.style.left = (ex - 1) * 50 + 'px'
                    break;
                case 3:
                    mas[ey][ex] = 1
                    if (mas[ey + 1][ex] !== 1) {
                        break;
                    }
                    mas[ey + 1][ex] = 6
                    elem.style.top = (ey + 1) * 50 + 'px'
                    break;
                case 4:
                    mas[ey][ex] = 1
                    if (mas[ey][ex + 1] !== 1) {
                        break;
                    }
                    mas[ey][ex + 1] = 6
                    elem.style.left = (ex + 1) * 50 + 'px'
                    break;
                default:
                    break;
            }
        }, 3000)
    })
}, 3000)


function findEnemy(x, y) {
    let e_aria = (mas[x-1][y-1] === 6 || mas[x-1][y] === 6 || mas[x-1][y+1] === 6 || mas[x][y-1] === 6 || mas[x][y+1] === 6 || mas[x+1][y-1] === 6 || mas[x+1][y] === 6 || mas[x+1][y+1] === 6)
    if (e_aria) {
        console.log('Find!!!')
    } else {
        Ehealth.forEach(e => {
            e.style.width = parseInt(e.style.width) - 50 + '%'
        })
    }
}