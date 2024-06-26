//Elements we'll work with
const salarioBruto = document.getElementById("salario-bruto");
const diasUteis = document.getElementById("dias-uteis");
const passagem = document.getElementById("passagem");
const valeRefeicao = document.getElementById("vale-refeicao");
const proventos = document.getElementById("proventos");
const insalubridadeWindow = document.querySelector(".insalubridade");
const insalubridade = document.getElementById("insalubridade");
const mainButton = document.querySelector(".main-button");
const salarioMinimoAtual = 1412;
const checkboxPassagem = document.getElementById("checkbox-passagem");
const checkboxValeRefeicao = document.getElementById("checkbox-vale-refeicao");
const accordionItemHead = document.querySelectorAll(".accordion-item-head");
//const heroButton1 = document.querySelector(".button-1");
//const heroButton2 = document.querySelector(".button-2");
const heroButtons = document.querySelectorAll(".hero-button");
const headerLinkSobre = document.querySelector(".sobre");
//const main = document.querySelector("main");
//const accordionSection = document.querySelector(".accordion");
const mobileNav = document.querySelector(".mobile-nav");
const closeButton = document.querySelector(".close-button");
const modal = document.querySelector(".modal");
const form = document.querySelector(".main-calculations");

//Final values
const passagemVal = document.querySelector(".passagem-valor");
const valeRefeicaoVal = document.querySelector(".vale-refeicao-valor");
const periculosidadeVal = document.querySelector(".periculosidade-valor");
const insalubridadeVal = document.querySelector(".insalubridade-valor");
const fgtsVal = document.querySelector(".fgts-valor");
const salarioLiquidoVal = document.querySelector(".salario-liquido-valor");

proventos.value = "";
insalubridade.value = "";

//Função do modal
function toggleModal() {
  if(modal.classList.contains("hidden")) {
    modal.classList.toggle("hidden");
    document.body.style.overflowY = "hidden";
  } else {
    modal.classList.toggle("hidden");
    document.body.style.overflowY = "scroll";
  }
}

//Funções que acontecem quando a página for carregada
window.onload = function () {
  checkboxPassagem.checked = false;
  checkboxValeRefeicao.checked = false;
  form.reset();
};


mobileNav.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);

//Função para validar se o caracter é um número, backspace ou .
function validKeys(event) {
  const validKeys = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "Backspace",
    ",",
  ];

  if (!validKeys.includes(event.key)) {
    event.preventDefault();
  }
}

function numberFormatter(str) {
  let formattedNumber = str.replace(",", ".");
  return Number(formattedNumber);

}

//Função para número mínimo e máximo de dias trabalhados por mês
function diasUteisMinMax() {
  if (!(diasUteis.value > 0 && diasUteis.value < 32)) {
    diasUteis.value = "";
  }
}

//Função para calcular e retornar o valor mínimo da passagem
function calcPassagem() {
  const diasXPassagem = Number((numberFormatter(passagem.value) * diasUteis.value).toFixed(2));
  const salBrutoSeis = Number((numberFormatter(salarioBruto.value) * 0.06).toFixed(2));
  return diasXPassagem < salBrutoSeis ? diasXPassagem : salBrutoSeis;
}

//Função para calcular valor da periculosidade
function calcPericulosidade() {
  if (proventos.value === "periculosidade") {
    return Number((numberFormatter(salarioBruto.value) * 0.3).toFixed(2));
  }
  return 0;
}

//Função para calcular valor da insalubridade
function calcInsalubridade() {
  switch (insalubridade.value) {
    case "minima":
      return Number((salarioMinimoAtual * 0.1).toFixed(2));
      //break;
    case "media":
      return Number((salarioMinimoAtual * 0.2).toFixed(2));
      //break;
    case "maxima":
      return Number((salarioMinimoAtual * 0.4).toFixed(2));
      //break;
    default:
      return 0;
  }
}

//Função para calcular vale-refeição
function calcValeRefeicao() {
  return Number((numberFormatter(valeRefeicao.value) * diasUteis.value * 0.2).toFixed(2));
}

function calcFGTS() {
  return Number((numberFormatter(salarioBruto.value) * 0.08).toFixed(2));
}

//Função para calcular salário líquido
function calcSalarioLiquido() {
  return (
    numberFormatter(salarioBruto.value) -
    calcPassagem() -
    calcValeRefeicao() +
    calcInsalubridade() +
    calcPericulosidade()
  )/*.toFixed(2)*/;
}

//Função para formatar valores
function formatNumbersIntoString(number) {
  let numberIntoString = number.toFixed(2).replace(".", ",");
  let [trailingValue, value] = [numberIntoString.slice(-3), numberIntoString.slice(0, -3)];
  let numberIntoStringLength = value.length;
  let numberIntoStringArray = [...value];

  switch (numberIntoStringLength) {
    case 4:
      return numberIntoStringArray.toSpliced(1, 0, ".").toString().replaceAll(",", "") + trailingValue;
    case 5:
      return numberIntoStringArray.toSpliced(2, 0, ".").toString().replaceAll(",", "") + trailingValue;
    case 6:
      return numberIntoStringArray.toSpliced(3, 0, ".").toString().replaceAll(",", "") + trailingValue;
    default:
      return numberIntoString;
  }
}

//Função para obter valores inseridos
mainButton.addEventListener("click", function (e) {
  //Previne refresh do form
  e.preventDefault();

  if (salarioBruto.value !== "" && diasUteis.value !== "") {
    passagemVal.textContent = "-" + formatNumbersIntoString(calcPassagem());
    periculosidadeVal.textContent = "+" + formatNumbersIntoString(calcPericulosidade());
    insalubridadeVal.textContent = "+" + formatNumbersIntoString(calcInsalubridade());
    valeRefeicaoVal.textContent = "-" + formatNumbersIntoString(calcValeRefeicao());
    fgtsVal.textContent = formatNumbersIntoString(calcFGTS());
    salarioLiquidoVal.textContent = formatNumbersIntoString(calcSalarioLiquido());
  }
});

//Mostra (ou não) a janela referente a insalubridade
proventos.addEventListener("input", () => {
  console.log(proventos.value);
  if (proventos.value === "insalubridade") {
    insalubridadeWindow.classList.remove("hidden");
  } else {
    insalubridadeWindow.classList.add("hidden");
    //Gotta understand this better later
    insalubridade.selectedIndex = 0;
  }
});

//Validação nos inputs
salarioBruto.addEventListener("keydown", validKeys);
diasUteis.addEventListener("keydown", validKeys);
diasUteis.addEventListener("input", diasUteisMinMax);
passagem.addEventListener("keydown", validKeys);
valeRefeicao.addEventListener("keydown", validKeys);

checkboxPassagem.addEventListener("input", function () {
  passagem.toggleAttribute("disabled");
});

checkboxValeRefeicao.addEventListener("input", function () {
  valeRefeicao.toggleAttribute("disabled");
});


//scrollIntoView()
/*
heroButton1.addEventListener("click", function() {
  main.scrollIntoView({block: "center", behavior: "smooth"});
  console.log(1)
});

heroButton2.addEventListener("click", function () {
  accordionSection.scrollIntoView({ block: "center", behavior: "smooth" });
  console.log(1);
});
*/

//ScrollIntoView dos botões do hero
for (let i = 0; i < heroButtons.length; i++) {
  heroButtons[i].addEventListener("click", scrollIntoView);
}

//Função para scrollar até certo elemento
function scrollIntoView(e) {
    e.preventDefault(); //Keeps links from send HTTP request
    const targetId = this.getAttribute("data-target");
    //Gets the value from the HTML attribute data-target, which is the id of the element we need to scrollIntoView()
    //console.log(targetId)
    //let targetElement = document.querySelector(`#${targetId}`);
    const targetElement = document.getElementById(targetId) || document.querySelector(`${targetId}`);
    //In this context, the target element does not exist, so we need to document.querySelector it before, otherwise, it has no other way of knowing where it needs to go
    if (targetElement) {
      targetElement.scrollIntoView({ block: "center", behavior: "smooth" });
    } else {
      console.error(
        `${Error} targetElement could not be found. Target element is ${targetElement}!`
      );
    }
}



//ScrollIntoView do navlink "Sobre"
headerLinkSobre.addEventListener("click", scrollIntoView)

//Accordion
for (let i = 0; i < accordionItemHead.length; i++) {
  accordionItemHead[i].addEventListener("click", function () {
    accordionItemHead[i].classList.toggle("active");
    const accordionItemBody = accordionItemHead[i].nextElementSibling;

    if (accordionItemHead[i].classList.contains("active")) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
      console.log(accordionItemBody.scrollHeight);
    } else {
      accordionItemBody.style.maxHeight = 0;
    }
  });
}
