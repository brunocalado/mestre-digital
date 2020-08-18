let applyChanges = false
new Dialog({
  title: `Criador de modelos de área`,
  content: `
    <style>
      #pf2-template-creator header {
        border-radius: 0;
        background: linear-gradient(90deg, var(--secondary) 0%, #202b93 50%, var(--secondary) 100%);
        border: none;
        box-shadow: inset 0 0 0 1px #9f725b,inset 0 0 0 2px var(--tertiary),inset 0 0 0 3px #956d58;
        margin-bottom: 2px;
        font-size: .75rem;
      }
      #pf2-template-creator .window-content {
        background-image: url(systems/pf2e/assets/sheet/red_bg.jpg);
        color: #ffefbd;
        padding: 9px;
        border-width: 9px;
        border-image: url(systems/pf2e/assets/sheet/corner-box.png) 9 repeat;
      }
      #pf2-template-creator form {
        margin-bottom: 20px;
      }
      #pf2-template-creator .form-fields.buttons {
        justify-content: flex-start !important;
      }
      #pf2-template-creator .button {
        flex: 1 !important;
        border-width: 9px;
        border-image: url(systems/pf2e/assets/sheet/corner-box.png) 9 repeat;
        font-size: 12px;
        padding: 0;
        background: #171f69;
        color: #ffefbd;
        cursor: pointer;
      }
      #pf2-template-creator .button:hover {
        box-shadow: 0 0 8px white;
      }
      #pf2-template-creator .radios input[type="radio"] {
        opacity: 0;
        position: fixed;
        width: 0;
      }
      #pf2-template-creator .radios label {
        cursor: pointer;
        display: flex;
        flex: 1 !important;
        margin: -2px 0;
        background: rgba(0, 0, 0, 0.1);
        border: 2px groove #f0f0e0;
        width: 100%;
        border-radius: 3px;
        font-size: 13px;
        font-family: "Signika", sans-serif;
        justify-content: center;
        align-items: center;
        background: #171f69;
        color: #ffefbd;
        border-width: 9px;
        border-image: url(systems/pf2e/assets/sheet/corner-box.png) 9 repeat;
      }
      #pf2-template-creator .radios label i {
        margin-right: 5px;
        color: #ffefbd;
        background: #171f69;
      }
      #pf2-template-creator .radios label:hover {
        box-shadow: 0 0 8px white;
      }
      #pf2-template-creator .radios input[type="radio"]:checked + label {
        background: rgba(0, 0, 0, 0.2);
      }
      #pf2-template-creator .dialog-button {
        height: 50px;
        background: #171f69;
        border-image: url(systems/pf2e/assets/sheet/corner-box.png) 9 repeat;
        color: #ffefbd;
        border-width: 9px;
        display: inline-flex;
        justify-content: space-evenly;
        align-items: center;
        cursor: pointer;
      }
      #pf2-template-creator .notes {
        color: #ffefbd !important;
        flex: 0 0 100% !important;
        font-size: 12px !important;
        line-height: 16px !important;
        margin: 10px 0 5px 0 !important;
      }
      #pf2-template-creator .notes.title {
        border-bottom: 1px solid #f7d488;
        font-size: 14px !important;
        font-weight: bold;
        margin: 20px 0 10px 0 !important;
      }
    </style>
    <form>
      <div class="form-group">
        <p class="notes title">Tipo de zona:</p>
        <div class="form-fields buttons radios">
          <input type="radio" name="shape" id="emanation" value="emanation" checked>
          <label for="emanation" onclick="toggleEmanationMessage(true)"><i class="fas fa-square"></i> Emanação</label>
          <input type="radio" name="shape" id="burst" value="burst">
          <label for="burst" onclick="toggleEmanationMessage(false)"><i class="fas fa-dot-circle"></i> Explosão</label>
          <input type="radio" name="shape" id="cone" value="cone">
          <label for="cone" onclick="toggleEmanationMessage(false)"><i class="fas fa-wifi"></i> Cone</label>
          <input type="radio" name="shape" id="line" value="line">
          <label for="line" onclick="toggleEmanationMessage(false)"><i class="fas fa-ruler-horizontal"></i> Linha</label>
        </div>
      </div>

      <div class="notes" id="emanation-message">
        ${token ? `
          ➡️ O modelo de Emanação será automaticamente colocado no token selecionado: ${token.data.name}.<br>
          ${game["token-mold"] ? `➡️ O modelo será movido com o token selecionado.` : `⚠️ Para que o modelo se mova com o token selecionado, instale e ative o módulo "TokenMold".`}
        ` : `
          ➡️ Para colocar automaticamente o modelo de Emanação em um token, execute esta macro com um token selecionado.
        ` }
      </div>

      <div class="form-group">
        <p class="notes title">Valores predefinidos:</p>
        <div class="form-fields buttons">
          <button type="button" class="button" onclick="updateRadiusValue(1.5)">1.5 m</button>
          <button type="button" class="button" onclick="updateRadiusValue(3)">3 m</button>
          <button type="button" class="button" onclick="updateRadiusValue(4.5)">4.5 m</button>
          <button type="button" class="button" onclick="updateRadiusValue(6)">6 m</button>
          <button type="button" class="button" onclick="updateRadiusValue(9)">9 m</button>
          <button type="button" class="button" onclick="updateRadiusValue(18)">18 m</button>
          <button type="button" class="button" onclick="updateRadiusValue(36)">36 m</button>
        </div>
      </div>

      <div class="form-group">
      <p class="notes title">Raio do modelo em metros:</p>
      <div class="form-fields">
        <input type="range" id="radius" name="radius" value="1.5" min="1.5" max="36" step="0.5" oninput="updateRangeValue(this.value);">
        <span id="range-value" class="range-value">1.5</span>
      </div>
      </div>
    </form>
    <script>
      function toggleEmanationMessage (isVisible) {
        document.getElementById("emanation-message").style.display = isVisible ? "block" : "none"
      }
      function updateRadiusValue(val) {
        document.getElementById("radius").value = val
        updateRangeValue(val)
      }
      function updateRangeValue(val) {
        document.getElementById("range-value").innerHTML = val
      }
    </script>
  `,
  buttons: {
    no: {
      icon: "<i class='fas fa-times'></i>",
      label: `Cancelar`
    },
    yes: {
      icon: "<i class='fas fa-check'></i>",
      label: `Aplicar`,
      callback: () => applyChanges = true
    }
  },
  default: "yes",
  close: html => {
    if (applyChanges) {

      // Template settings
      const templateData = {
        user: game.user._id,
        distance: parseFloat(html.find('[name="radius"]')[0].value),
        direction: 0,
        x: 0,
        y: 0,
        fillColor: game.user.color
      }

      let templateShape = html.find('[name="shape"]')
      for (var i = 0, length = templateShape.length; i < length; i++) {
        if (templateShape[i].checked) {
          templateShape = templateShape[i].value
          break
        }
      }

      switch (templateShape) {
        case "cone":
          templateData.t = "cone"
          templateData.angle = 90
          break
        case "emanation":
          templateData.t = "circle"
          break
        case "line":
          templateData.t = "ray"
          templateData.width = 1.5
          break
        case "burst":
          templateData.t = "circle"
          break
        default:
          break
      }

      const measuredTemplate = new MeasuredTemplate(templateData)

      // If emanation shape then place template on token if token is selected
      if (token && templateShape === "emanation") {
        const shapeCenter = canvas.grid.getCenter(token.x, token.y)
        measuredTemplate.data.x = shapeCenter[0]
        measuredTemplate.data.y = shapeCenter[1]

        const template = canvas.scene.createEmbeddedEntity("MeasuredTemplate", measuredTemplate.data).then(template => {
          // If tokenmold is installed and activated, stick the template to the token
          if (game["token-mold"]) {
            let templateIds = duplicate(getProperty(token, "data.flags.token-mold.sticky-templates.templateIds") || [])
            if (!templateIds.includes(template._id)) templateIds.push(template._id)
            token.update({ "flags.token-mold.sticky-templates.templateIds": templateIds })
          }
        })
      } else {
        // Else prepare layer for preview
        const highlighterName = 'Preview.' + Math.random().toString(36).substr(2, 9)
        const highlighter = canvas.grid.addHighlightLayer(highlighterName)
        const initialLayer = canvas.activeLayer
        measuredTemplate.draw()
        measuredTemplate.layer.activate()
        measuredTemplate.layer.preview.addChild(measuredTemplate)

        // Calculate the shape position
        function getTemplatePosition(event) {
          const center = event.data.getLocalPosition(measuredTemplate.layer)

          if (templateShape === "emanation" || templateShape === "line") {
            const shapeCenter = canvas.grid.getCenter(center.x, center.y)
            return { x: shapeCenter[0], y: shapeCenter[1] }
          } else if (templateShape === "burst") {
            return canvas.grid.getSnappedPosition(center.x, center.y, 1)
          } else if (templateShape === "cone") {
            let shift = 0
            const shapePosition = canvas.grid.getSnappedPosition(center.x, center.y, 2)
            const centerPosition = canvas.grid.getCenter(shapePosition.x, shapePosition.y)
            if (shapePosition.x === centerPosition[0] && shapePosition.y === centerPosition[1]) {
              shapePosition.x += canvas.dimensions.size / 2
            }
            return shapePosition
          } else {
            return canvas.grid.getSnappedPosition(center.x, center.y, 2)
          }
        }

        /*
        ----------- THX TO PF2 SYSTEM CREATOR FOR THIS CODE. --------------
        */

        // Calculate the highlight
        function highlightGrid() {
          const grid = canvas.grid,
            d = canvas.dimensions,
            bc = "0x000000",
            fc = measuredTemplate.data.fillColor.replace('#', '0x')

          // Clear existing highlight
          canvas.grid.clearHighlightLayer(highlighterName)
          if (["circle", "cone"].includes(measuredTemplate.data.t)) {
            // Get number of rows and columns
            let nr = Math.ceil(((measuredTemplate.data.distance * 1.5) / d.distance) / (d.size / grid.h)),
              nc = Math.ceil(((measuredTemplate.data.distance * 1.5) / d.distance) / (d.size / grid.w))

            // Get the center of the grid position occupied by the template
            let x = measuredTemplate.data.x,
              y = measuredTemplate.data.y

            let [cx, cy] = grid.getCenter(x, y),
              [col0, row0] = grid.grid.getGridPositionFromPixels(cx, cy),
              minAngle = (360 + ((measuredTemplate.data.direction - measuredTemplate.data.angle * 0.5) % 360)) % 360,
              maxAngle = (360 + ((measuredTemplate.data.direction + measuredTemplate.data.angle * 0.5) % 360)) % 360

            const within_angle = function (min, max, value) {
              min = (360 + min % 360) % 360
              max = (360 + max % 360) % 360
              value = (360 + value % 360) % 360

              if (min < max) return (value >= min && value <= max)
              return (value >= min || value <= max)
            }

            const measureDistance = function (p0, p1) {
              let gs = canvas.dimensions.size,
                ray = new Ray(p0, p1),
                // How many squares do we travel across to get there? If 2.3, we should count that as 3 instead of 2; hence, Math.ceil
                nx = Math.ceil(Math.abs(ray.dx / gs)),
                ny = Math.ceil(Math.abs(ray.dy / gs))

              // Get the number of straight and diagonal moves
              let nDiagonal = Math.min(nx, ny),
                nStraight = Math.abs(ny - nx)

              // Diagonals in PF pretty much count as 1.5 times a straight
              let distance = Math.floor(nDiagonal * 1.5 + nStraight)
              let distanceOnGrid = distance * canvas.dimensions.distance
              return distanceOnGrid
            }

            const degtorad = function (degrees) {
              return degrees * Math.PI / 180
            }

            let originOffset = { x: 0, y: 0 }
            // Offset measurement for cones
            // Offset is to ensure that cones only start measuring from cell borders, as in https://www.d20pfsrd.com/magic/#Aiming_a_Spell
            if (measuredTemplate.data.t === "cone") {
              // Degrees anticlockwise from pointing right. In 45-degree increments from 0 to 360
              const dir = (measuredTemplate.data.direction >= 0 ? 360 - measuredTemplate.data.direction : -measuredTemplate.data.direction) % 360
              // If we're not on a border for X, offset by 0.5 or -0.5 to the border of the cell in the direction we're looking on X axis
              let xOffset = measuredTemplate.data.x % d.size != 0 ?
                Math.sign(1 * (Math.round(Math.cos(degtorad(dir)) * 100)) / 100) / 2 // /2 turns from 1/0/-1 to 0.5/0/-0.5
                : 0
              // Same for Y, but cos Y goes down on screens, we invert
              let yOffset = measuredTemplate.data.y % d.size != 0 ?
                -Math.sign(1 * (Math.round(Math.sin(degtorad(dir)) * 100)) / 100) / 2
                : 0
              originOffset.x = xOffset
              originOffset.y = yOffset
            }

            // Point we are measuring distances from
            let origin = {
              x: measuredTemplate.data.x + (originOffset.x * d.size),
              y: measuredTemplate.data.y + (originOffset.y * d.size)
            }

            for (let a = -nc; a < nc; a++) {
              for (let b = -nr; b < nr; b++) {
                // Position of cell's top-left corner, in pixels
                let [gx, gy] = canvas.grid.grid.getPixelsFromGridPosition(col0 + a, row0 + b)
                // Position of cell's center, in pixels
                let [cellCenterX, cellCenterY] = [gx + d.size * 0.5, gy + d.size * 0.5]

                // Determine point of origin
                let origin = { x: measuredTemplate.data.x, y: measuredTemplate.data.y }
                origin.x += (originOffset.x * d.size)
                origin.y += (originOffset.y * d.size)

                let ray = new Ray(origin, { x: cellCenterX, y: cellCenterY })

                let rayAngle = (360 + (ray.angle / (Math.PI / 180)) % 360) % 360
                if (measuredTemplate.data.t === "cone" && ray.distance > 0 && !within_angle(minAngle, maxAngle, rayAngle)) {
                  continue
                }

                // Determine point we're measuring the distance to - always in the center of a grid square
                let destination = { x: cellCenterX, y: cellCenterY }

                let distance = measureDistance(destination, origin)
                if (distance <= measuredTemplate.data.distance) {
                  grid.grid.highlightGridPosition(highlighter, { x: gx, y: gy, color: fc, border: bc })
                }
              }
            }
          } else {
            /*
            ----------- THX TO FOUNDRY CREATOR FOR THIS CODE FROM CORE FOUNDRY. --------------
            */
            // Get number of rows and columns
            const nr = Math.ceil(((measuredTemplate.data.distance * 1.5) / d.distance) / (d.size / grid.h));
            const nc = Math.ceil(((measuredTemplate.data.distance * 1.5) / d.distance) / (d.size / grid.w));
            // Get the offset of the template origin relative to the top-left grid space
            const [tx, ty] = canvas.grid.getTopLeft(measuredTemplate.data.x, measuredTemplate.data.y);
            const [row0, col0] = grid.grid.getGridPositionFromPixels(tx, ty);
            const hx = canvas.grid.w / 2;
            const hy = canvas.grid.h / 2;
            const isCenter = (measuredTemplate.data.x - tx === hx) && (measuredTemplate.data.y - ty === hy);
            // Identify grid coordinates covered by the template Graphics
            for (let r = -nr; r < nr; r++) {
              for (let c = -nc; c < nc; c++) {
                let [gx, gy] = canvas.grid.grid.getPixelsFromGridPosition(row0 + r, col0 + c);
                const testX = (gx + hx) - measuredTemplate.data.x;
                const testY = (gy + hy) - measuredTemplate.data.y;
                let contains = ((r === 0) && (c === 0) && isCenter) || measuredTemplate.shape.contains(testX, testY);
                if (!contains) continue;
                grid.grid.highlightGridPosition(highlighter, { x: gx, y: gy, color: fc, border: bc });
              }
            }
          }
        }

        /*
        ----------- THX TO FOUNDRY CREATOR FOR THIS CODE FROM DND 5. --------------
        */

        // Preview handlers
        const handlers = {}
        let moveTime = 0

        // Update placement (mouse-move)
        handlers.mm = event => {
          event.stopPropagation()
          let now = Date.now() // Apply a 20ms throttle
          if (now - moveTime <= 20) return
          const snapped = getTemplatePosition(event)
          measuredTemplate.data.x = snapped.x
          measuredTemplate.data.y = snapped.y
          measuredTemplate.refresh()
          highlightGrid()
          moveTime = now
        }

        // Cancel the workflow (right-click)
        handlers.rc = event => {
          canvas.grid.destroyHighlightLayer(highlighterName)
          measuredTemplate.layer.preview.removeChildren()
          canvas.stage.off("mousemove", handlers.mm)
          canvas.stage.off("mousedown", handlers.lc)
          canvas.app.view.oncontextmenu = null
          canvas.app.view.onwheel = null
          initialLayer.activate()
        }

        // Confirm the workflow (left-click)
        handlers.lc = event => {
          handlers.rc(event)

          const destination = getTemplatePosition(event)
          measuredTemplate.data.x = destination.x
          measuredTemplate.data.y = destination.y

          canvas.scene.createEmbeddedEntity("MeasuredTemplate", measuredTemplate.data)
        }

        // Rotate the template by 3 degree increments (mouse-wheel)
        handlers.mw = event => {
          if (event.ctrlKey) event.preventDefault()
          event.stopPropagation()
          let delta = canvas.grid.type > CONST.GRID_TYPES.SQUARE ? 30 : 15
          let snap = event.shiftKey ? delta : 5
          measuredTemplate.data.direction += (snap * Math.sign(event.deltaY))
          measuredTemplate.refresh()
          highlightGrid()
        }

        // Activate listeners
        canvas.stage.on("mousemove", handlers.mm)
        canvas.stage.on("mousedown", handlers.lc)
        canvas.app.view.oncontextmenu = handlers.rc
        canvas.app.view.onwheel = handlers.mw
      }
    }
  }
}, {
  id: 'pf2-template-creator'
}).render(true)