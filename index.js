const express = require("express")
const shortid = require("shortid")

let hubs = []

const port = 5000

const server = express()

server.use(express.json())

// const server = http.createServer((req, res) => {
//     res.statusCode = 200
//     res.setHeader("Content-TYPE", "text/plain")
//     res.end("Hello World, from NodeJS")
// })


server.get("/", (req, res) => {
    res.json({hello: "World!"})
})

server.get("/hello", (req, res) => {
    res.json({hello: "Lambda!"})
})

//create
server.post("/api/hubs", (req, res) => {
    const hubInfo = req.body
    hubInfo.id = shortid.generate()
    hubs.push(hubInfo)

    res.status(201).json(hubInfo)

})

//read
server.get("/api/hubs", (req, res) => {
    res.status(200).json(hubs)
})

//delete 
server.delete("/api/hubs/:id", (req, res) => {
    const {id} = req.params
    const deleted = hubs.find(hub => hub.id === id)

    if(deleted) {
        hubs = hubs.filter(hub => hub.id !== id)
        res.status(200).json(deleted)
    } else {
        res.status(404).json({ message: "id not found" })
    }
})

//update / patch
server.put("/api/hubs/:id", (req,res) => {
    const {id} = req.params
    const changes = req.body
    changes.id = id

    let index = hubs.findIndex(hub => hub.id === id)

    if (index !== -1) {
    hubs[index] = changes 
    res.status(200).json(index, changes)
    } else {
        res.status(404).json({ message: "id not found" })
    }

})

server.patch("/api/hubs/:id", (req, res) => {
    const {id} = req.params
    const changes = req.body

    let found = hubs.find(hub => hub.id === id)

    if(found) {
        Object.assign(found, changes)
        res.status(200).json(found)
    } else {
        res.status(404).json({ message: "id not found" })
    }

})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})