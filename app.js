const express = require( 'express' );

const app = express();

app.use( express.static( 'public' ) );


//CORS commands
 

app.listen( 1337, function(){
    console.log( 'app listening on 1337' )
} );

