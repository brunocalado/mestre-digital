(async () =>{
	// Macro desenvolvido por BrunoCF086#7267. O macro opera os efeitos da Condição Confuso no sistema Tormenta20;
	const rollMode = game.settings.get("core", "rollMode");
	let d6 = new Roll(`1d6`).roll();
	let action = d6.total;
	let rolls = [d6];
	
  function tabela() {

		if (action == 1) {
			return tabela2()
		} //"Movimenta-se em uma direção escolhida por uma rolagem de 1d8"
		else if (action == 2 || action == 3) return "Não pode fazer ações, exceto reações, e fica balbuciando incoerentemente";
		else if (action == 4 || action == 5) return "Usa a arma que estiver empunhando para atacar a criatura mais próxima, ou a si mesmo se estiver sozinho (apenas role o dano)";
		else if (action == 6) return "A condição termina e pode agir normalmente";
	}
	function tabela2() {
		let d8 = new Roll(`1d8`).roll();
		let direction = d8.total;
		rolls.push(d8);
		if (direction == 1) return "Movimenta-se para cima";
		else if (direction == 2) return "Movimenta-se para o canto superior-direito";
		else if (direction == 3) return "Movimenta-se para direita";
		else if (direction == 4) return "Movimenta-se para o canto inferior-direito";
		else if (direction == 5) return "Movimenta-se para baixo";
		else if (direction == 6) return "Movimenta-se para o canto inferior-esquerdo";
		else if (direction == 7) return "Movimenta-se para esquerda";
		else if (direction == 8) return "Movimenta-se para o canto superior esquerdo";
	}
	let _rolls = [];
	for (const roll of rolls){
		roll.tipo = "roll--dano";
		await roll.render().then((r)=> {_rolls.push(r)});
	}
	let content = {
		item: {
			name: "Confuso",
			img: "systems/tormenta20/icons/conditions/confuso.svg"
		},
		data: {
			description: "<p>" + tabela(action) + ". </p>"
		},
		_rolls: _rolls,
		rolls: rolls
	}
	
	if (game?.dice3d?.show) {
		let wd = {
			whisper: (["gmroll", "blindroll"].includes(rollMode) ? ChatMessage.getWhisperRecipients("GM") 
				: (rollMode === "selfroll" ? [game.user._id] : null)),
			blind: rollMode === "blindroll"
		}
		for (const roll of rolls){
			game.dice3d.showForRoll(roll, game.user, true, wd.whisper, wd.blind)
		}
	}

	let template = "systems/tormenta20/templates/chat/chat-card.html";
	const html = await renderTemplate(template, content);
	const chatData = {
		user: game.user._id,
		type: CONST.CHAT_MESSAGE_TYPES.OTHER,
		content: html,
		speaker: ChatMessage.getSpeaker({actor: this.actor, token})
	};
	ChatMessage.create(chatData);
})()