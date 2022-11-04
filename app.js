const express = require('express');
const port = 3000;
const expressLayouts = require('express-ejs-layouts');
const mongosse = require('mongoose')
const fileUpload = require('express-fileupload')
const methodOverride = require('method-override')
const foodieRoutes = require('./Routes/foodie-routes')
const app = express();



//use express layout
app.use(expressLayouts)
app.set('layout', './myLayouts/main-layout')

//connect datebase
const dbURL = //your app connection string


mongosse.connect(dbURL)
    .then(() => {
        console.log('connection to db successful')
    })
    .catch((err) => {
        console.log(err)
    })


//use file upload
app.use(fileUpload());
//use method override
app.use(methodOverride("_method"))

//use express urlencoded
app.use(express.urlencoded({ extended: true }));

//use public folder
app.use(express.static('public'))

//set views engine
app.set('view engine', 'ejs');

//foodie recipe route
app.use(foodieRoutes)

app.listen(port, () => {
    console.log(`listening to request coming at ${port}`);
})