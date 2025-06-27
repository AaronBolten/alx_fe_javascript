const quotes = [
  { text: "The only limit is you.", category: "Motivation" },
  { text: "Dream big and dare to fail.", category: "Inspiration" },
  { text: "Success is not final, failure is not fatal.", category: "Wisdom" }
];

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById("quoteDisplay").innerHTML =
    `<p>"${quote.text}"</p><p><em>${quote.category}</em></p>`;
}

function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  if (textInput && categoryInput && textInput.value && categoryInput.value) {
    quotes.push({ text: textInput.value, category: categoryInput.value });
    alert("Quote added successfully!");
    textInput.value = "";
    categoryInput.value = "";
  } else {
    alert("Please fill out both fields!");
  }
}

function createAddQuoteForm() {
  const formDiv = document.createElement("div");

  const textInput = document.createElement("input");
  textInput.id = "newQuoteText";
  textInput.type = "text";
  textInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.onclick = addQuote;

  formDiv.appendChild(textInput);
  formDiv.appendChild(categoryInput);
  formDiv.appendChild(addButton);

  document.body.appendChild(formDiv);
}

// Attach event listener for random quote button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Call this so the form is dynamically created
createAddQuoteForm();
