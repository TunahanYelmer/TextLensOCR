const spell = require('spell-checker');

// Load dictionary
spell.load('en');

function correctErrors(text) {
  // Check the text
  const check = spell.check(text);

  // For each error found
  for (let i = 0; i < check.length; i++) {
    // Get suggestions for the incorrect word
    const suggestions = spell.suggest(check[i]);

    // If there are any suggestions
    if (suggestions.length > 0) {
      // Replace the incorrect word with the first suggestion
      text = text.replace(check[i], suggestions[0]);
    }
  }

  return text;
}

module.exports = correctErrors;