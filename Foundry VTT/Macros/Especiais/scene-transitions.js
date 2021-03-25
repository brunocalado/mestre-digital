/*

*/

const scenename = '454'; // Scene Name | Nome da Cena
const backgroundImage = 'worlds/cycleofcerberusdw/images/cerberus.webp';
const content = "<p>Domina, se vive;</p><p>Se morre, descansa</p><p>Dos seus na lembrança,</p><p>Na voz do porvir.</p><p>Não cures da vida!</p><p>Sê bravo, sê forte!</p><p>Não fujas da morte,</p><p>Que a morte há de vir!</p>"; // Text | Texto da Cena
const audio = 'worlds/cycleofcerberusdw/sounds/cerberus.ogg'; // Sound | Som

// -------------------------------------------------------
//let scene = game.scenes.entries.find(s => s.data.name === scenename);
let myscene = game.scenes.getName(scenename);

let data = {
	sceneID: myscene.id,
	options:{
		fontColor:'#ffffff',
		fontSize:'18px',
		bgImg: backgroundImage, 
		bgPos:'center center',
		bgSize:'cover',
		bgColor:'#333333',
		bgOpacity:0.7,
    audio: audio,
		delay:5000, //how long for transition to stay up
		skippable:true, //Allows players to skip transition with a click before delay runs out.
		content: content,
	}
}

activeTransition = new Transition(false, data.sceneID, data.options) //
activeTransition.render()// These 2 lines can be omitted if you don't want to personally see the transition.
game.socket.emit('module.scene-transitions', data);


 
 