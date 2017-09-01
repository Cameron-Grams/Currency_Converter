const CONV_BASE_URL = 'http://apilayer.net/api/live?access_key=';
const CONV_API_KEY = 'fb3fadded8a585c425abb7d0da65f95a'; //for the currency converter API

const COUNTRY_URL = 'https://restcountries.eu/rest/v2/currency/';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2FtZXJvbjQzIiwiYSI6ImNqNzF1czNnajA2dmgzM24xNGVoNmltbnQifQ.5uzTFIefwgSiHHfAjk4azg';

function resetDisplay( ){
  $( '.results' ).empty();
  $( '.flags' ).empty();
  $( '.worldMap' ).empty();
  $( '#currencyAmount' ).val( '' );
}

function sendConvert( event ){
  let toCurrency = $( '#finalCurrency' ).val();
  let sendURL = CONV_BASE_URL + CONV_API_KEY + `&currencies=${ toCurrency }&source=USD&format=1`;
  $.getJSON( sendURL, createConversion );
}

function createConversion( data ){
  let convertAmount = $( '#currencyAmount' ).val();
  let toCurrency = $( '#finalCurrency' ).val();
  let targetKey = 'USD' + toCurrency;
  let targetRatio = data.quotes[ targetKey ];
  let finalAmount = convertAmount * targetRatio;
  displayConversion( convertAmount, finalAmount );
  getFlag( toCurrency );
}

function displayConversion( convertAmount, finalAmount ){
  let targetCurrency = $( '#finalCurrency' ).val();
  let conversionResult = `$ ${ convertAmount } US Dollars is equal to ${ finalAmount } ${ targetCurrency }.`;
  $( '.results' ).html(  conversionResult );
}

function getFlag( currency ){
  let country = COUNTRY_URL + currency;
  $.getJSON( country, showFlag );
}

function showFlag( data ){
  console.log( data );
  let flag = data[ 0 ].flag;
  let location = data[ 0 ].latlng;
  let flagOnDOM = `<img src=${ flag }>`;
  let locationStub = `Located at ${ location }`;
  $( '.flags' ).html( flagOnDOM );
  worldMap( location );
}

function worldMap( location ){
  const theLocation = [ location[ 1 ], location[ 0 ] ];
  const map = new mapboxgl.Map({
    container: 'worldMap',
    style: 'mapbox://styles/mapbox/light-v9',
    center: theLocation,
    zoom: 0
  });

  var el = document.createElement('div');
  el.id = 'marker';
  
  // create the marker
  new mapboxgl.Marker(el, {offset:[-0, -0]})
      .setLngLat( theLocation )
      .addTo(map);

}

function main(){
  $( '#currencyAmount' ).focus( resetDisplay );
  $( '#calculateButton' ).bind( 'click', sendConvert );
};


$( document ).ready( main() );