const supportedLanguages = ['en', 'fr', 'es', 'de', 'ru', 'zh'];
let translations = [];


async function loadLanguageFile(language) {
  return fetch(`/translation/${language}.json`)
    .then(response => response.json())
    .then(data => {
      // Save the loaded translations in a variable or global object
      translations = data;
      console.log(translations);

    })
    .catch(error => console.error(`Error loading language file: ${error}`));
}

function translate(key) {
  return translations[key] || key;
}

function updateUIWithTranslations() {
  // Get all elements with a 'data-translate' attribute
  const elementsToTranslate = document.querySelectorAll('[data-translate]');

  // Update each element with translated text
  elementsToTranslate.forEach(element => {
    const key = element.getAttribute('data-translate');
    console.log(element.nodeName)
    if (element.nodeName == "INPUT") element.placeholder = translate(key)
    else element.innerText = translate(key);
  });
}

function isLanguageSupported(language) {
  return supportedLanguages.includes(language);
}

loadLanguageFile(navigator.language.split('-')[0]).then(()=>{
  updateUIWithTranslations();
})

// TODO: REPLACE "AUTO" WITH "AUTOMATIC"
// TODO: BETTER TRANSLATION FOR "SETUP"