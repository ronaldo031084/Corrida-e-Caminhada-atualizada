function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let soma = 0, resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;
  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf[10]);
}

document.getElementById("inscricaoForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const nascimento = document.getElementById("nascimento").value;
  const cpf = document.getElementById("cpf").value;
  const atividade = document.getElementById("atividade").value;
  const camiseta = document.getElementById("camiseta").value;
  const erro = document.getElementById("erro");

  if (!validarCPF(cpf)) {
    erro.textContent = "CPF inválido.";
    return;
  }

  erro.textContent = "";
  const data = new Date();
  const codigo = "DRM-" + data.toISOString().slice(0, 10).replace(/-/g, "") + "-" + Math.floor(Math.random() * 1000);
  localStorage.setItem("inscricao-" + cpf, JSON.stringify({ nome, nascimento, cpf, atividade, camiseta, codigo }));
  document.getElementById("inscricaoForm").classList.add("hidden");
  document.getElementById("confirmacao").classList.remove("hidden");
  document.getElementById("codigo").innerHTML = "<strong>Código de inscrição: </strong>" + codigo;
});
