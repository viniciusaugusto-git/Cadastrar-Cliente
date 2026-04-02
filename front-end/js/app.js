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
    } catch {
      alert("Erro ao salvar cliente");
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
      <div class="actions">
        <button class="btn-edit" onclick="window.location.href='form.html?id=${client.id}'">
          Editar
        </button>
        <button class="btn-delete" onclick="deleteClient(${client.id})">
          Excluir
        </button>
      </div>
    `;

    tabela.appendChild(tr);
  });
}

// ===== DELETE =====
window.deleteClient = async function (id) {
  if (!confirm("Tem certeza?")) return;

  await serviceClient.deleteClient(id);
  window.location.reload();
};

// ===== UTIL =====
function capitalizeText(text) {
  return text
    .toLowerCase()
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}