#include <stdio.h>
#include <locale.h>
#include <windows.h>
#include <iostream>
#include <string>				

using namespace std;

void preenche_valores(int &num_meses, float &valor_f, float &taxa){
	printf("--------------------------------------------------------\n\n");
	printf("�tima escolha!");
	printf("\n\nPor favor, insira os seguintes valores para prosseguir");
	printf("\n\nDigite o valor do emprestimo: ");
    scanf("%f", &valor_f);
    printf("Digite a taxa de juros (em decimal): ");
    scanf("%f", &taxa);
    printf("Digite o numero de meses: ");
    scanf("%d", &num_meses);
}

void sistemaPrice(int num_meses, float valor_f, float taxa){
	float prestacao, juros, potencia=1;

    for (int i = 0; i < num_meses; ++i) {
        potencia *= (1 + taxa);
    }

    prestacao = valor_f * (taxa * potencia) / (potencia - 1);

    printf("     Mes    |     Prestacao     |  Juros       |     Amortizacao    | Saldo Devedor\n");
    printf("-----------------------------------------------------------------------------------\n");
	printf("     0      |                   |              |                    | R$ %.2f\n",valor_f);
	
    for (int i = 1; i <= num_meses; ++i) {
        juros = valor_f * taxa;
        valor_f -= (prestacao - juros);
        
        if(i>9){
        	printf("    %d      |R$ %.2f          |R$ %.2f     |R$ %.2f           | R$ %.2f\n", i, prestacao, juros, prestacao - juros, valor_f);
		}
		else{
			printf("     %d      |R$ %.2f          |R$ %.2f     |R$ %.2f             | R$ %.2f\n", i, prestacao, juros, prestacao - juros, valor_f);
		}
    }
    
}


void sistemaSAC(int num_meses, float valor_f, float taxa){
	float amortizacao, juros, prestacao; 
	amortizacao = valor_f / num_meses;
	printf("     Mes    |     Prestacao     |  Juros       |     Amortizacao    | Saldo Devedor\n");
    printf("-----------------------------------------------------------------------------------\n");
	printf("     0      |                   |              |                    | R$ %.2f\n",valor_f);

    for (int i = 1; i <= num_meses; ++i) {
        juros = valor_f * taxa;
       
        prestacao = amortizacao + juros;
        valor_f -= amortizacao;

        
        if(i!=num_meses){
        	if(i>9){
				printf("    %d      |R$ %.2f          |R$ %.2f     |R$ %.2f           | R$ %.2f\n", i, prestacao, juros, amortizacao, valor_f);	
			}
			else{
				printf("     %d      |R$ %.2f          | R$ %.2f    | R$ %.2f           | R$ %.2f\n", i, prestacao, juros, amortizacao, valor_f);		
			}
		}
		else{
			printf("    %d      |R$ %.2f          | R$ %.2f    | R$ %.2f            | R$ %.2f\n", i, prestacao, juros, amortizacao, valor_f);		
		}
    }

}

void animationLoading(int TimeAnimation, string conteudo){ // animation function - TimeAnimation = qty repeats
	system("cls");
	for(int i = 0; i < TimeAnimation; i++){
		
		cout << conteudo;
		
		for(int j = 0; j < 3; j++){
			cout << ".";
			Sleep(200);
		}
		Sleep(500);
		system("cls");
	}
		
}

void EstilizacaoTitulo(string titulo){
	for(int i = 0; i < titulo.length()+4; i++){
		printf("-");
	}
	cout << "\n| " << titulo << " |\n";
	for(int i = 0; i < titulo.length()+4; i++){
		printf("-");
	}
	
}

int main(){
	setlocale(LC_ALL, "portuguese");
	int nm, opc;
	float vf, i;
	printf("--------------------------------------------------------\n\n");
	EstilizacaoTitulo("AMORTIZA��O");
	printf("\n\nEscolha o tipo de sistema!");
	printf("\n1- Sistema Price");
	printf("\n2- Sistema SAC");
	printf("\n3- N�o sabe qual sistema usar? Compare os dois sistemas!");
	printf("\n\n0- Sair\n");
	printf("--------------------------------------------------------\n");
	printf("Insira a op��o: ");
	scanf("%d", &opc);
	while(opc<0 || opc>3){
		printf("Op��o inv�lida, tente novamente: ");
		scanf("%d", &opc);
	}
	
	switch(opc){
		case 0:{
			animationLoading(2, "Encerrando Programa");
			printf("TCHAU");
			break;
		}
		case 1:{
			animationLoading(2, "Carregando");
			preenche_valores(nm, vf, i);
			printf("\n");
			EstilizacaoTitulo("Sistema Price");
			printf("\n\n");
			sistemaPrice(nm, vf, i);
			break;
		}
		case 2:{
			animationLoading(2, "Carregando");
			preenche_valores(nm, vf, i);
			printf("\n");
			EstilizacaoTitulo("Sistema SAC");
			printf("\n\n");
			sistemaSAC(nm, vf, i);
			break;
		}
		case 3:{
			animationLoading(2, "Carregando");
			preenche_valores(nm, vf, i);
			printf("Agora voc� poder� ver qual sistema se adapta melhor a voc�!\n");
			EstilizacaoTitulo("Sistema Price");
			printf("\n\n");
			sistemaPrice(nm, vf, i);
			printf("\n");	
			EstilizacaoTitulo("Sistema SAC");
			printf("\n\n");
			sistemaSAC(nm, vf, i);
			break;
		}
	}
	
}
