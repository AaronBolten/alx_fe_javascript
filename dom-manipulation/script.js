let quotes = [];

/**
 * Load quotes from local storage
 */
function loadQuotes() {
  const stored = localStorage.getItem("quotes");
  if (stored) {
    quotes = JSON.parse(stored);
  } else {
    quotes = [
      { text: "The only limit is you.", category: "Motivation" },
      { text: "Dream big and dare to fail.", category: "Inspiration" }
    ];
    saveQuotes();
  }
}

/**
 * Save quotes to local storage
 */
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

/**
 * Populate categories dropdown
 */
function populateCategories() {
  const select = document.getElementById("categoryFilter");
  // remove old categories
  while (select.options.length > 1) {
    select.remove(1);
  }
  const categories = [...new Set(quotes.map(q => q.category))];
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });

  const last = localStorage.getItem("lastFilter");
  if (last) {
    select.value = last;
    filterQuotes();
  }
}

/**
 * Show a random quote
 */
function showRandomQuote() {
  filterQuotes();
}

function filterQuotes() {
  const filter = document.getElementById("categoryFilter").value;
  localStorage.setItem("lastFilter", filter);

  let list = quotes;
  if (filter !== "all") {
    list = list.filter(q => q.category === filter);
  }

  if (list.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = "<p>No quotes in this category.</p>";
    return;
  }

  const random = list[Math.floor(Math.random() * list.length)];
  document.getElementById("quoteDisplay").innerHTML = `
    <p>"${random.text}"</p>
    <p><em>${random.category}</em></p>
  `;

  sessionStorage.setItem("lastViewedQuote", JSON.stringify(random));
}

function addQuote() {
  const text = document.getElementById("newQuoteText").value;
  const cat = document.getElementById("newQuoteCategory").value;
  if (text && cat) {
    const newQuote = { text, category: cat };
    quotes.push(newQuote);
    saveQuotes();
    populateCategories();
    alert("Quote added!");
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    // Post to server (mock)
    postQuoteToServer(newQuote);
  } else {
    alert("Fill in all fields.");
  }
}

function createAddQuoteForm() {
  const div = document.createElement("div");
  div.innerHTML = `
    <input id="newQuoteText" type="text" placeholder="Enter a new quote">
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category">
    <button onclick="addQuote()">Add Quote</button>
  `;
  document.body.appendChild(div);
}

/**
 * Export to JSON
 */
function exportToJsonFile() {
  const data = JSON.stringify(quotes, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Import from JSON
 */
function importFromJsonFile(event) {
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const imported = JSON.parse(e.target.result);
      quotes.push(...imported);
      saveQuotes();
      populateCategories();
      alert("Quotes imported!");
    } catch (err) {
      alert("Invalid JSON file.");
    }
  };
  reader.readAsText(event.target.files[0]);
}

/**
 * Fetch quotes from server
 */
async function fetchQuotesFromServer() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();

  // transform into our quote format
  const fetchedQuotes = data.slice(0, 5).map(post => ({
    text: post.title,
    category: "ServerSync"
  }));
  return fetchedQuotes;
}

/**
 * Post a quote to server (mock simulation)
 */
async function postQuoteToServer(quote) {
  await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: quote.text,
      body: quote.category,
      userId: 1
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  });
  console.log("Quote posted to server (mock)");
}

/**
 * Synchronize local quotes with server quotes
 */
async function syncQuotes() {
  try {
    const serverQuotes = await fetchQuotesFromServer();
    // Conflict resolution: server wins
    quotes = serverQuotes;
    saveQuotes();
    populateCategories();
    filterQuotes();

    document.getElementById("syncMessage").textContent = "Synced with server. Local data replaced.";
  } catch (error) {
    console.error("Sync failed:", error);
    document.getElementById("syncMessage").textContent = "Sync failed.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadQuotes();
  createAddQuoteForm();
  populateCategories();

  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  document.getElementById("syncQuotesBtn").addEventListener("click", syncQuotes);

  const lastViewed = sessionStorage.getItem("lastViewedQuote");
  if (lastViewed) {
    const q = JSON.parse(lastViewed);
    document.getElementById("quoteDisplay").innerHTML = `
      <p>"${q.text}"</p>
      <p><em>${q.category}</em></p>
    `;
  }

  // Periodic sync every 30 seconds
  setInterval(syncQuotes, 30000);
});

