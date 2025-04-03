import axios from 'axios';

const API_URL = 'https://libretranslate.com/translate'; // URL pública de LibreTranslate

export const translateText = async (text, targetLanguage) => {
  try {
    const response = await axios.post(API_URL, {
      q: text,
      source: 'auto', // Detecta el idioma de origen automáticamente
      target: targetLanguage,
      format: 'text',
    });
    return response.data.translatedText;
  } catch (error) {
    console.error("Error al traducir el texto:", error);
    return null;
  }
};
