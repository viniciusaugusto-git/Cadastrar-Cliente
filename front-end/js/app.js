// ===== BANCO (localStorage) =====
/** Retorna a lista de clientes do localStorage */
function getClients() {
  return JSON.parse(localStorage.getItem("clients")) || [];
}

/**
 * Salva a lista de clientes no localStorage, sobrescrevendo a anterior
 * @param {any} clients - Lista de clientes a ser salva
 */
function saveClients(clients) {
  localStorage.setItem("clients", JSON.stringify(clients));
}

/**
 * Deleta um cliente do localStorage com base no id, que é o identificador único
 * @param {number} id - id do cliente a ser deletado
 */
function deleteClient(id) {
  const clients = getClients();
  const updatedClients = clients.filter(client => client.id !== id);
  saveClients(updatedClients);
  alert("Cliente excluído!");
  window.location.reload();
}

/**
 * Edita um cliente do localStorage com base no id, que é o identificador único
 * @param {number} id - id do cliente a ser editado
 * @param {object} updatedClient - objeto com os dados atualizados do cliente
 */
function editClient(id, updatedClient) {
  const clients = getClients();

  const index = clients.findIndex(client => client.id === id);

  if (index === -1) {
    alert("Cliente não encontrado!");
    return;
  }

  clients[index] = { id, ...clients[index], ...updatedClient };
  console.log(clients[index]);

  saveClients(clients);

  alert("Cliente atualizado!");
  window.location.href = "index.html";
}

const params = new URLSearchParams(window.location.search);
const idParam = Number(params.get("id"));

// ===== CADASTRAR =====
const form = document.getElementById("form-cliente");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const client = {
      id: Date.now(),
      name: document.getElementById("name").value.toLowerCase().trim(),
      email: document.getElementById("email").value.toLowerCase().trim(),
      phone: document.getElementById("phone").value.trim(),
    };

    const clients = getClients();

    if (idParam) {
      console.log("Editando cliente com id:", idParam);
      editClient(idParam, client);
      return;
    }

    if (clients.find(c => c.email === client.email && c.id !== idParam)) {
      alert("Já existe um cliente com esse email!");
      return;
    }

    clients.push(client);
    saveClients(clients);

    alert("Cliente cadastrado!");
    window.location.href = "index.html";
  });
}

// ===== CARREGAR CLIENTE PARA EDIÇÃO NO FORMULÁRIO =====
if (idParam && form) {
  const clients = getClients();
  const client = clients.find(c => c.id === idParam);

  if (client) {
    document.getElementById("name").value = client.name;
    document.getElementById("email").value = client.email;
    document.getElementById("phone").value = client.phone;
  }
}

// ===== LISTAR =====
const tabela = document.getElementById("tabela-clientes");

if (tabela) {
  const clients = getClients();

  clients.forEach((client, i) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${capitalizeText(client.name)}</td>
      <td>${client.email}</td>
      <td>${client.phone}</td>
      <td>
      <div class="actions">
        <button class="btn-edit" onclick="window.location.href='form.html?id=${client.id}'">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon icon-edit">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
          Editar
        </button>
        <button class="btn-delete" onclick="deleteClient(${client.id})">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon icon-delete">
          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
          Excluir
        </button>
      </div>
      </td>
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