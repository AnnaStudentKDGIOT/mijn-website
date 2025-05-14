async function translateText(text, sourceLang, targetLang) {
  const response = await fetch('https://translate.argosopentech.com/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: text,
      source: sourceLang ==="nl",
      target: ["en","nl","de","es","it","fr"],
    }),
  });

  

  const data = await response.json();
  return data.translatedText;
}

const textElement = document.getElementById("text");
const selectElement = document.getElementById("language");

// Originele tekst bewaren
const originalText = textElement.textContent;

selectElement.addEventListener("change", async () => {
  const targetLang = selectElement.value;

  // Als Nederlands gekozen is, toon originele tekst
  if (targetLang === "nl") {
    textElement.textContent = originalText;
    return;
  }

  try {
    const translatedText = await translateText(originalText, 'nl', targetLang);
    textElement.textContent = translatedText;
  } catch (error) {
    textElement.textContent = "❌ Er is iets mis gegaan tijdens het vertalen.";
    console.error(error);
  }
});
