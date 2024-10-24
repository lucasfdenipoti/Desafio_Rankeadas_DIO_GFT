class Jogador { // Classe que representa o jogador
    constructor(nome) {
        // Inicializa o nome e o número de vitórias
        this.nome = nome;
        this.vitorias = 0;
    }

    obterRank() {  // Método que retorna a classificação do jogador com base em suas vitórias
        if (this.vitorias < 10) {
            return "Ferro";
        } else if (this.vitorias >= 10 && this.vitorias <= 20) {
            return "Bronze";
        } else if (this.vitorias >= 21 && this.vitorias <= 50) {
            return "Prata";
        } else if (this.vitorias >= 51 && this.vitorias <= 80) {
            return "Ouro";
        } else if (this.vitorias >= 81 && this.vitorias <= 90) {
            return "Diamante";
        } else if (this.vitorias >= 91 && this.vitorias <= 100) {
            return "Lendário";
        } else {
            return "Imortal";
        }
    }

    adicionarVitorias(partidasGanhas) { // Método que contabiliza as vitórias do jogador
        this.vitorias += partidasGanhas;
    }
}

class Imortal {  // Classe que representa o oponente final da arena
    constructor() {   
        this.hp = 25; // Vida do Imortal
    }

    receberDano(dano) { // Método para reduzir a vida do Imortal
        this.hp -= dano;
    }

    estaVivo() {    // Verifica se o Imortal ainda está vivo
        return this.hp > 0;
    }
}

class Jogo {    // Classe que controla o jogo
    constructor(jogador) {
        // Inicializa o jogador
        this.jogador = jogador;
        // Valor mínimo e máximo de rolagem do dado
        this.minRoll = 1;
        this.maxRoll = 20;
        // Valor mínimo e máximo que o jogador pode causar
        this.minDmg = 10;
        this.maxDmg = 12;
        // O jogador tem 5 rodadas para derrotar o Imortal
        this.limiteRodadas = 5;
    }

    rolarDado(min, max) {   // Função para simular a rolagem de dados
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    iniciar() { // Método que inicia o jogo
        console.log("--------------------------------------------------------------------------------------------------------------------------------------------------------------------");
        console.log("Senhoras e senhores, preparem seus corações para testemunharem o nascimento de uma lenda! \nHoje, os deuses olham com atenção sobre esta arena, pois um novo desafiante ousa adentrar o campo de batalha!");
        console.log("*O público explode em gritos ensurdecedores, enquanto o anunciador brada com fervor final*");
        console.log("Saúdem " + this.jogador.nome + "! E que a batalha comece!");
        console.log("--------------------------------------------------------------------------------------------------------------------------------------------------------------------");

        // Simula um número aleatório de vitórias 
        let vitorias = this.rolarDado(0, 100);
        this.jogador.adicionarVitorias(vitorias);
        // let vitorias = 100; // Testar com 100 vitórias
        // let vitorias = 0;   // Testar com 0 vitórias
        
        // Condição caso o jogador não alcance as 100 vitórias
        if (this.jogador.vitorias > 0 && this.jogador.vitorias <= 99) {
            console.log("O bravo lutador " + this.jogador.nome + " conquistou " + this.jogador.vitorias + " vitórias na arena e obteve o nível de " + this.jogador.obterRank() + "! \nPorém, ele não resistiu até a batalha final...");   
            console.log("----------------------------------------------------------------------------------------------------------------------------------------------------------------");
        }

        // Caso o jogador tenha zero vitórias
        if (this.jogador.vitorias == 0) {
            console.log("Que humilhante! O " + this.jogador.nome + " perdeu de primeira! conquistando " + this.jogador.vitorias + " vitórias e obteve o nível de " + this.jogador.obterRank() + "!");
        }

        // Caso o jogador tenha 100 vitórias, ele enfrenta o Imortal
        if (this.jogador.vitorias >= 100) {
            console.log("O Herói chegou a 100 vitórias! \nEle Desafia o Imortal para proclamar o seu posto da arena!");
            this.enfrentarImortal();
        }
    }

    enfrentarImortal() {    // Método para simular o combate contra o Imortal
        let imortal = new Imortal();    // Cria uma instância do Imortal
        let rodadasRestantes = this.limiteRodadas;  // Define o número de rodadas disponíveis
        console.log("Começem o combate lendário!");
        console.log("--------------------------------------------------------------------------------------------------------------------------------------------------------------------");

        // Enquanto o Imortal estiver vivo e houver rodadas restantes
        while (imortal.estaVivo() && rodadasRestantes > 0) {
            // Rolagem para acertar o Imortal e rola para o dano
            let roll = this.rolarDado(this.minRoll, this.maxRoll);
            let rollDmg = this.rolarDado(this.minDmg, this.maxDmg);

            console.log("O bravo lutador tenta atingir o Imortal!");

            // Condições de acerto
            if (roll >= 14) {
                console.log(this.jogador.nome + " acertou o Imortal com sua espada!");
                console.log("--------------------------------------------------------------------------------------------------------------------------------------------------------------------");
                imortal.receberDano(rollDmg);
            } 
            // Errou o ataque
            else {
                console.log("O Imortal contra ataca o " + this.jogador.nome);
                console.log("--------------------------------------------------------------------------------------------------------------------------------------------------------------------");
            }
            // Condição de vitória
            if (!imortal.estaVivo()) {
                this.jogador.vitorias = 101;
                console.log("O Imortal foi derrotado! O herói " + this.jogador.nome +  " conquistou " + this.jogador.vitorias + " vitórias e assumiu o posto de " + this.jogador.obterRank() + "!");
                console.log("--------------------------------------------------------------------------------------------------------------------------------------------------------------------");
                break;
            }

            rodadasRestantes--; // Reduz o número de rodadas restantes

            // Condição de derrota
            if (rodadasRestantes === 0) {
                this.jogador.vitorias = 100;
                console.log("O bravo lutador " + this.jogador.nome + " conquistou 100 vitórias na arena e obteve o nível de " + this.jogador.obterRank() + "! \nMas foi derrotado pela lâmina do Imortal...");
                console.log("--------------------------------------------------------------------------------------------------------------------------------------------------------------------");
                break;
            }
        }
    }
}

// Função para iniciar o jogo
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Digite o nome do jogador: ', nome => {   // Solicita o nome do jogador
    let jogador = new Jogador(nome);    // Cria uma instância do jogador com o nome digitado
    let jogo = new Jogo(jogador);   // Cria uma instância do jogo
    jogo.iniciar(); // Inicia o jogo
    readline.close();   // Fecha a interface de entrada do readline
});