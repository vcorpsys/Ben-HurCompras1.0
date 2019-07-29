var preco1 = document.getElementById('preco1');
var preco2 = document.getElementById('preco2');

var quantidade1 = document.getElementById('quantidade1');
var quantidade2 = document.getElementById('quantidade2');

var unidade1 = document.getElementById('unidade1');
var unidade2 = document.getElementById('unidade2');

var lab1 = document.getElementById('lab1');
var lab2 = document.getElementById('lab2');

function comparar() {
	preco1.style.backgroundColor = '#FFFFFF';
	preco2.style.backgroundColor = '#FFFFFF';

	var Preco1 = parseFloat(preco1.value.toString().replace(',', '.').trim());
	var Preco2 = parseFloat(preco2.value.toString().replace(',', '.').trim());

	var Quantidade1 = parseFloat(quantidade1.value.toString().replace(',', '.').trim());
	var Quantidade2 = parseFloat(quantidade2.value.toString().replace(',', '.').trim());

	var Unidade1 = unidade1.value.trim();
	var Unidade2 = unidade2.value.trim();

	var Resultado1 = 0;
	var Resultado2 = 0;

	if((Unidade1 == 'kg')||(Unidade1 == 'l')) {
		Resultado1 = Preco1 / (Quantidade1 * 1000);
	}else {
		Resultado1 = Preco1 / Quantidade1;
	}

	if((Unidade2 == 'kg')||(Unidade2 == 'l')) {
		Resultado2 = Preco2 / (Quantidade2 * 1000);
	}else {
		Resultado2 = Preco2 / Quantidade2;
	}

	if(Resultado1 < Resultado2) {
		preco1.style.backgroundColor = '#BDFB58';
		lab1.innerText = 'Item 1: menor preço';
		lab2.innerText = 'Item 2: MAIOR PREÇO';
	} else if(Resultado2 < Resultado1) {
		preco2.style.backgroundColor = '#BDFB58';
		lab2.innerText = 'Item 2: menor preço';
		lab1.innerText = 'Item 1: MAIOR PREÇO';
	} else {
		preco1.style.backgroundColor = '#BDFB58';
		preco2.style.backgroundColor = '#BDFB58';
		lab1.innerText = 'Item 1: Preços Iguais';
		lab2.innerText = 'Item 2: Preços Iguais';
	}
}