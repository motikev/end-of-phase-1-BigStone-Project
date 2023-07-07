const express = require('express');
const app = express();

// Define routes and endpoints here

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port  ${port}`);
});