let port = process.env.PORT
if(!process.env.PORT) 
    port = 3000
let url = process.env.API_URI
/*if(process.env.NODE_ENV === 'development'){
    url = 'https://observation-app.herokuapp.com/'
}*/
console.log(process.env.API_URI)
module.exports = {
    url
}