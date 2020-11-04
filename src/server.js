const app = require('./app')
const dotenv = require('dotenv')

dotenv.config()


const PORT = process.env.PORT || 3004


app.listen(PORT, () => {
    console.log(`Server is Started on Port ${PORT}`)
})

