// HEADER

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

for(let i = 0; i < inputs.length; i++){ // funcao para pegar valor de input e deixá-lo com 2 casas decimais
    inputs[i].addEventListener("change", function InputValues(){
        let inputValue = Number(inputs[i].value)
        if(i == 2){ // if para nao arredondar o input dos meses, visto que um mes nao pode ser 'quebrado'
            inputValue = inputValue.toFixed(0); 
            console.log(inputValue)
            return;
        }
        inputValue = inputValue.toFixed(2) // funcao nativa para arredondar a 2 casas decimais (o valor precisa estar em numeros)
        console.log(inputValue)
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

for(let j = 0; j < arrayElementLi.length; j++){
    for(let i = 0; i < arrayElementLi[j].length; i++){
        arrayElementLi[j][i].addEventListener("click", () =>{

            document.getElementsByClassName("button-op-calculation")[j].innerHTML = optionsDropDownCalculo[i]
            TiraDropDown(dropDownCalculo)
            abaButtonOpen = false;
            if(i === 0){ // colocar formula para a tabela PRICE
                console.log(optionsDropDownCalculo[i])
            }else if(i === 1){ // SAC
                console.log(optionsDropDownCalculo[i])
            }else if(i === 2){ // SACRE
                console.log(optionsDropDownCalculo[i])
            }else if(i === 3){ // MEJS
                console.log(optionsDropDownCalculo[i])
            }
        })

    }
}

