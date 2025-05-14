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

      // API-call naar LibreTranslate
      try {
        const response = await fetch("https://libretranslate.de/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            q: originalText,
            source: "nl",
            target: targetLang,
            format: "text"
          })
        });

        const data = await response.json();
        textElement.textContent = data.translatedText;
      } catch (error) {
        textElement.textContent = "❌ Fout bij vertalen.";
        console.error(error);
      }
    });