const express = require('express')
const { dirname } = require('path/posix')
const path = require('path/posix')
const hbs = require('hbs');
const { query } = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express()
const port = process.env.PORT || 3000

const partialPath = path.join(__dirname, '../templates/partials')

// app.use(path.join(__dirname, 'public'))
app.use(express.static(path.join(__dirname, '../public')))
app.set("views", path.join(__dirname, '../templates/views'))
hbs.registerPartials(partialPath);



app.set('view engine', 'hbs')
app.get('', (req,res) => {
    res.render('index', {title : 'weatherApp', name: 'Rutu Thakkar'})
})

app.get('/about', (req,res) => {
    res.render('about',{title: 'weatherApp', name: 'Rutu Thakkar', body: 'Know more about us'})
})

app.get('/help', (req,res) => {
    res.render('help', {title: 'weatherApp', body: 'help information', name: 'Rutu Thakkar', 
    msg : 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'})
});

app.get('/weather', (req,res) => {

    if(!req.query.address) {
        res.send({
            error: 'You must Provide address'
        })
        return
    }

    geocode(req.query.address, (error,{ latitude, longitude, location} = {}) => {
        if (error) {
            return res.send( {error} )
        }
        forecast(latitude,longitude, (error, forecastdata) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastdata.forecast,
                location,
                address: req.query.address
            })
        })
    })  
});

// app.get('/demoroute', (req,res) => {
//     if (!req.query.search) {
//         res.send({
//             error: "You must provide a search"
//         })
//         return
//     } 
//     console.log(req.query.search);
//     res.send("hey")    
    
// })


app.get('/help/*', (req,res) => {
    res.render('errorPage', {title: '*Error*',name: 'Rutu Thakkar' ,msg: "Help Arcticle not found"})
})

app.get('/about/*', (req,res) => {
    res.render('errorPage', {title: '*Error*',name: 'Rutu Thakkar' ,msg: "Page not found"})

})

// app.get('*', (req,res) => {
//     res.render('errorPage', {title: '*Error*' ,name: 'Rutu Thakkar',msg: '404: Page Not Found'})
// })


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});