const express = require('express');
const connection = require('./db.js');
const PORT = 4000;
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json());

 app.use('/api/auths', require('./Routers/auths.js'));
 app.use('/api/notes', require('./Routers/notes.js'));

connection()
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
