function teste (){
    alert("oi")
	// cria um elemento de div para selecionar a área
	const selector = document.createElement('div');
	selector.style.position = 'fixed';
	selector.style.left = '0';
	selector.style.top = '0';
	selector.style.width = '100%';
	selector.style.height = '100%';
	selector.style.background = 'rgba(0,0,0,0.5)';
	selector.style.zIndex = '9999';
	document.body.appendChild(selector);

	// cria um elemento de canvas para exibir a seleção
	const canvas = document.createElement('canvas');
	canvas.style.position = 'absolute';
	canvas.style.left = '0';
	canvas.style.top = '0';
	canvas.style.border = '2px dashed red';
	selector.appendChild(canvas);

	// adiciona um evento de mousemove para atualizar a posição e tamanho da seleção
	let startX, startY;
	canvas.addEventListener('mousedown', (event) => {
		startX = event.clientX;
		startY = event.clientY;
		canvas.style.left = startX + 'px';
		canvas.style.top = startY + 'px';
		canvas.style.width = '0px';
		canvas.style.height = '0px';
		document.addEventListener('mousemove', mouseMoveHandler);
	});

	// adiciona um evento de mouseup para capturar a imagem e remover a seleção
    
	canvas.addEventListener('mouseup', () => {
		document.removeEventListener('mousemove', mouseMoveHandler);
		html2canvas(document.body, {
			x: startX,
			y: startY,
			width: parseInt(canvas.style.width),
			height: parseInt(canvas.style.height),
			useCORS: true
		}).then(canvas => {
			// converte o canvas em uma imagem de dados URI
			const dataURL = canvas.toDataURL('image/png');

			// exibe a imagem na página
			const imgElement = document.createElement('img');
			imgElement.src = dataURL;
			document.getElementById('beta').appendChild(imgElement);

			// remove o seletor
			selector.parentNode.removeChild(selector);
		});
	});

	// função para atualizar a posição e tamanho da seleção
	function mouseMoveHandler(event) {
		canvas.style.width = (event.clientX - startX) + 'px';
		canvas.style.height = (event.clientY - startY) + 'px';
	}

};
