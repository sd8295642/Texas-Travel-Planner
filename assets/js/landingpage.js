async function getMinMaxTemp(location){
  const options = {method: 'GET', headers: {accept: 'application/json'}};

const response = await fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${location}&apikey=3nR47HQePe2j53Ijj4suJEUVicSAPSp7`, options)
    // alternate api keys: rhJyv4LoiHg6oPHSEP9vvI1YYzNsO1UR     RK9czsXOwrhgSXWaoUDkK3i1StfMrJru      3nR47HQePe2j53Ijj4suJEUVicSAPSp7
    const data = await response.json()

    console.log(data)
    let min = data.timelines.daily[0].values.temperatureMin
    let max = data.timelines.daily[0].values.temperatureMax

    min = celcToFahr(min)
    max = celcToFahr(max)

    console.log(min, max)
    return {min, max}
}

function celcToFahr( n ) {
  return ((n * 9.0 / 5.0) + 32.0);
}

async function displayMinMaxTemp(min, max) {
  const htmlTempArray = document.querySelectorAll('.temp-display')
  
  console.log(htmlTempArray)
  for (let i = 0; i < htmlTempArray.length; i++) {
    const location = htmlTempArray[i].dataset.location
    console.log(location)
    const data = await getMinMaxTemp(location);
    console.log(data)

    const temperatureDisplay = `
    <p class="temperature">Current Temperature Range: ${Math.ceil(data.min)} to ${Math.ceil(data.max)}</p>
    `;
    htmlTempArray[i].innerHTML = temperatureDisplay
    
  }
}

displayMinMaxTemp();


