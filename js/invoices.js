import { invoices, clients, saveInvoices } from './data.js';
import { generateId } from './utils.js';

const form = document.getElementById("invoiceForm");
const table = document.getElementById("invoicesTable");
const clientSelect = document.getElementById("clientSelect");

clients.forEach(c => {
  const option = document.createElement("option");
  option.value = c.id;
  option.textContent = c.name;
  clientSelect.appendChild(option);
});

function renderInvoices() {
  table.innerHTML = `<tr><th>Client</th><th>Service</th><th>Description</th><th>Amount</th><th>Date</th><th>Paid</th></tr>`;
  invoices.forEach(inv => {
    const client = clients.find(c => c.id === parseInt(inv.clientId));
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${client ? client.name : 'Unknown'}</td>
      <td>${inv.service}</td>
      <td>${inv.description}</td>
      <td>${inv.amount}</td>
      <td>${inv.date}</td>
      <td>${inv.paid ? 'Yes' : 'No'} <button onclick="markAsPaid(${inv.id})">Mark Paid</button></td>
    `;
    table.appendChild(row);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const invoice = {
    id: generateId(),
    clientId: form.clientSelect.value,
    service: form.service.value,
    description: form.description.value,
    amount: parseFloat(form.amount.value),
    date: form.date.value,
    paid: false
  };
  invoices.push(invoice);
  saveInvoices();
  renderInvoices();
  form.reset();
});

window.markAsPaid = id => {
  const invoice = invoices.find(i => i.id === id);
  if (invoice) {
    invoice.paid = true;
    saveInvoices();
    renderInvoices();
  }
};

renderInvoices();