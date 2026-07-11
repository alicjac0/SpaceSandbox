class CelestialBody {
  constructor(name, type, x, y, vx, vy, mass, color, radius) {
    this.name = name
    this.type = type
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.mass = mass
    this.color = color
    this.radius = radius
    this.trail = []

    if (this.type === 'blackhole') {
      this.variant = Math.floor(Math.random() * 3)
    } else {
      this.variant = 0
    }
  }

  updatePosition(dt) {
    this.x += this.vx * dt
    this.y += this.vy * dt

    this.trail.push({ x: this.x, y: this.y })
    if (this.trail.length > 150) {
      this.trail.shift()
    }
  }

  draw(ctx, showTrail) {
    if (showTrail && this.trail.length > 1) {
      ctx.beginPath()
      ctx.strokeStyle = this.color
      ctx.lineWidth = 1
      ctx.globalAlpha = 0.3
      ctx.moveTo(this.trail[0].x, this.trail[0].y)
      for (let i = 1; i < this.trail.length; i++) {
        ctx.lineTo(this.trail[i].x, this.trail[i].y)
      }
      ctx.stroke()
      ctx.globalAlpha = 1.0
    }
    let img

    if (Array.isArray(textures[this.type])) {
      img = textures[this.type][this.variant]
    } else {
      img = textures[this.type]
    }

    if (img && img.complete && img.naturalWidth !== 0) {
      ctx.drawImage(
        img,
        this.x - this.radius,
        this.y - this.radius,
        this.radius * 2,
        this.radius * 2,
      )
    } else {
      if (this.type === 'star') {
        ctx.shadowBlur = 20
        ctx.shadowColor = this.color
      }
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      ctx.fillStyle = this.color
      ctx.fill()
      ctx.closePath()
      ctx.shadowBlur = 0
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
    ctx.font = '11px monospace'
    ctx.textAlign = 'center'
    ctx.fillText(this.name, this.x, this.y - this.radius - 8)
  }
}

function updateGravity(bodies, dt) {
  const G = 1
  const softening = 15

  for (let i = 0; i < bodies.length; i++) {
    let b1 = bodies[i]

    if (b1.type === 'satellite') continue

    for (let j = 0; j < bodies.length; j++) {
      if (i === j) continue

      let b2 = bodies[j]

      let dx = b1.x - b2.x
      let dy = b1.y - b2.y

      let r = Math.sqrt(dx * dx + dy * dy)

      if (r < 1) r = 1

      let force = (G * b1.mass) / (dx * dx + dy * dy + softening)

      let ax = force * (dx / r)
      let ay = force * (dy / r)

      b2.vx += ax * dt
      b2.vy += ay * dt
    }
  }

  for (let i = 0; i < bodies.length; i++) {
    bodies[i].updatePosition(dt)
  }
}
