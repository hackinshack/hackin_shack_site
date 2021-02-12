let express = require('express');
let app = express();

app.use(express.static('docs'));

let server = app.listen(3000, function () {console.log('server listening on port 3000');}); 

app.get('/about', (req, res) => {
    res.sendFile('./docs/about.html', { root: __dirname });
});
