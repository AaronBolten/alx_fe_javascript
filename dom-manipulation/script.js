// quotes array
const quotes = [
  { text: "The only limit is the one you set yourself.", category: "Motivation" },
  { text: "JavaScript is fun!", category: "Programming" },
  { text: "Knowledge is power.", category: "Wisdom" }
];

// displayRandomQuote function
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById('quoteDisplay').textContent =
    `"${quote.text}" [${quote.category}]`;
}

// addQuote function
function addQuote() {
  const text = document.getElementById('newQuoteText').value.trim();
  const category = document.getElementById('newQuoteCategory').value.trim();

  if (text && category) {
    quotes.push({ text, category });
    displayRandomQuote();

    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
  } else {
    alert("Please enter both a quote and category.");
  }
}

// Event listeners
document.getElementById('newQuote').addEventListener('click', displayRandomQuote);
document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
