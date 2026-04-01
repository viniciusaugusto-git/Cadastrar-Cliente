// ===== BANCO (localStorage) =====
/** Retorna a lista de clientes do localStorage */
function getClients() {
  return JSON.parse(localStorage.getItem("clients")) || [];
}

/**
 * Salva a lista de clientes no localStorage, sobrescrevendo a anterior
 * @param {any} clients - Lista de clientes a ser salva
 */
function salvarClients(clients) {
  localStorage.setItem("clients", JSON.stringify(clients));
}

// ===== CADASTRAR =====
const form = document.getElementById("form-cliente");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const client = {
      name: document.getElementById("name").value.toLowerCase().trim(),
      email: document.getElementById("email").value.toLowerCase().trim(),
      phone: document.getElementById("phone").value.trim(),
    };

    const clients = getClients();
    if (clients.find(c => c.email === client.email)) {
      alert("Cliente com este email já existe!");
      return;
    }

    clients.push(client);
    salvarClients(clients);

    alert("Cliente cadastrado!");
    window.location.href = "index.html";
  });
}

// ===== LISTAR =====
const tabela = document.getElementById("tabela-clientes");

if (tabela) {
  const clients = getClients();

  clients.forEach(client => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${clients.findIndex(c => c === client) + 1}</td>
      <td>${capitalizeText(client.name)}</td>
      <td>${client.email}</td>
      <td>${client.phone}</td>
    `;

    tabela.appendChild(tr);
  });
}

// FUNÇÕES AUXILIARES
/** Máscara de phone (apenas números, formato (XX) XXXXX-XXXX) */
const inputPhone = document.getElementById("phone");

if (inputPhone) {
  inputPhone.addEventListener("input", (e) => {
    let value = e.target.value;

    // remove tudo que não for número
    value = value.replace(/\D/g, "");

    // aplica máscara
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 6) {
      value = value.replace(/(\d{2})(\d{5})(\d+)/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d+)/, "($1) $2");
    } else {
      value = value.replace(/(\d*)/, "($1");
    }

    e.target.value = value;
  });
}

/**
 * Capitaliza um texto, deixando a primeira letra de cada palavra em maiúscula e o restante em minúscula
 * @param {string} text - Texto que será capitalizado
 * @returns {string} Retorna o texto capitalizado
 */
function capitalizeText(text) {
  return text
    .toLowerCase()
    .split(" ")
    .map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}