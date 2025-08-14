import { clients, invoices } from './data.js';

const totalClients = document.getElementById("totalClients");
const totalInvoices = document.getElementById("totalInvoices");
const totalValue = document.getElementById("totalValue");
const paidUnpaid = document.getElementById("paidUnpaid");

if (totalClients) totalClients.textContent = clients.length;
if (totalInvoices) totalInvoices.textContent = invoices.length;
if (totalValue) totalValue.textContent = invoices.reduce((sum, inv) => sum + inv.amount, 0);
if (paidUnpaid) paidUnpaid.textContent = `${invoices.filter(i => i.paid).length}/${invoices.filter(i => !i.paid).length}`;

const quoteCard = document.getElementById("quoteCard");
async function loadQuote() {
  try {
    const res = await fetch("data/quotes.json");
    const quotes = await res.json();
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    quoteCard.innerHTML = `<blockquote>${q.text}</blockquote><p>- ${q.author || "Unknown"}</p>`;
  } catch (e) {
    quoteCard.innerHTML = "Error loading quote.";
  }
}

if (quoteCard) loadQuote();

