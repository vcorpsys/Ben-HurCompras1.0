var nome = document.getElementById('nome');
var linha = document.getElementById('linha');

var eid = document.getElementById('eid');
var enome = document.getElementById('enome');

var obrigacao = document.getElementById('obrigacao');
var sel_nome = document.getElementById('sel_nome');
var sel_quantidade = document.getElementById('sel_quantidade');
var sel_valor = document.getElementById('sel_valor');

var nomeDel = '';
var indexTemp = -1;

function preparaCadastro() {
	nome.value = '';
}

function cadastrar() {
	var Nome = nome.value.toString().trim();
	if(Nome.toString().trim().length <= 0) Nome = 'Sem nome';

	var objJSON = [];
	var banco = localStorage.getItem("ben-hur-compras-lista");
	if(banco) {
		objJSON = JSON.parse(banco.toString());
	}

	objObrigacoes = {Nome: Nome, Marcado: 0};
	objJSON.push(objObrigacoes);
	localStorage.setItem('ben-hur-compras-lista', JSON.stringify(objJSON));
	selecionar();
}

function selecionarUm(index=-1) {
	var Nome = document.getElementById('nome_'+index).innerText.toString().trim();
	eid.value = parseInt(index);
	enome.value = Nome;
}

function editar() {
	var Id = parseInt(eid.value);
	var Nome = enome.value.toString().trim();
	if(Nome.toString().trim().length <= 0) Nome = 'Sem nome';

	var objJSON = [];
	var banco = localStorage.getItem("ben-hur-compras-lista");
	if(banco) {
		objJSON = JSON.parse(banco.toString());
	}

	objObrigacoes = {Nome: Nome, Marcado: 0};
	objJSON[Id] = objObrigacoes;
	localStorage.setItem('ben-hur-compras-lista', JSON.stringify(objJSON));
	selecionar();
}

function deletar() {
	localStorage.setItem('ben-hur-compras-lista', "");
	selecionar();
}

function selecionarDel(index=-1) {
	var Nome = document.getElementById('nome_'+index).innerText.toString().trim();
	did.value = parseInt(index);
	obrigacao.innerText = Nome;
	nomeDel = Nome;
}

function deletarUM() {
	var Id = parseInt(did.value);

	var objJSON = [];
	var banco = localStorage.getItem("ben-hur-compras-lista");
	if(banco) {
		objJSON = JSON.parse(banco.toString());
	}

	objJSON.splice(Id, 1);
	localStorage.setItem('ben-hur-compras-lista', JSON.stringify(objJSON));
	selecionar();
	deletarCompra(nomeDel);
}

selecionar();
function selecionar() {
	var objJSON = [];
	var banco = localStorage.getItem("ben-hur-compras-lista");
	if(banco) {
		objJSON = JSON.parse(banco.toString());
	}

	var linha = "";
	var opcoes = "<option value=''></option>";
	var i=0;
	objJSON.forEach((item) => {
		var marcacao = parseInt(item.Marcado);
		var str = '';
		if(marcacao > 0) str = 'checked';
		linha += 
		"<tr>" +
			"<td><label class='switch'><input type='checkbox' id='check_" + i + "' onchange='marcar(" + i + ")' " + str + "><span class='slider round'></span></label></td>" +
			"<td id='nome_" + i + "' style='word-wrap: break-word; word-break: break-all;'>" + item.Nome + "</td>" +
			"<td align='right'><button type='button' class='btn btn-primary' onclick='selecionarUm(" + i + ")' data-toggle='modal' data-target='#modalEditar'>e</button>" +
			"<button type='button' class='btn btn-danger' data-toggle='modal' onclick='selecionarDel(" + i + ")' data-target='#modalDeletar'>x</button></td>" +
		"</tr>";

		opcoes += "<option value='" + item.Nome + "'>" + item.Nome + "</option>";
		i++;
	});
	linhas.innerHTML = linha;
	sel_nome.innerHTML = opcoes;
}

function marcar(index=-1) {
	var Id = parseInt(index);
	indexTemp = Id;
	var Nome = document.getElementById('nome_'+index).innerText.toString().trim();
	if(Nome.toString().trim().length <= 0) Nome = 'Sem nome';
	var check = document.getElementById('check_'+index);
	var Marcado = 0;
	if(check.checked) {
		Marcado = 1;
		lancar(Nome);
	}else {
		deletarCompra(Nome);
	}

	var objJSON = [];
	var banco = localStorage.getItem("ben-hur-compras-lista");
	if(banco) {
		objJSON = JSON.parse(banco.toString());
	}

	objObrigacoes = {Nome: Nome, Marcado: Marcado};
	objJSON[Id] = objObrigacoes;
	localStorage.setItem('ben-hur-compras-lista', JSON.stringify(objJSON));	
}

function cancelaCompra() {
	var index = parseInt(indexTemp);
	var Id = parseInt(index);
	var Nome = document.getElementById('nome_'+index).innerText.toString().trim();
	if(Nome.toString().trim().length <= 0) Nome = 'Sem nome';
	var check = document.getElementById('check_'+index);
	var Marcado = 0;
	check.checked = false;

	var objJSON = [];
	var banco = localStorage.getItem("ben-hur-compras-lista");
	if(banco) {
		objJSON = JSON.parse(banco.toString());
	}

	objObrigacoes = {Nome: Nome, Marcado: Marcado};
	objJSON[Id] = objObrigacoes;
	localStorage.setItem('ben-hur-compras-lista', JSON.stringify(objJSON));	
}

function temCompra(_nome='') {
	var retorno = false;
	var objJSON = [];
	var banco = localStorage.getItem("ben-hur-compras-entradas");
	if(banco) {
		objJSON = JSON.parse(banco.toString());
	}

	var Nome1 = _nome.toString().trim();
	objJSON.forEach((item) => {
		var Nome2 = item.Nome.toString().trim();
		if(Nome1 == Nome2) {
			retorno = true;
		}
	});

	return retorno;
}

function lancar(nome='') {
	$('#lancar').click();
	sel_nome.value = nome;
	sel_quantidade.value = 1;
	sel_valor.value = '';
}

function lancaCompra() {
	var Nome = sel_nome.value.toString().trim();
	if(Nome.toString().trim().length <= 0) Nome = 'Sem nome';
	var Quantidade = parseInt(sel_quantidade.value.toString().trim());
	if(Quantidade <= 0) Quantidade = 1;
	var Valor = sel_valor.value.toString().trim();
	if(Valor.toString().trim().length <= 0) Valor = '0';
	Valor = Valor.replace(',', '.');
	Valor = parseFloat(Valor.replace(',', '.'));
	if(Valor > 0) {
		if(!existeCompra(Nome)) {
			Valor = Valor * Quantidade;

			var objJSON = [];
			var banco = localStorage.getItem("ben-hur-compras-entradas");
			if(banco) {
				objJSON = JSON.parse(banco.toString());
			}

			objObrigacoes = {Nome: Nome, Valor: Valor};
			objJSON.push(objObrigacoes);
			localStorage.setItem('ben-hur-compras-entradas', JSON.stringify(objJSON));
		}
	}else {
		cancelaCompra();
	}
}

function deletarCompra(_nomeDel='') {
	var Id = parseInt(indiceCompra(_nomeDel));

	if(Id >= 0) {
		var objJSON = [];
		var banco = localStorage.getItem("ben-hur-compras-entradas");
		if(banco) {
			objJSON = JSON.parse(banco.toString());
		}

		objJSON.splice(Id, 1);
		localStorage.setItem('ben-hur-compras-entradas', JSON.stringify(objJSON));
	}
}

function indiceCompra(_nomeDel='') {
	var index = -1;
	var objJSON = [];
	var banco = localStorage.getItem("ben-hur-compras-entradas");
	if(banco) {
		objJSON = JSON.parse(banco.toString());
	}

	var i = 0;
	objJSON.forEach((item) => {
		if(item.Nome == _nomeDel) {
			index = i;
		}
		i++;
	});

	return index;
}

function existeCompra(_nome='') {
	var retorno = false;
	var objJSON = [];
	var banco = localStorage.getItem("ben-hur-compras-entradas");
	if(banco) {
		objJSON = JSON.parse(banco.toString());
	}

	var Nome1 = _nome.toString().trim();
	objJSON.forEach((item) => {
		var Nome2 = item.Nome;
		Nome2 = Nome2.toString().trim();
		if(Nome1 == Nome2) {
			retorno = true;
		}
	});
	return retorno;
}
