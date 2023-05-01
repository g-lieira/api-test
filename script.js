fetch('https://api.adviceslip.com/advice')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na solicitação da API.');
    }
    return response.json();
  })
  .then(data => {

    const translationEndpoint = 'https://api.mymemory.translated.net/get';
    const sourceText = data.slip.advice;
    const sourceLang = 'en';
    const targetLang = 'pt';

    const translationRequest = `${translationEndpoint}?q=${sourceText}&langpair=${sourceLang}|${targetLang}`;
    fetch(translationRequest)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na solicitação da API de tradução.');
      }
      return response.json();
    }).then(data => {
        const translation = data.responseData.translatedText;
        const translatedTextElement = document.getElementById('translated-text');
        translatedTextElement.innerText = translation;
      })
  })
  .catch(error => {
    console.error(error);
  });


  

  
    