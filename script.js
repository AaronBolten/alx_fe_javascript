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
  const newQuoteText = document.getElementById('newQuoteText').value.trim();
  const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    displayRandomQuote();

    // Clear input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
  } else {
    alert("Please enter both quote and category.");
  }
}

// Event listener for "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', displayRandomQuote);
