const app = require("./src")

const PORT = process.env.SERVER_PORT || 3000

app.listen(PORT, () => {
    console.log(`\nServer open on port ${PORT}`)
})