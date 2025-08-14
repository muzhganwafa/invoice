import { clients, saveClients } from './data.js';
import { generateId } from './utils.js';

const form = document.getElementById("clientForm");
const table = document.getElementById("clientsTable");

function renderClients() {
  table.innerHTML = `<tr><th>Name</th><th>Email</th><th>Company</th><th>Notes</th><th>Actions</th></tr>`;
  clients.forEach(client => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${client.name}</td>
      <td>${client.email}</td>
      <td>${client.company}</td>
      <td>${client.notes}</td>
      <td><button onclick="deleteClient(${client.id})">Delete</button></td>
    `;
    table.appendChild(row);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const client = {
    id: generateId(),
    name: form.name.value,
    email: form.email.value,
    company: form.company.value,
    notes: form.notes.value
  };
  clients.push(client);
  saveClients();
  renderClients();
  form.reset();
});

window.deleteClient = id => {
  const index = clients.findIndex(c => c.id === id);
  if (index !== -1) {
    clients.splice(index, 1);
    saveClients();
    renderClients();
  }
};

renderClients();
