<template>
  <canvas id="bg-canvas"></canvas>
</template>

<script>
export default {
  mounted () {
    animation()
  }
}

class Circle {
    constructor(width, height) {
        let v = Math.random()
        this.v = v < 0.3 ? 0.3 : v
        this.d = Math.random() * Math.PI * 2
        this.x = Math.floor(Math.random() * width)
        this.y = Math.floor(Math.random() * height)
        this.r = Math.floor((1 - this.v) * 25)
        this.color = 'rgba(' +
            Math.floor(Math.random() * 255) + ',' +
            Math.floor(Math.random() * 255) + ',' +
            Math.floor(Math.random() * 255) + ',' +
            '0.8'
            ')'
    }
}

function animation() {
    let canvas = document.getElementById('bg-canvas')
    let ctx = canvas.getContext('2d')
    if (!ctx) {
        console.log('你的浏览器不支持canvas')
        return
    }

    //解决锯齿问题
    function smooth() {
        let width = canvas.clientWidth, height = canvas.clientHeight
        if (window.devicePixelRatio) {
            canvas.style.width = width + "px"
            canvas.style.height = height + "px"
            canvas.height = height * window.devicePixelRatio
            canvas.width = width * window.devicePixelRatio
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
        }
    }
    smooth()

    let circles = []
    let maxCount = 8
    for (let i = 0; i < maxCount; i++) {
        circles.push(new Circle(canvas.clientWidth, canvas.clientHeight))
    }

    function inBox(c) {
        let s = 25, w = canvas.clientWidth, h = canvas.clientHeight
        if (c.x > -s && c.x < w + s && c.y > -s && c.y < h + s) {
            return true
        }
        return false
    }

    function render() {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)

        circles.map((c, i) => {
            if (!inBox(c)) {
                circles[i] = new Circle(canvas.clientWidth, canvas.clientHeight)
            }
        })

        circles.map((c, i) => {
            ctx.beginPath() // 每次单独绘制一个图形时必须得有这个
            ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2, true)
            c.x += c.v * Math.sin(c.d)
            c.y -= c.v * Math.cos(c.d)
            ctx.fillStyle = c.color
            ctx.fill()
            for (let j = i + 1; j < circles.length; j++) {
                ctx.beginPath()
                ctx.moveTo(c.x, c.y)
                ctx.lineTo(circles[j].x, circles[j].y)
                ctx.lineWidth = 2
                ctx.strokeStyle = '#fff'
                ctx.stroke()
            }
        })

        window.requestAnimationFrame(render)
    }

    render()

    window.addEventListener('resize', e => {
        canvas.style.width = document.body.clientWidth + 'px'
        canvas.style.height = document.body.clientHeight + 'px'
        smooth()
    })
}

</script>

<style scoped>
  #bg-canvas {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
  }
</style>
