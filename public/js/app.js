
const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener( 'submit', (e) => {
    //Document will not refresh after submit
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
   
    const searchValue = searchInput.value
    fetch('http://localhost:3000/weather?address=' + searchValue).then(( response ) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })   
    })  
})

