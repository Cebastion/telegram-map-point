export async function GetData(nameThor) {
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1-f7nNfVlFYfQvfOfeITs4DK4huMSXMQqi1LNaXlctHo/values/Лист1!A2:Z?key=AIzaSyBKkvIa5Pleeun5KOyTfDon4TRLUsKA6_s`);
  
  const data = await response.json();
}