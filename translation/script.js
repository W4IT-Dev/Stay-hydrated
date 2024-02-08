// var supportedLanguages = ['en', 'fr', 'es', 'de', 'ru', 'zh', 'ar', 'uk'];
const supportedLanguages = ['ar','de','en','es','fr','lb','pt','ru','uk','zh']
var translations = {};

function loadLanguageFile(language) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/translation/' + language + '.json', true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            translations = JSON.parse(xhr.responseText);
            console.log(translations);
            if (language === "ar") document.body.style.direction = "rtl";
            else document.body.style.direction = "ltr";
            resolve();
          } catch (error) {
            reject('Error parsing language file: ' + error);
          }
        } else {
          reject('Error loading language file: ' + xhr.statusText);
        }
      }
    };
    xhr.send();
  });
}

function translate(key) {
  return translations[key] || key;
}

function updateUIWithTranslations() {
  var elementsToTranslate = document.querySelectorAll('[data-translate]');

  // Convert NodeList to array for compatibility with older browsers
  var elementsArray = Array.prototype.slice.call(elementsToTranslate);

  elementsArray.forEach(function(element) {
    var key = element.getAttribute('data-translate');

    if (element.nodeName === "INPUT") {
      element.placeholder = translate(key);
    } else {
      element.innerText = translate(key);
    }
  });
}


function isLanguageSupported(language) {
  return supportedLanguages.includes(language);
}

var userLanguage = navigator.language || navigator.userLanguage; // For older Firefox versions
var languageCode = userLanguage.split('-')[0];

if (isLanguageSupported(languageCode)) {
  loadLanguageFile(languageCode).then(function() {
    updateUIWithTranslations();
  }).catch(function(error) {
    console.error(error);
  });
} else {
  console.error('Unsupported language: ' + languageCode);
} 


loadLanguageFile('en'||languageCode).then(function() {
  updateUIWithTranslations();
}).catch(function(error) {
  console.error(error);
});


// TODO: REPLACE "AUTO" WITH "AUTOMATIC" ✔
// TODO: BETTER TRANSLATION FOR "SETUP", ⚠ @CUP SIYE@✔
// TODO: Add new translations for: Select time, Wake up, Sleep