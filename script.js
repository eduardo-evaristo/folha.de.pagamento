//Elements we'll work with
const salarioBruto = document.getElementById("salario-bruto");
const diasUteis = document.getElementById("dias-uteis");
const passagem = document.getElementById("passagem");
const valeAlimentacao = document.getElementById("vale-alimentacao");
const proventos = document.getElementById("proventos");
const insalubridadeWindow = document.querySelector(".insalubridade");
const insalubridade = document.getElementById("insalubridade");
const mainButton = document.querySelector(".main-button");
const salarioMinimoAtual = 1412;

//Função para validar se o caracter é um número, backspace ou .
function validKeys(event) {
  const validKeys = ["0","1","2","3","4","5","6","7","8","9", "Backspace", "."];

  if (!validKeys.includes(event.key)) {
    event.preventDefault();
  }
}

//Função para calcular e retornar o valor mínimo da passagem
function calcPassagem() {
  const diasXPassagem = passagem.value * diasUteis.value;
  const salBrutoSeis = salarioBruto.value * 0.06;
  return diasXPassagem < salBrutoSeis ? diasXPassagem : salBrutoSeis;
}

//Função para calcular valor da periculosidade
function calcPericulosidade () {
  if (proventos.value === "periculosidade") {
    return salarioBruto.value * 0.3;
  }
  return 0;
}

//Função para calcular valor da insalubridade
function calcInsalubridade() {
  switch(insalubridade.value) {
    case "minima":
      return Number(((salarioMinimoAtual * 0.1).toFixed(2)));
      break;
    case "media":
      return Number(((salarioMinimoAtual * 0.2).toFixed(2)));
      break;
    case "maxima":
      return Number(((salarioMinimoAtual * 0.4).toFixed(2)));
      break;
    default:
      return 0;
  }
}

//Função para obter valores inseridos
mainButton.addEventListener("click", function() {
  if (salarioBruto.value !== 0 && diasUteis.value !== 0) {
    console.log(calcPassagem());
    console.log(calcPericulosidade());
    console.log(calcInsalubridade());
  }
})

//Mostra (ou não) a janela referente a insalubridade
proventos.addEventListener("input", () => {
  console.log(proventos.value);
  if (proventos.value === "insalubridade") {
    insalubridadeWindow.classList.remove("hidden");
  } else {
    insalubridadeWindow.classList.add("hidden");
  }
});

//Validação nos inputs
salarioBruto.addEventListener("keydown", validKeys);
diasUteis.addEventListener("keydown", validKeys);
passagem.addEventListener("keydown", validKeys);
valeAlimentacao.addEventListener("keydown", validKeys);


