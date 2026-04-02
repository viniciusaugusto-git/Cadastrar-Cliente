import clientService from "./services/client.services.js";

const params = new URLSearchParams(window.location.search);
const idParam = params.get("id");

const form = document.getElementById("form-cliente");
const tableBody = document.getElementById("tabela-clientes");
const formTitle = document.getElementById("form-title");
const inputPhone = document.getElementById("phone");

if (form) {
  setupForm();
}

if (tableBody) {
  loadClients();
}

if (inputPhone) {
  applyPhoneMask(inputPhone);
}

async function setupForm() {
  if (idParam) {
    if (formTitle) formTitle.textContent = "Editar Cliente";
    await loadClient();
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const client = getClientFromForm();

    try {
      if (idParam) {
        await clientService.updateClient(idParam, client);
        alert("Cliente atualizado com sucesso!");
      } else {
        await clientService.createClient(client);
        alert("Cliente cadastrado com sucesso!");
      }

      window.location.href = "index.html";
    } catch (error) {
      alert(error.message || "Erro ao salvar cliente");
    }
  });
}

function getClientFromForm() {
  return {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim().toLowerCase(),
    phone: document.getElementById("phone").value.trim(),
  };
}

async function loadClient() {
  try {
    const client = await clientService.getClientById(idParam);
    document.getElementById("name").value = client.name || "";
    document.getElementById("email").value = client.email || "";
    document.getElementById("phone").value = client.phone || "";
  } catch (error) {
    alert(error.message || "Erro ao carregar cliente");
    window.location.href = "index.html";
  }
}

async function loadClients() {
  try {
    const clients = await clientService.getClients();
    tableBody.innerHTML = "";

    clients.forEach((client) => {
      const tr = document.createElement("tr");

      const editButton = `<button class="btn-edit" data-edit-id="${client.id}">Editar</button>`;
      const deleteButton = `<button class="btn-delete" data-delete-id="${client.id}">Excluir</button>`;

      tr.innerHTML = `
        <td>${client.id}</td>
        <td>${capitalizeText(client.name || "")}</td>
        <td>${client.email || ""}</td>
        <td>${client.phone || ""}</td>
        <td class="actions">${editButton}${deleteButton}</td>
      `;

      tableBody.appendChild(tr);
    });

    bindTableActions();
  } catch (error) {
    alert(error.message || "Erro ao carregar clientes");
  }
}

function bindTableActions() {
  document.querySelectorAll("[data-edit-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-edit-id");
      window.location.href = `form.html?id=${id}`;
    });
  });

  document.querySelectorAll("[data-delete-id]").forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.getAttribute("data-delete-id");
      const confirmed = window.confirm("Deseja realmente excluir este cliente?");
      if (!confirmed) return;

      try {
        await clientService.deleteClient(id);
        await loadClients();
      } catch (error) {
        alert(error.message || "Erro ao excluir cliente");
      }
    });
  });
}

function capitalizeText(text) {
  return text
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function applyPhoneMask(input) {
  input.addEventListener("input", (event) => {
    let value = event.target.value.replace(/\D/g, "").slice(0, 11);

    if (value.length > 6) {
      value = value.replace(/(\d{2})(\d{5})(\d+)/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d+)/, "($1) $2");
    } else {
      value = value.replace(/(\d*)/, "($1");
    }

    event.target.value = value;
  });
}
