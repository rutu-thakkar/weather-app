const request = require("request")
const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=3ffe32777ab702ebfb8475a8d5ec7d9f&query="+decodeURIComponent(longitude)+ "," + decodeURIComponent(latitude);


    request({url , json : true}, (error, { body } = {}) => {
        if(error) {
            callback("unable to connect to weather services",undefined)
        } else if (body.error){
            callback("unable to find location", undefined)
        } else {
            // console.log(response.body.current)
            callback(undefined, {
                forecast : "It is "+ body.current.weather_descriptions + ". It is currently " + body.current.temperature + " but it feels like " + body.current.feelslike + ". There is " + body.current.precip + "% chances of rain"
            })
        }
})
}
module.exports = forecast;