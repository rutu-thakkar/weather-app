
console.log("client side javascript")

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/ahmedabad.json?access_token=pk.eyJ1IjoicnV0dS10aGFra2FyIiwiYSI6ImNreTN5czA4MTA2dzIycHB5aDZldWZqOTIifQ.0k6j2sDzkM-_-XZizeBrtw&limit=1")
// .then((response) => {
//     response.json().then((data) => {
//         console.log(data.features[0].place_name, data.features[0].center[0], data.features[0].center[1])
//     })
// })

// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             return console.log(data.error)
//         }
//         console.log(data.location)
//         console.log(data)
//     })
// })

const weatherform = document.querySelector('form');
const search = document.getElementById('search');
const successlocation = document.querySelector('#successlocation')
const successmsg = document.querySelector('#success')
const errormsg = document.querySelector('#error')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(search.value);
    fetch('http://localhost:3000/weather?address='+search.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                successmsg.textContent =''
                successlocation.textContent =''
                errormsg.textContent = data.error
                // return console.log(data.error)
            } else {
                successlocation.textContent = data.location;
                successmsg.textContent = data.forecast;

                errormsg.textContent = ''
                // console.log(data.location)
                // console.log(data)
            }
        })
    })
})