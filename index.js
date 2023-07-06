const express = require('express');
const app = express();
const fs = require('fs');
const db = JSON.parse(fs.readFileSync('db.json', 'utf8'));

app.get('/api/materials', (req, res) => {
  const materials = db.materials || [];
  res.json(materials);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});