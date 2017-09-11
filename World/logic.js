const CONV_BASE_URL = 'http://apilayer.net/api/live?access_key=';
const CONV_API_KEY = 'fb3fadded8a585c425abb7d0da65f95a'; //for the currency converter API

const COUNTRY_URL = 'https://restcountries.eu/rest/v2/currency/';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2FtZXJvbjQzIiwiYSI6ImNqNzF1czNnajA2dmgzM24xNGVoNmltbnQifQ.5uzTFIefwgSiHHfAjk4azg';

function resetDisplay( ){
  $( '.results' ).empty();
  $( '.flags' ).empty();
  $( '#worldMap' ).empty();
  $( '#currencyAmount' ).val( '' );
}
 
function sendConvert( event ){
  let fromCurrency = $( '#fromCurrency' ).val();
  let toCurrency = $( '#finalCurrency' ).val();
  let sendURL = CONV_BASE_URL + CONV_API_KEY + `&currencies=${ fromCurrency },${ toCurrency }&source=USD&format=1`;
  let  results = $.getJSON( sendURL, createConversion );
  if ( results.success === true ){
    console.log( results );
    return results;
  } else {
    return false;
  } 
}


function createConversion( data ){
  console.log( 'data in converstion is ', data );

  console.log( data );

  let convertAmount = $( '#currencyAmount' ).val();
  let fromCurrency = $( '#fromCurrency' ).val();
  let toCurrency = $( '#finalCurrency' ).val();
  let originKey = 'USD' + fromCurrency;
  let targetKey = 'USD' + toCurrency;
  if ( data.quotes[ targetKey ] && data.quotes[ originKey ] ){
    let targetRatio = data.quotes[ targetKey ] / data.quotes[ originKey ];
    let finalAmount = (convertAmount * targetRatio).toFixed( 2 );
    console.log( 'final amount is ', finalAmount );
    displayConversion( convertAmount, finalAmount );
    getFlag( toCurrency );
  } else if ( data.sucess != true ){
    $( '.results' ).html( "Alert 2 No new currency information available.")
  } else {
    alert( 'third error' );
  }
}


function displayConversion( convertAmount, finalAmount ){
  let fromCurrency = $( '#fromCurrency' ).val();
  let targetCurrency = $( '#finalCurrency' ).val();
  let conversionResult = `${ convertAmount } ${ fromCurrency } is equal to ${ finalAmount } ${ targetCurrency }.`;
  $( '.results' ).html(  conversionResult );
}

function getFlag( currency ){
  let country = COUNTRY_URL + currency;
  $.getJSON( country, showFlag );
}

function showFlag( data ){
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



//https://cameron-grams.github.io/Currency_Converter/