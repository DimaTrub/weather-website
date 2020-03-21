const path = require('path')
const request = require('request')
const hbs = require('hbs')
const express = require('express')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


//for production in heroku ill use process.env.PORT 
//on local machine it will use 3000 port
const port = process.env.PORT || 3000




//Define pathes for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')

//File include



//Path for partials
const partialPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialPath)

//Setup handelbars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)


//Setup static die ti serve
app.use(express.static(publicDirectoryPath));






//Express Toturial


app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Dima'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Dima'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        helptext: 'this is some text',
        title: 'Help Page',
        name: 'Dima'
    })
})



app.get('/weather',(req, res) =>{
    
    if(!req.query.address){
        return res.send({error: 'Enter address'})
    }

    
    geocode(req.query.address, (error,{latitude,longitude,location}={}) => {
        if(error){
             return res.send({error: error} ) 
        }

        forecast(latitude, longitude, (error, { summary,temp,rainProp }) => {
            res.send({
                temp: temp,
                forecast: summary,
                rainProp: rainProp,
                location: location

            })
        })
    })
})


app.get('/help/*',(req, res) => {
    res.render('404',{
        title: '404',
        error: 'Cant find article',
        name: 'Dima'

    })
})


app.get('*', (req, res ) => {
   res.render(('404'),{
        title: '404',
        error: 'Page not found',
        name: 'Dima'
   })
})



app.listen(port, ()=>{
    console.log('Server is up on port ' + port);
    
})



