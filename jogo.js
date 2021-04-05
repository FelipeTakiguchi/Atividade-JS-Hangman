let jogo;

const elementos = {
  telaInicial: document.getElementById('inicial'),
  telaJogo: document.getElementById('jogo'),
  nome: document.getElementById('palavra'),
  dica: document.getElementById('dica'),
  dificuldade: document.getElementById('slc-dificuldade'),
  telaNovaPalavra: document.getElementById('inscricao'),
  botaoExibir: document.querySelector('.exibir-palavra'),
  campoDica: document.querySelector('.pDica'),
  telaMensagem: document.querySelector('.mensagem'),
  textoMensagem: document.querySelector('.mensagem .texto'),
  teclado: document.querySelector('.teclado'),
  palavra: document.querySelector('.palavra'),
  botoes: {
    facil: document.querySelector('.botao-facil'),
    medio: document.querySelector('.botao-medio'),
    dificil: document.querySelector('.botao-dificil'),
    inscricao: document.querySelector('.botao-nova-palavra'),
    adicionar: document.querySelector('.botao-adicionar'),
    reiniciar: document.querySelector('.reiniciar'),
  },
  boneco: [
    document.querySelector('.boneco-cabeca'),
    document.querySelector('.boneco-corpo'),
    document.querySelector('.boneco-braco-esquerdo'),
    document.querySelector('.boneco-braco-direito'),
    document.querySelector('.boneco-perna-esquerda'),
    document.querySelector('.boneco-perna-direita'),
  ],
};

const palavras = {
  facil: [{umNome: 'socar', umaDica: 'Amassar muito, pisar, esmagar',}, 
  {umNome: 'série', umaDica: 'sequência sem interrupção',}, 
  {umNome: 'avaro', umaDica: 'que revela zelo ou ciúme',}, 
  {umNome: 'maior', umaDica: 'Superior; que está acima de outro',}, 
  {umNome: 'noite', umaDica: 'Espaço de tempo entre o pôr do sol e o amanhecer',}, 
  {umNome: 'ímpar', umaDica: 'O número que não pode ser dividido por dois',}, 
  {umNome: 'salvo', umaDica: 'Livre de um perigo de morte',}, 
  {umNome: 'vetor', umaDica: 'Segmento de reta orientado, com direção, sentido e módulo',}, 
  {umNome: 'prado', umaDica: 'Terreno coberto de plantas herbáceas que servem para pastagem; campina',}, 
  {umNome: 'pecha', umaDica: 'Imperfeição; falha moral; falta de adequação às conveniências',}],
  medio: [{umNome: 'cônjuge', umaDica: 'Alguém com relação a outra pessoa que se casou'}, 
  {umNome: 'exceção', umaDica: 'Ação ou efeito de excetuar, de excluir'}, 
  {umNome: 'efêmero', umaDica: 'Que tem curta duração, que é breve'}, 
  {umNome: 'prolixo', umaDica: 'Que usa palavras em excesso'}, 
  {umNome: 'idílico', umaDica: 'de caráter pastoril, puro, bucólico'}, 
  {umNome: 'análogo', umaDica: 'Que é parecido ou que se parece com outra coisa ou pessoa; semelhante, idêntico'}, 
  {umNome: 'caráter', umaDica: 'Caracterização do próprio sujeito; índole, temperamento, personalidade'}, 
  {umNome: 'genuíno', umaDica: 'Que não sofreu alterações nem falsificações; verdadeiro'}, 
  {umNome: 'estória', umaDica: 'Texto Infantil'}, 
  {umNome: 'sublime', umaDica: 'Cujas qualidades ultrapassam o comum'}],
  dificil: [{umNome: 'concepção', umaDica: 'Ação de gerar ou de ser gerado'}, 
  {umNome: 'plenitude', umaDica: 'Condição de pleno, daquilo que está completo, inteiro, sem espaço'}, 
  {umNome: 'essencial', umaDica: 'O que é imprescindível; muito necessário; fundamental'}, 
  {umNome: 'hipócrita', umaDica: 'Quem demonstra uma opinião que não possui ou dissimula qualidades que não têm'}, 
  {umNome: 'corolário', umaDica: 'Situação que ocorre a partir de outras'}, 
  {umNome: 'paradigma', umaDica: 'Exemplo ou padrão a ser seguido'}, 
  {umNome: 'dicotomia', umaDica: 'Divisão de algo em duas partes'}, 
  {umNome: 'hegemonia', umaDica: 'Supremacia, Domínio'}, 
  {umNome: 'ratificar', umaDica: 'Confirmar um ato ou compromisso'}, 
  {umNome: 'propósito', umaDica: 'rande vontade de realizar ou de alcançar alguma coisa'}]
};

const novoJogo = () => {
  jogo = {
    dificuldade: undefined,
    palavra: {
      original: undefined,
      semAcentos: undefined,
      tamanho: undefined,
      dica: undefined,
    },
    acertos: undefined,
    jogadas: [],
    chances: 6,
    definirPalavra: function (palavra) {
      this.palavra.original = palavra.umNome;
      this.palavra.tamanho = palavra.umNome.length;
      this.palavra.dica = palavra.umaDica;
      this.acertos = '';
      this.palavra.semAcentos = this.palavra.original.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      for (let i = 0; i < this.palavra.tamanho; i++) {
        this.acertos += ' ';
      }
    },
    jogar: function (letraJogada) {
      let acertou = false;
      for (let i = 0; i < this.palavra.tamanho; i++) {
        const letra = this.palavra.semAcentos[i].toLowerCase();
        if (letra === letraJogada.toLowerCase()) {
          acertou = true;
          this.acertos = replace(this.acertos, i, this.palavra.original[i]);
        }
      }
      if (!acertou) {
        this.chances--;
      }
      return acertou;
    },
    ganhou: function () {
      return !this.acertos.includes(' ');
    },
    perdeu: function () {
      return this.chances <= 0;
    },
    acabou: function () {
      return this.ganhou() || this.perdeu();
    },
  };

  elementos.telaInicial.style.display = 'flex';
  elementos.telaJogo.style.display = 'none';
  elementos.telaNovaPalavra.style.display = 'none';
  elementos.telaMensagem.style.display = 'none';
  elementos.telaMensagem.classList.remove('mensagem-vitoria');
  elementos.telaMensagem.classList.remove('mensagem-derrota');
  for (const parte of elementos.boneco) {
    parte.classList.remove('escondido');
    parte.classList.add('escondido');
  }

  criarTeclado();
};

const mostrarDica = () => {
  if(elementos.campoDica.textContent == ''){
    elementos.campoDica.textContent = jogo.palavra.dica;
  }
  else{
    elementos.campoDica.textContent = '';
  }
};

const criarTeclado = () => {
  const letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  elementos.teclado.textContent = '';
  for (const letra of letras) {
    const button = document.createElement('button');
    button.appendChild(document.createTextNode(letra.toUpperCase()));
    button.classList.add(`botao-${letra}`);

    elementos.teclado.appendChild(button);

    button.addEventListener('click', () => {
      if (!jogo.jogadas.includes(letra) && !jogo.acabou()) {
        const acertou = jogo.jogar(letra);
        jogo.jogadas.push(letra);
        button.classList.add(acertou ? 'certo' : 'errado');
        mostrarPalavra();

        if (!acertou) {
          mostrarErro();
        }

        if (jogo.ganhou()) {
          mostrarMensagem(true);
        } else if (jogo.perdeu()) {
          mostrarMensagem(false);
        }
      }
    });
  }
};

document.addEventListener('keydown', function (event) {
  if(jogo.palavra.original != undefined){
    let umaLetra = '';
    umaLetra = event.key;

    const botao = document.querySelector(`.botao-${umaLetra}`);

    if (!jogo.jogadas.includes(umaLetra) && !jogo.acabou() && ((97 <= umaLetra.charCodeAt(0) && umaLetra.charCodeAt(0) <= 123) || (65 <= umaLetra.charCodeAt(0) && umaLetra.charCodeAt(0) <= 90)) && umaLetra.length == 1) {
      const acertou = jogo.jogar(umaLetra);
      jogo.jogadas.push(umaLetra);
      botao.classList.add(acertou ? 'certo' : 'errado');
      mostrarPalavra();

      if (!acertou) {
        mostrarErro();
      }

      if (jogo.ganhou()) {
        mostrarMensagem(true);
      } else if (jogo.perdeu()) {
        mostrarMensagem(false);
      }
    }
  }
})

const mostrarErro = () => {
  const parte = elementos.boneco[5 - jogo.chances];
  parte.classList.remove('escondido');
};

const mostrarMensagem = vitoria => {
  const mensagem = vitoria ? '<p>Parabéns!</p><p>Você GANHOU!</p>' : '<p>Que pena!</p><p>Você PERDEU!</p>';
  elementos.textoMensagem.innerHTML = mensagem;
  elementos.telaMensagem.style.display = 'flex';
  elementos.telaMensagem.classList.add(`mensagem-${vitoria ? 'vitoria' : 'derrota'}`);
};

const sortearPalavra = () => {
  const i = Math.floor(Math.random() * palavras[jogo.dificuldade].length);
  const palavra = palavras[jogo.dificuldade][i];
  jogo.definirPalavra(palavra);

  elementos.campoDica.textContent = '';

  return jogo.palavra.original;
};

const mostrarPalavra = () => {
  elementos.palavra.textContent = '';
  for (let i = 0; i < jogo.acertos.length; i++) {
    const letra = jogo.acertos[i].toUpperCase();
    elementos.palavra.innerHTML += `<div class="letra-${i}">${letra}</div>`;
  }
};

const exibirFormulario = () => {
  elementos.telaInicial.style.display = 'none';
  elementos.telaNovaPalavra.style.display = 'flex';
  elementos.dificuldade.value = '';
  elementos.nome.value = '';
  elementos.dica.value = '';
};

const adicionarPalavra = () => {
  const dificuldade = elementos.dificuldade.value;
  const nome = elementos.nome.value;
  const dica =  elementos.dica.value;

  console.log(dificuldade);

  if(nome.length > 0 && dica.length > 0 && dificuldade != ''){
    
    const novaPalavra = {
      umNome: nome,
      umaDica: dica,
    }

    if(dificuldade == 'facil'){
      palavras.facil.push(novaPalavra);
    }else if(dificuldade == 'medio'){
      palavras.medio.push(novaPalavra);
    }else if(dificuldade == 'dificil'){
      palavras.dificil.push(novaPalavra);
    }

    elementos.telaNovaPalavra.style.display = 'none';
    elementos.telaInicial.style.display = 'flex';
  }
}

const iniciarJogo = dificuldade => {
  jogo.dificuldade = dificuldade;
  elementos.telaInicial.style.display = 'none';
  elementos.telaJogo.style.display = 'flex';

  sortearPalavra();
  mostrarPalavra();
};

const replace = (str, i, newChar) => str.substring(0, i) + newChar + str.substring(i + 1);

elementos.botoes.facil.addEventListener('click', () => iniciarJogo('facil'));
elementos.botoes.medio.addEventListener('click', () => iniciarJogo('medio'));
elementos.botoes.dificil.addEventListener('click', () => iniciarJogo('dificil'));
elementos.botoes.inscricao.addEventListener('click', () => exibirFormulario());
elementos.botoes.adicionar.addEventListener('click', () => adicionarPalavra());
elementos.botaoExibir.addEventListener('click', () => mostrarDica());

elementos.botoes.reiniciar.addEventListener('click', () => novoJogo());

novoJogo();
