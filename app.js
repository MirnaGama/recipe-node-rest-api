const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.use(express.json());

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
