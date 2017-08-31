const API_KEY = 'fb3fadded8a585c425abb7d0da65f95a'; //for the currency converter API









function resetDisplay( ){
  $( '.results' ).empty();
  $( '#currencyAmount' ).val( '' );
}

function sendConvert( event ){
  resetDisplay();    
  let fromCurrency = $( '#originalCurrency' ).val();
  let toCurrency = $( '#finalCurrency' ).val();
  console.log( 'from currency is: ', fromCurrency );
  console.log( 'to currency is: ', toCurrency );
}


function main(){
  $( '#currencyAmount' ).focus( resetDisplay );
  $( '#calculateButton' ).bind( 'click', sendConvert );
};


$( document ).ready( main() );