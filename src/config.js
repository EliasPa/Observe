let port = process.env.PORT
if(!process.env.PORT) 
    port = 3000
let url = process.env.API_URI

console.log(process.env.API_URI)
console.log(url)

module.exports = {
    url
}