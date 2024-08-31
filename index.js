const express = require('express');
const path = require('path');

require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/css', express.static(path.resolve(__dirname, "views/css")));
app.use('/js', express.static(path.resolve(__dirname, "views/js")));

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    
    next();
});
 
app.get('/', (req, res) => {
    res.render('index');
});


const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});