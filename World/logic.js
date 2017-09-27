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
    return results;
  } else {
    return false;
  } 
}

 
function createConversion( data ){
  let convertAmount = $( '#currencyAmount' ).val();
  let fromCurrency = $( '#fromCurrency' ).val();
  let toCurrency = $( '#finalCurrency' ).val();
  let originKey = 'USD' + fromCurrency;
  let targetKey = 'USD' + toCurrency;
  if ( data.quotes[ targetKey ] && data.quotes[ originKey ] ){
    let targetRatio = data.quotes[ targetKey ] / data.quotes[ originKey ];
    let finalAmount = (convertAmount * targetRatio).toFixed( 2 );
    displayConversion( convertAmount, finalAmount );
    getFlags( fromCurrency, toCurrency );
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

function getFlags( fromCurrency, toCurrency ){
  var fromFlag, toFlag;

  function getFromFlag( data ){
    console.log( data[ 0 ].flag );
    fromFlag = data[ 0 ][ 'flag' ];
    let fromFlagOnDom = `<img class="fromFlag" src=${ fromFlag } >`;
    $( '.flags' ).append( fromFlagOnDom );
  }

  function getToFlag( data ){
    console.log( data[ 0 ].flag );
    toFlag = data[ 0 ][ 'flag' ];
    let toFlagOnDom = `<img class="toFlag" src=${ toFlag } >`;
    $( '.flags' ).append( toFlagOnDom );
  }

  console.log( 'outside from flag: ', fromFlag );
  console.log( 'outside to flag: ', toFlag );
  let fromCountry = COUNTRY_URL + fromCurrency;
  let toCountry = COUNTRY_URL + toCurrency;

  $.getJSON( fromCountry, getFromFlag );
  $.getJSON( toCountry, getToFlag );

  $.getJSON( toCountry, buildMap ); //heavy to call the API twice for data...
}
//buuild a flagURL function, then build the show flags with the right URL and Ids for to and from...

function buildMap( data ){
  let location = data[ 0 ].latlng;
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