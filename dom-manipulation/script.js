// Create array of quotes
const quotes = [
  { text: "The only limit is you.", category: "Motivation" },
  { text: "Dream big and dare to fail.", category: "Inspiration" },
  { text: "Success is not final, failure is not fatal.", category: "Wisdom" }
];

// Function to show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  document.getElementById("quoteDisplay").innerHTML =
    `<p>"${quote.text}"</p><p><em>${quote.category}</em></p>`;
}

// Function to add a new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText").value;
  const categoryInput = document.getElementById("newQuoteCategory").value;

  if (textInput && categoryInput) {
    quotes.push({ text: textInput, category: categoryInput });
    alert("Quote added successfully!");
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please fill out both fields!");
  }
}

// Event listener for button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
