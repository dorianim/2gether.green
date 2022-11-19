const express = require( "express" );
const app = express();
const port = 8000; // default port to listen
const database = require('./database.ts');

database.sync().then(() => console.log('database is ready'));
// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );