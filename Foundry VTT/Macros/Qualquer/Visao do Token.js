let applyChanges = false;
new Dialog({
  title: `Configura Visão do Token`,
  content: `
    <form>
      <div class="form-group">
        <label>Tipo de Visão:</label>
        <select id="vision-type" name="vision-type">
          <option value="nochange">Sem mudança</option>
          <option value="dim0">Própria</option>
          <option value="dim9">Visão de Penumbra (9m)</option>
          <option value="dim18">Visão de Penumbra (18m)</option>
          <option value="dim27">Visão de Penumbra (27m)</option>
          <option value="bright9">Visão no Escuro (9m)</option>
          <option value="bright18">Visão no Escuro (18m)</option>
          <option value="bright27">Visão no Escuro(27m)</option>
          <option value="bright36">Visão no Escuro (Magia)(36m)(</option>
        </select>
      </div>
      <div class="form-group">
        <label>Fonte de Luz:</label>
        <select id="light-source" name="light-source">
          <option value="nochange">Sem mudança</option>
          <option value="none">Nenhum</option>
          <option value="candle">Vela</option>
          <option value="lamp">Lâmpada</option>
          <option value="bullseye">Lanterna (Bullseye)</option>
          <option value="hooded-dim">Lanterna (Coberta - Difusa)</option>
          <option value="hooded-bright">Lanterna (Coberta - Brilhante)</option>
          <option value="light">Luz (Truque)</option>
          <option value="torch">Tocha</option>
        </select>
      </div>
    </form>
    `,
  buttons: {
    yes: {
      icon: "<i class='fas fa-check'></i>",
      label: `Apply Changes`,
      callback: () => applyChanges = true
    },
    no: {
      icon: "<i class='fas fa-times'></i>",
      label: `Cancel Changes`
    },
  },
  default: "yes",
  close: html => {
    if (applyChanges) {
      for ( let token of canvas.tokens.controlled ) {
        let visionType = html.find('[name="vision-type"]')[0].value || "none";
        let lightSource = html.find('[name="light-source"]')[0].value || "none";
        let dimSight = 0;
        let brightSight = 0;
        let dimLight = 0;
        let brightLight = 0;
        let lightAngle = 360;
        let lockRotation = token.data.lockRotation;
        // Get Vision Type Values
        switch (visionType) {
          case "dim0":
            dimSight = 0;
            brightSight = 0;
            break;
          case "dim9":
            dimSight = 9;
            brightSight = 0;
            break;
          case "dim18":
            dimSight = 18;
            brightSight = 0;
            break;
          case "dim27":
            dimSight = 27;
            brightSight = 0;
            break;
          case "bright9":
            dimSight = 0;
            brightSight = 9;
            break;
          case "bright18":
            dimSight = 0;
            brightSight = 18;
            break;
          case "bright27":
            dimSight = 0;
            brightSight = 27;
            break;
          case "bright36":
            dimSight = 0;
            brightSight= 36;
            break;
          case "nochange":
          default:
            dimSight = token.data.dimSight;
            brightSight = token.data.brightSight;
        }
        // Get Light Source Values
        switch (lightSource) {
          case "none":
            dimLight = 0;
            brightLight = 0;
            break;
          case "candle":
            dimLight = 2;
            brightLight = 1.5;
            break;
          case "lamp":
            dimLight = 13;
            brightLight = 5;
            break;
          case "bullseye":
            dimLight = 36;
            brightLight = 18;
            lockRotation = false;
            lightAngle = 52.5;
            break;
          case "hooded-dim":
            dimLight = 1.5;
            brightLight = 0;
            break;
          case "hooded-bright":
            dimLight = 18;
            brightLight = 9;
            break;
          case "light":
            dimLight = 12;
            brightLight = 6;
            break;
          case "torch":
            dimLight = 12;
            brightLight = 6;
            break;
          case "nochange":
          default:
            dimLight = token.data.dimLight;
            brightLight = token.data.brightLight;
            lightAngle = token.data.lightAngle;
            lockRotation = token.data.lockRotation;
        }
        // Update Token
        console.log(token);
        token.update({
          vision: true,
          dimSight: dimSight,
          brightSight: brightSight,
          dimLight: dimLight,
          brightLight:  brightLight,
          lightAngle: lightAngle,
          lockRotation: lockRotation
        });
      }
    }
  }
}).render(true);