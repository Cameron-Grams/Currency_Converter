const BASE_URL = 'http://apilayer.net/api/convert?access_key=';

const API_KEY = 'fb3fadded8a585c425abb7d0da65f95a'; //for the currency converter API

function resetDisplay( ){
  $( '.results' ).empty();
  $( '#currencyAmount' ).val( '' );
}

function sendConvert( event ){
  resetDisplay();    
  let fromCurrency = $( '#originalCurrency' ).val();
  let toCurrency = $( '#finalCurrency' ).val();
  let convertAmount = $( '#currencyAmount' ).val();
  let sendURL = BASE_URL + API_KEY + `&from=${ fromCurrency }&to=${ toCurrency }&amount=${ convertAmount}`;

  $.getJSON( sendURL, displayConversion );
  
  console.log( 'from currency is: ', fromCurrency );
  console.log( 'to currency is: ', toCurrency );
}

function displayConversion( data ){
  console.log( data );
}



function main(){
  $( '#currencyAmount' ).focus( resetDisplay );
  $( '#calculateButton' ).bind( 'click', sendConvert );
};


$( document ).ready( main() );