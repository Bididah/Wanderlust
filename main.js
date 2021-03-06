
// Foursquare API Info
console.log("haza")
const clientId = 'E1HXNVIENZHEIHXXLLSDL3DHLHCSPSDS5ZNAPNNZJYSSMN3X';
const clientSecret = 'MU1XFB24LILVWHUHB203HS0SBPQBOZOBVLOITQOYRS12S353';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = 'aa2d06b7b28dcf4e1a546a717bbdcc04';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
 const getVenues = async () => {
  const city = $input.val();
  
  const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20210704`
   try {
     const respose = await fetch(urlToFetch)
     if (respose.ok) {
      const jsonResponse = await respose.json()
      let venues = (jsonResponse.response.groups[0].items).map(e => e.venue)
      console.log(venues)
      return venues ; 
    }
   } catch (error) {
     console.log(error)
   }
 }

const getForecast = async () => {
  const city = $input.val()
  const  urlToFetch =   `${weatherUrl}?&q=${city}&APPID=${openWeatherKey}`
  try {
    const response = await fetch(urlToFetch)
    if (response.ok) {
      const jsonResponse = await response.json()
      console.log(jsonResponse)
      return jsonResponse
    }
  } catch (error) {
    console.log(error)
  }
}


// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
    const venue = venues[index]
    const venueIcon = venue.categories[0].icon
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`

    let venueContent = createVenueHTML(venue.name,venue.location,venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
  // Add your code here:
  
	let weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
}

const executeSearch = () => {
  $venueDivs.forEach(v => v.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(respons => renderVenues(respons))
  getForecast().then(response => renderForecast(response))
  return false;
}

$submit.click(executeSearch)