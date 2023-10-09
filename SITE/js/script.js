let valorPresente = 30000;
let juros = 2;
let numMeses = 3;

$(function() {
    $("#valorPresente-input").maskMoney({ // formata o input 
        prefix:'R$ ', 
        thousands:'.', 
        decimal:',', 
    });
    $("#valorPresente-input").maskMoney('mask', 30000.00) // define valor inicial do input
})

// HEADERg

function TiraDropDown(elemento){

    for(let i = 0; i < elemento.length; i++){
        elemento[i].style.display = 'none'
    }

}

const topicoComAbas = document.getElementsByClassName("topico-com-abas");
const dropDown = document.getElementsByClassName("dropDown");
let abaOpen = false;

for(let i = 0; i < topicoComAbas.length; i++){

    topicoComAbas[i].addEventListener("mouseover", () =>{ // muda direcao da setinha
        document.getElementsByClassName("arrow-navBar")[i].style.rotate = '90deg';
        TiraDropDown(dropDown)
        abaOpen = false;
    })

    document.getElementsByClassName("topico-com-abas")[i].addEventListener("mouseout", () =>{ // direcao original da setinha
    document.getElementsByClassName("arrow-navBar")[i].style.rotate = '0deg';
    })

    topicoComAbas[i].addEventListener("click", () =>{
        if(!abaOpen){
            dropDown[i].style.display = 'block';
            abaOpen = true;
            return
        }

        TiraDropDown(dropDown);

        abaOpen = false;
        
    })

}

//scroll do header

let ultimaPosicao = 0;

document.addEventListener("scroll", function scrollHeader(){
    const nav = document.querySelector("nav"); 
    let atualPosicao = window.scrollY;

    if(atualPosicao > ultimaPosicao) {
        nav.style.top = '-5em'
        TiraDropDown(dropDown);

    } else {
        nav.style.top = '0'
        
    }

    ultimaPosicao = atualPosicao;

})


//INPUTS
const inputs = document.getElementsByClassName("inputs") // como tem vários el. com a classe "inputs", ele transforma essa var em um array

$("#valorPresente-input").change( function(){
    valorPresente = $("#valorPresente-input").maskMoney('unmasked')[0];
    console.log("Valor Presente: " + valorPresente);
    for(let k = 1; k <= 2; k++){
        for(let j = 0; j < 2; j++){
            tbody[j].innerHTML = "";
            mudaTabela(j, valorPresente, numMeses, juros, tbody[j]);
        }
    }
});

for(let i = 0; i < inputs.length; i++){ // funcao para pegar valor de input e deixá-lo com 2 casas decimais
    inputs[i].addEventListener("change", function InputValues(){
        
        let inputValue = inputs[i].value
        if(i == 1){ 
            juros = Number(inputValue).toFixed(2);
            console.log("Juros: " + juros);
        }else if(i == 2){
            numMeses = Number(inputValue).toFixed(0); 
            console.log("Mes: " + numMeses);
        }

        for(let k = 1; k <= 2; k++){
            for(let j = 0; j < 2; j++){
                tbody[j].innerHTML = "";
                mudaTabela(j, valorPresente, numMeses, juros, tbody[j]);
            }
        }

    })
}

// dropDown opcoes da tabela

const opButtonCalculo = document.getElementsByClassName("button-op-calculation-container");
const dropDownCalculo = document.getElementsByClassName("dropDown-calculo");

let abaButtonOpen = false 

for(let i = 0; i < opButtonCalculo.length; i++){

    opButtonCalculo[i].addEventListener("click", () =>{
        if(!abaButtonOpen){
            dropDownCalculo[i].style.display = 'block'
            abaButtonOpen = true;
            return
        }

        TiraDropDown(dropDownCalculo)
        abaButtonOpen = false;

    })

}

const optionsDropDownCalculo = ['PRICE', 'SAC', 'SACRE', 'MEJS'];
const arrayElementLi = [document.getElementsByClassName("op-dropDown-calculo1"), document.getElementsByClassName("op-dropDown-calculo2")];
const tbody = document.getElementsByClassName("tbody");

for(let j = 0; j < arrayElementLi.length; j++){ // colocando as tabelas como padrao no site
    mudaTabela(j, valorPresente, numMeses, juros, tbody[j]);
}

for(let j = 0; j < arrayElementLi.length; j++){
    for(let i = 0; i < arrayElementLi[j].length; i++){
        arrayElementLi[j][i].addEventListener("click", () =>{
            tbody[j].innerHTML = "";
            document.getElementsByClassName("button-op-calculation")[j].innerHTML = optionsDropDownCalculo[i]
            TiraDropDown(dropDownCalculo)

            mudaTabela(i, valorPresente, numMeses, juros, tbody[j]);
            
            abaButtonOpen = false;
        })

    }
}

function linhaTabela(tabela, mes, valorParcela, amortizacao, juros, saldoDevedor){
    let linhaTabela = document.createElement("tr");
    linhaTabela.innerHTML = 
    `
        <td class="n-td">${mes}</td>
        <td class="valorParcela-td">R$ ${valorParcela.toFixed(2)}</td>
        <td class="amortizacao-td">R$ ${amortizacao.toFixed(2)}</td>
        <td class="juros-td">R$ ${juros.toFixed(2)}</td>
        <td class="saldoDevedor-td">R$ ${Math.abs(saldoDevedor).toFixed(2)}</td>
    `
    tabela.appendChild(linhaTabela);
}

function calculoPrice(emprestimo, numMeses, taxa, tabela){
    let valorParcela = emprestimo * (taxa/100) / ( 1 - (1 + (taxa/100)) ** -numMeses)
    let juros;
    let amortizacao;
    let saldoDevedor = emprestimo;

    for(let i = 1; i <= numMeses; i++){
        juros = saldoDevedor * (taxa/100);
        amortizacao = valorParcela - juros;
        saldoDevedor -= amortizacao;
        
        linhaTabela(tabela, i, valorParcela, amortizacao, juros, saldoDevedor)
    }
}

function calculoSac(emprestimo, numMeses, taxa, tabela){
    let saldoDevedor = emprestimo;
    let amortizacao = saldoDevedor/numMeses;
    let juros;
    let valorParcela; 

    for(let i = 1; i <= numMeses; i++){
        juros = saldoDevedor * (taxa/100);
        valorParcela = amortizacao + juros;
        saldoDevedor -= amortizacao;

        linhaTabela(tabela, i, valorParcela, amortizacao, juros, saldoDevedor)
    }
}

function mudaTabela(i, valorPresente, numMeses, juros, tabela){
    if(i === 0){ // colocar formula para a tabela PRICE
        calculoPrice(valorPresente, numMeses, juros, tabela);
    }else if(i === 1){ // SAC
        calculoSac(valorPresente, numMeses, juros, tabela);
    }else if(i === 2){ // SACRE
        console.log(optionsDropDownCalculo[i])
    }else if(i === 3){ // MEJS
        console.log(optionsDropDownCalculo[i])
    }
}
