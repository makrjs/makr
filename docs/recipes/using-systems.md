# Using systems

```js
import makr from "makr"
import raf from "speedr-raf"

class Body {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.dx = 0
    this.dy = 0
  }
}

class Display {
  constructor(img) {
    this.img = img
  }
}

// Create the entity manager
const em = makr(Body, Display)

function movementSystem(dt) {  
  for (let entity of em.query(Body)) {
    const body = entity.get(Body)
    body.x += body.dx * dt
    body.y += body.dy * dt
  }
}

function renderingSystem() {  
  for (let entity of em.query(Body, Display)) {
    const body = entity.get(Body)
    const {img} = entity.get(Display)
    img.x = body.x
    img.y = body.y
  }
}

// Run each system of every frame
raf.start((dt) => {
  movementSystem(dt)
  renderingSystem()
})
```
