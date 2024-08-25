async function GetData(setPoints) {
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1Rlr10HjW4YsbQLneYOOpoC51MZoDESMm4EaLx-JdFzw/values/Points!A2:Z?key=AIzaSyBKkvIa5Pleeun5KOyTfDon4TRLUsKA6_s`)

  const data = await response.json()


  const objects = data.values.map(item => {
    const [latitude, longitude] = item[2].split(',').map(coord => parseFloat(coord.trim()));
    return {
        name: item[0],
        description: item[1],
        coordinates: { latitude, longitude },
        LinkImg: item[3].trim(),
        LinkTravel: item[4],
        Hashtag: item[5].trim()
    };
});

  console.log(objects)


  setPoints(objects)
}

export { GetData }
