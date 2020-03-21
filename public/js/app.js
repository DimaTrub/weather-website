
const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')

const locaion = document.querySelector('.loc')
const summary = document.querySelector('.summary')
const temp = document.querySelector('.temp')    


weatherForm.addEventListener( 'submit', (e) => {
    //Document will not refresh after submit
    e.preventDefault()
    locaion.textContent = 'Loading...'
    summary.textContent = ''
    temp.textContent = ''
   
    const searchValue = searchInput.value
    fetch('http://localhost:3000/weather?address=' + searchValue).then(( response ) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            } else {
                locaion.textContent = data.location
                summary.textContent = data.forecast
                temp.textContent = data.temp
                let skycons1 = new Skycons({"color": "#3da4ab"});
                skycons1.add("icon1",data.icon);
                skycons1.play();
            }
        })   
    })  
})

