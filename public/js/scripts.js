
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
    fetch('/weather?address='+search.value).then((response) => {
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