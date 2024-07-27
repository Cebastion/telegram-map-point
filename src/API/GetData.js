const extractData = (str) => {
  // Регулярное выражение для извлечения координат
  const coordsPattern = /([\d.]+),\s*([\d.]+)/;
  const coordsMatch = str.match(coordsPattern);

  // Регулярное выражение для извлечения ссылки
  const linkPattern = /https:\/\/[^\s]+/;
  const linkMatch = str.match(linkPattern);

  // Регулярное выражение для извлечения тегов
  const tagsPattern = /#\w+/g;
  const tagsMatch = str.match(tagsPattern);

  // Извлечение описания
  const descriptionPattern = /(.*?)(?=\d+\.\d+,\s*\d+\.\d+|https:\/\/|#|$)/;
  const descriptionMatch = str.match(descriptionPattern);

  return {
    coordinates: coordsMatch ? { latitude: parseFloat(coordsMatch[1]), longitude: parseFloat(coordsMatch[2]) } : null,
    link: linkMatch ? linkMatch[0] : null,
    tags: tagsMatch ? tagsMatch : [],
    description: descriptionMatch ? descriptionMatch[0].trim() : ""
  };
};

async function GetData(setPoints) {
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1YS_qfBCEdsNx8_FnVWPf9gEsk2bKLrGWzC0rQSUP0_U/values/Sheet1!A1:Z?key=AIzaSyBKkvIa5Pleeun5KOyTfDon4TRLUsKA6_s`);
  
  const data = await response.json();

  console.log(data)

  const points = data.values
    .map(row => row.map(extractData)) // Применяем extractData к каждому элементу в каждом массиве
    .flat() // Объединяем все массивы в один
    .filter(point => point !== null); // Фильтруем null значения

    console.log(points)

  setPoints(points);
}

export { GetData }
