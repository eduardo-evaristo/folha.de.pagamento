//Elements we'll work with
const salarioBruto = document.getElementById("salario-bruto");
const diasUteis = document.getElementById("dias-uteis");
const passagem = document.getElementById("passagem");
const valeAlimentacao = document.getElementById("vale-alimentacao");
const proventos = document.getElementById("proventos");
const insalubridadeWindow = document.querySelector(".insalubridade");
const insalubridade = document.getElementById("insalubridade");
const mainButton = document.querySelector(".main-button");

//Mostra (ou não) a janela referente a insalubridade
proventos.addEventListener("input", () => {
  console.log(proventos.value);
  if (proventos.value === "insalubridade") {
    insalubridadeWindow.classList.remove("hidden");
  } else {
    insalubridadeWindow.classList.add("hidden");
  }
});

mainButton.addEventListener("click", () => {
    console.log(salarioBruto.value, diasUteis.value, passagem.value, valeAlimentacao.value, proventos.value, insalubridade.value)
});
