// HEADER
const topicoComAbas = document.getElementsByClassName("topico-com-abas");
const dropDown = document.getElementsByClassName("dropDown");
let abaOpen = false;

for(let i = 0; i < topicoComAbas.length; i++){

    topicoComAbas[i].addEventListener("mouseover", () =>{ // muda direcao da setinha
        document.getElementsByClassName("arrow-navBar")[i].style.rotate = '90deg';
        dropDown[0].style.display = 'none';
        dropDown[1].style.display = 'none';
        abaOpen = false;
    })

    document.getElementsByClassName("topico-com-abas-container")[i].addEventListener("mouseout", () =>{ // direcao original da setinha
        document.getElementsByClassName("arrow-navBar")[i].style.rotate = '0deg';
    })

    topicoComAbas[i].addEventListener("click", () =>{
        if(!abaOpen){
            dropDown[i].style.display = 'block';
            abaOpen = true;
            return
        }

        dropDown[0].style.display = 'none';
        dropDown[1].style.display = 'none';

        abaOpen = false;
        
    })

}

//scroll do header



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