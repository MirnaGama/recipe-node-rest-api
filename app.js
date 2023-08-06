const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.use(express.json());
app.use(cookieParser());	// For parsing Cookie header and populate req.cookies with an object keyed by the cookie names

app.use(session({
   name: 'SessionCookie',
   secret: 'Shsh!Secret!',
   resave: false,
   saveUninitialized: false,
   cookie: { maxAge: 600000, httpOnly: false } // Secure = True to use Secure HTTPS
}));

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });

 
  app.use('/api', require('./app/routes/api'));

  app.get("/status", (request, response) => {
    const status = {
       "Status”": "Running"
    };
    
    response.send(status);
 });
