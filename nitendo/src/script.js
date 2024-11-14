const model = document.querySelector('#h')
const perspective = 400
const unit = 4
let scale = 1
let minScale = .75
let maxScale = 1.25
let x = 0
let y = 0
let isMoving = false
let isDragging = false

const moveModel = () => {
    model.style.transform = `
        perspective(${perspective * unit}vmin)
        rotateX(${y * 20 + 66}deg)
        rotateZ(${-x * 420 + 40}deg)
        translateZ(${-2 * unit}vmin)
        scale3d(${scale}, ${scale}, ${scale})
    `
}

const getCoords = (e) => {
    x = e.pageX / window.innerWidth - 0.5
    y = e.pageY / window.innerHeight - 0.5
}

document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
        getCoords(e)
        isMoving = true
    }
    else if (e.button === 2) { 
        x = e.clientX - model.offsetLeft
        y = e.clientY - model.offsetTop
        isDragging = true
    }
})

document.addEventListener('mousemove', (e) => {
    if (isMoving) {
        getCoords(e)
        moveModel()
    }
    else if(isDragging){
        model.style.left = `${e.clientX - x}px`;
        model.style.top = `${e.clientY - y}px`;
    }
})

document.addEventListener('mouseup', () => {
    isMoving = false
    isDragging = false
})

document.addEventListener('contextmenu', (e) => {
    e.preventDefault()
})

document.addEventListener('wheel', (e) => {
    getCoords(e)
    if (e.deltaY > 0) scale = Math.max(minScale - 0.1, minScale)
    else scale = Math.min(maxScale + 0.1, maxScale)

    moveModel()
})