let crosshairsConfig = {
            size: 3,
            icon: "icons/magic/lightning/bolt-strike-blue.webp",
            label: 'test',
            tag: 'test-crosshairs',
            drawIcon: true,
            drawOutline: true,
            interval: 1
        }
let template = await warpgate.crosshairs.show(crosshairsConfig, { show: checkCrosshairs });
const targetsInCrosshairs = warpgate.crosshairs.collect(template, ['Token'], getContainedCustom)['Token'];
        for await (let target of targetsInCrosshairs) {
            let markerApplied = Sequencer.EffectManager.getEffects({ name: `ase-crosshairs-marker-${target.id}` });
            if (markerApplied.length > 0) {
                Sequencer.EffectManager.endEffects({ name: `ase-crosshairs-marker-${target.id}` });
            }
        }
async function checkCrosshairs(crosshairs) {
    //console.log(crosshairs);
    let collected;
    while (crosshairs.inFlight) {
        //wait for initial render
        await warpgate.wait(100);
        collected = warpgate.crosshairs.collect(crosshairs, ['Token'], getContainedCustom)['Token'];
        let tokensOutOfRange = canvas.tokens.placeables.filter(token => {
            return !collected.find(t => t.id === token.id);
        });
        crosshairs.label = `${collected.length} targets`;
        for await (let tokenD of collected) {
            let token = canvas.tokens.get(tokenD.id);
            //console.log(token);
            let markerEffect = 'jb2a.ui.indicator.red.01.01';
            let markerApplied = Sequencer.EffectManager.getEffects({ name: `ase-crosshairs-marker-${token.id}` });
            if (markerApplied.length == 0) {
                new Sequence()
                    .effect()
                    .file(markerEffect)
                    .atLocation(token)
                    .scale(0.5)
                    .offset({ y: 100 })
                    .mirrorY()
                    .persist()
                    .name(`ase-crosshairs-marker-${token.id}`)
                    .play();
            }
        }
        for await (let token of tokensOutOfRange) {
            let markerApplied = Sequencer.EffectManager.getEffects({ name: `ase-crosshairs-marker-${token.id}` });
            if (markerApplied.length > 0) {
                Sequencer.EffectManager.endEffects({ name: `ase-crosshairs-marker-${token.id}` });
            }
        }
    }
}

function getContainedCustom(tokenD, crosshairs) {
    let tokenCenter = getCenter(tokenD.data, tokenD.data.width);
    let tokenCrosshairsDist = canvas.grid.measureDistance(tokenCenter, crosshairs);
    let crosshairsDistance = crosshairs.data?.distance ?? crosshairs.distance;
    let distanceRequired = (crosshairsDistance - 2.5) + (2.5 * tokenD.data.width);
    if ((tokenCrosshairsDist) < distanceRequired) {
        return true;
    }
    else {
        return false;
    }
}

function getCenter(pos, width = 1) {
    return ({ x: pos.x + ((canvas.grid.size / 2) * width), y: pos.y + ((canvas.grid.size / 2) * width) });
}