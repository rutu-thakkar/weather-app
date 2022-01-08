const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoicnV0dS10aGFra2FyIiwiYSI6ImNreTN5czA4MTA2dzIycHB5aDZldWZqOTIifQ.0k6j2sDzkM-_-XZizeBrtw&limit=1"

    request({ url ,json: true}, (error,{body}) => {
        // console.log(error);
        // console.log(response.body.features[0].center);
        if(error) {
            callback("Unable to connect to location services" , undefined)
        } else if (body.features.length === 0) {
            // console.log("test")
            callback("Unable to find location, try another search", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
        
    })
}




module.exports = geocode


