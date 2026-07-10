const bodies = ['star', 'planet', 'satellite', 'blackhole']

const textures = {
  satellite: new Image(),
  blackhole: new Image(),
}

textures.satellite.src = 'images/satellite.png'
textures.blackhole.src = 'images/blackhole.png'

function bodyConfiguration(input) {
  const chosenBody = input.value

  bodies.forEach((bodyID) => {
    const element = document.getElementById(bodyID)
    if (bodyID === chosenBody) {
      element.classList.add('active')
      element.classList.remove('unactive')
    } else {
      element.classList.remove('active')
      element.classList.add('unactive')
    }
  })
}

function values() {
  planetmass = Number(document.getElementById('planet__mass').value)
  starmass = Number(document.getElementById('star__mass').value)
  blackholemass = Number(document.getElementById('blackhole__mass').value)
  timespeed = Number(document.getElementById('time__speed').value)

  document.getElementById('planet__value').innerText = planetmass + ' CU'
  document.getElementById('star__value').innerText = starmass + ' CU'
  document.getElementById('blackhole__value').innerText = blackholemass + ' CU'
  document.getElementById('time__value').innerText = timespeed + 'x'
}

values()

const canvas = document.getElementById('space-canvas')
const ctx = canvas.getContext('2d')

let universe = []
let isPaused = false

let mouse = {
  isDrawing: false,
  startX: 0,
  startY: 0,
  currentX: 0,
  currentY: 0,
}

function resizeCanvas() {
  canvas.width = canvas.clientWidth
  canvas.height = canvas.clientHeight
}

window.addEventListener('resize', resizeCanvas)
resizeCanvas()

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const showGrid = document.getElementById('chk__grid').checked
  const showTrails = document.getElementById('chk__trails').checked
  const showVectors = document.getElementById('chk__vectors').checked
  const timeSpeed = parseFloat(document.getElementById('time__speed').value)

  const dt = 0.01 * timeSpeed

  if (showGrid) {
    drawEngineeringGrid()
  }

  if (!isPaused) {
    updateGravity(universe, dt)
  }

  for (let body of universe) {
    body.draw(ctx, showTrails)

    if (showVectors) {
      drawVector(body)
    }
  }

  if (mouse.isDrawing) {
    drawSlingShot()
  }

  requestAnimationFrame(gameLoop)
}
requestAnimationFrame(gameLoop)

canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect()
  mouse.startX = e.clientX - rect.left
  mouse.startY = e.clientY - rect.top
  mouse.currentX = mouse.startX
  mouse.currentY = mouse.startY
  mouse.isDrawing = true
})

canvas.addEventListener('mousemove', (e) => {
  if (!mouse.isDrawing) return
  const rect = canvas.getBoundingClientRect()
  mouse.currentX = e.clientX - rect.left
  mouse.currentY = e.clientY - rect.top
})

canvas.addEventListener('mouseup', (e) => {
  if (!mouse.isDrawing) return
  mouse.isDrawing = false

  const vx = (mouse.startX - mouse.currentX) * 0.05
  const vy = (mouse.startY - mouse.currentY) * 0.05

  const activeRadio = document.querySelector('input[name="object-type"]:checked')
  const type = activeRadio ? activeRadio.value : 'planet'

  let name = ''
  let mass = 0
  let color = '#ffffff'
  let radius = 10

  let finalVx = vx
  let finalVy = vy

  if (type === 'satellite') {
    name = document.getElementById('satellite__name').value || 'Satelita'
    mass = 0
    color = '#a0aec0'
    radius = 10

    let closestPlanet = null
    let minDistance = 150

    for (let body of universe) {
      if (body.type === 'planet') {
        let dx = mouse.startX - body.x
        let dy = mouse.startY - body.y
        let distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < minDistance) {
          minDistance = distance
          closestPlanet = body
        }
      }
    }

    if (closestPlanet) {
      finalVx += closestPlanet.vx
      finalVy += closestPlanet.vy

      if (vx === 0 && vy === 0) {
        const G = 1
        let r = minDistance

        if (r < 5) r = 5

        let orbitalSpeed = Math.sqrt((G * closestPlanet.mass) / r)

        let dx = mouse.startX - closestPlanet.x
        let dy = mouse.startY - closestPlanet.y

        finalVx = closestPlanet.vx - (dy / r) * orbitalSpeed
        finalVy = closestPlanet.vy + (dx / r) * orbitalSpeed
      }
    }
  } else {
    name = document.getElementById(`${type}__name`).value || `New ${type}`
    mass = parseFloat(document.getElementById(`${type}__mass`).value)
    color = document.getElementById(`${type}__color`).value

    if (type === 'star') radius = starmass / 500
    if (type === 'planet') radius = planetmass / 10
    if (type === 'blackhole') radius = 25
  }

  const newBody = new CelestialBody(
    name,
    type,
    mouse.startX,
    mouse.startY,
    finalVx,
    finalVy,
    mass,
    color,
    radius,
  )
  universe.push(newBody)

  updateUIObjectsList()
})

function drawSlingShot() {
  ctx.beginPath()
  ctx.strokeStyle = '#00f2fe'
  ctx.lineWidth = 2
  ctx.moveTo(mouse.startX, mouse.startY)
  ctx.lineTo(mouse.currentX, mouse.currentY)
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(mouse.startX, mouse.startY, 4, 0, Math.PI * 2)
  ctx.fillStyle = '#00f2fe'
  ctx.fill()
}

function drawEngineeringGrid() {
  ctx.strokeStyle = '#383838'
  ctx.lineWidth = 0.5
  const gridSize = 50

  for (let x = 0; x < canvas.width; x += gridSize) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, canvas.height)
    ctx.stroke()
  }
  for (let y = 0; y < canvas.height; y += gridSize) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(canvas.width, y)
    ctx.stroke()
  }
}

function drawVector(body) {
  ctx.beginPath()
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
  ctx.lineWidth = 1.5
  ctx.moveTo(body.x, body.y)
  ctx.lineTo(body.x + body.vx * 10, body.y + body.vy * 10)
  ctx.stroke()
}

document.getElementById('button__reset').addEventListener('click', () => {
  universe = []
  updateUIObjectsList()
})

document.getElementById('button__start').addEventListener('click', function () {
  isPaused = !isPaused
  this.innerText = isPaused ? '▶ Start' : '⏸ Pause'
})

function updateUIObjectsList() {
  const listContainer = document.getElementById('objects__list')
  if (!listContainer) return

  listContainer.innerHTML = ''

  if (universe.length === 0) {
    listContainer.innerHTML =
      '<p class="hint" style="padding:5px;">No objects in orbit.</p>'
    return
  }

  universe.forEach((body, index) => {
    const item = document.createElement('div')
    item.style.display = 'flex'
    item.style.alignItems = 'center'
    item.style.justifyContent = 'space-between'
    item.style.background = 'rgba(255, 255, 255, 0.05)'
    item.style.padding = '6px 10px'
    item.style.marginBottom = '5px'
    item.style.borderRadius = '4px'
    item.style.borderLeft = `3px solid ${body.color}`

    item.innerHTML = `
            <div>
                <strong style="color: #fff; font-size: 13px;">${body.name}</strong>
                <span style="color: #64748b; font-size: 11px; text-transform: uppercase;">(${body.type})</span>
            </div>
            <button onclick="removeCelestialBody(${index})" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 14px;">✕</button>
        `

    listContainer.appendChild(item)
  })
}

window.removeCelestialBody = function (index) {
  universe.splice(index, 1)
  updateUIObjectsList()
}
