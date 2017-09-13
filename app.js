const express = require( 'express' );

const app = express();

app.use( express.static( 'public' ) );


//CORS commands
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
 
app.listen( process.env.PORT || 1337, function(){
    console.log( 'app listening on 1337' )
} );

