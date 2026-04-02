import serviceClient from "./services/client.services.js";

const params = new URLSearchParams(window.location.search);
const idParam = params.get("id");

const form = document.getElementById("form-cliente");
const tabela = document.getElementById("tabela-clientes");

// ===== SUBMIT =====
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const client = {
      name: document.getElementById("name").value.toLowerCase().trim(),
      email: document.getElementById("email").value.toLowerCase().trim(),
      phone: document.getElementById("phone").value.trim(),
    };

    try {
      if (idParam) {
        await serviceClient.updateClient(idParam, client);
        alert("Cliente atualizado!");
      } else {
        await serviceClient.createClient(client);
        alert("Cliente cadastrado!");
      }

      window.location.href = "index.html";
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
      const errorMessage = error && error.message ? ` Detalhes: ${error.message}` : "";
      alert("Erro ao salvar cliente." + errorMessage);
    }
  });
}

// ===== EDITAR =====
if (idParam && form) {
  loadClient();
}

async function loadClient() {
  const client = await serviceClient.getClientById(idParam);

  document.getElementById("name").value = client.name;
  document.getElementById("email").value = client.email;
  document.getElementById("phone").value = client.phone;
}

// ===== LISTAR =====
if (tabela) {
  loadClients();
}

async function loadClients() {
  const clients = await serviceClient.getClients();

  tabela.innerHTML = "";

  clients.forEach((client, i) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${client.id}</td>
      <td>${capitalizeText(client.name)}</td>
      <td>${client.email}</td>
      <td>${client.phone}</td>
      <td class="actions">
        <button class="btn-edit" onclick="window.location.href='form.html?id=${client.id}'">
          Editar
        </button>
        <button class="btn-delete" onclick="deleteClient(${client.id})">
          Excluir
        </button>
      </td>
    `;

    tabela.appendChild(tr);
  });
}

// ===== DELETE =====
window.deleteClient = async function (id) {
  try {
    await serviceClient.deleteClient(id);
    window.location.reload();
  } catch {
    alert("Erro ao excluir cliente");
  }
};

// ===== UTIL =====
/**
 * Capitaliza um texto, deixando a primeira letra de cada palavra em maiúscula e o restante em minúscula
 * @param {string} text - Texto que será capitalizado
 * @returns {string} Retorna o texto capitalizado
 */
function capitalizeText(text) {
  return text
    .toLowerCase()
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// ===== MÁSCARA DE TELEFONE =====
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