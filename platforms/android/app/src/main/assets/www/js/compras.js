var nome = document.getElementById('nome');
var quantidade = document.getElementById('quantidade');
var valor = document.getElementById('valor');
var linha = document.getElementById('linha');
var total = document.getElementById('total');

var eid = document.getElementById('eid');
var enome = document.getElementById('enome');
var evalor = document.getElementById('evalor');

var obrigacao = document.getElementById('obrigacao');

function preparaCadastro() {
	nome.value = '';
	valor.value = '';
}

function cadastrar() {
	var Nome = nome.value.toString().trim();
	if(Nome.toString().trim().length <= 0) Nome = 'Sem nome';
	var Quantidade = parseInt(quantidade.value.toString().trim());
	if(Quantidade <= 0) Quantidade = 1;
	var Valor = valor.value.toString().trim();
	if(Valor.toString().trim().length <= 0) Valor = '0';
	Valor = parseFloat(Valor.replace(',', '.'));
	Valor = Valor * Quantidade;

	var objJSON = [];
	var banco = localStorage.getItem("shehur-compras-entradas");
	if(banco) {
		objJSON = JSON.parse(banco.toString());
	}

	objObrigacoes = {Nome: Nome, Valor: Valor};
	objJSON.push(objObrigacoes);
	localStorage.setItem('shehur-compras-entradas', JSON.stringify(objJSON));
	selecionar();
	lancaLista(Nome);
}

function selecionarUm(index=-1) {
	var Nome = document.getElementById('nome_'+index).innerText.toString().trim();
	var Valor = document.getElementById('valor_'+index).innerText.replace('R$ ', '').toString().trim();
	eid.value = parseInt(index);
	enome.value = Nome;
	evalor.value = Valor;
}

function editar() {
	var Id = parseInt(eid.value);
	var Nome = enome.value.toString().trim();
	if(Nome.toString().trim().length <= 0) Nome = 'Sem nome';
	var Valor = evalor.value.toString().trim();
	if(Valor.toString().trim().length <= 0) Valor = '0';
	Valor = Valor.replace(',', '.');

	var objJSON = [];
	var banco = localStorage.getItem("shehur-compras-entradas");
	if(banco) {
		objJSON = JSON.parse(banco.toString());
	}

	objObrigacoes = {Nome: Nome, Valor: Valor};
	objJSON[Id] = objObrigacoes;
	localStorage.setItem('shehur-compras-entradas', JSON.stringify(objJSON));
	selecionar();
}

function deletar() {
	localStorage.setItem('shehur-compras-entradas', "");
	selecionar();
}

function selecionarDel(index=-1) {
	var Nome = document.getElementById('nome_'+index).innerText.toString().trim();
	did.value = parseInt(index);
	obrigacao.innerText = Nome;
}

function deletarUM() {
	var Id = parseInt(did.value);

	var objJSON = [];
	var banco = localStorage.getItem("shehur-compras-entradas");
	if(banco) {
		objJSON = JSON.parse(banco.toString());
	}

	objJSON.splice(Id, 1);
	localStorage.setItem('shehur-compras-entradas', JSON.stringify(objJSON));
	selecionar();	
}

selecionar();
function selecionar() {
	var soma = 0;
	var objJSON = [];
	var banco = localStorage.getItem("shehur-compras-entradas");
	if(banco) {
		objJSON = JSON.parse(banco.toString());
	}

	var linha = "";
	var i=0;
	objJSON.forEach((item) => {
		if(item.Valor.toString().trim().length <= 0)
			item.Valor = 0;

		soma += parseFloat(item.Valor);
		linha += 
		"<tr>" +
			"<td id='nome_" + i + "' style='word-wrap: break-word; word-break: break-all;'>" + item.Nome + "</td>" +
			"<td id='valor_" + i + "'>R$ " + item.Valor + "</td>" +
			"<td align='right'><button type='button' class='btn btn-primary' onclick='selecionarUm(" + i + ")' data-toggle='modal' data-target='#modalEditar'>e</button>" +
			"<button type='button' class='btn btn-danger' data-toggle='modal' onclick='selecionarDel(" + i + ")' data-target='#modalDeletar'>x</button></td>" +
		"</tr>";
		i++;
	});
	linhas.innerHTML = linha;
	total.innerText = 'TOTAL: R$ ' + soma.toFixed(2);
}

function lancaLista(_Nome='') {
	var objJSON = [];
	var banco = localStorage.getItem("shehur-compras-lista");
	if(banco) {
		objJSON = JSON.parse(banco.toString());
	}

	var i=0;
	objJSON.forEach((item) => {
		if(_Nome == item.Nome) {
			marcar(i, _Nome, 1);
		}
		i++;
	});
}

function marcar(_index=-1, _nome='', _marcado=1) {
	var Id = parseInt(_index);
	var Nome = _nome.toString().trim();
	if(Nome.toString().trim().length <= 0) Nome = 'Sem nome';

	var objJSON = [];
	var banco = localStorage.getItem("shehur-compras-lista");
	if(banco) {
		objJSON = JSON.parse(banco.toString());
	}

	objObrigacoes = {Nome: Nome, Marcado: _marcado};
	objJSON[Id] = objObrigacoes;
	localStorage.setItem('shehur-compras-lista', JSON.stringify(objJSON));	
}
