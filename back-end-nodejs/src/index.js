const express = require('express')
const { v4: uuidv4 } = require('uuid');

const cors = require('cors')

const isuuid = require('isuuid');

const app = express()
app.use(cors())
app.use(express.json())

app.use("/projects/:id",validateProjectId)


const projects = []


function logRequests(req,res,next){
    const {method,url} = req

    const logLabel = `[${method.toUpperCase()}] ${url}`

    //console.log(logLabel)

    return next()
}

function validateProjectId(req,res,next){

    const {id} = req.params

    if(!isuuid(id)){
        return res.status(400).json({error:"Invalid id"})
    }

    return next()

}

app.use(logRequests)

app.get('/projects',logRequests,(req,res)=>{

    const {title} = req.query

    const results = title ? projects.filter(project => project.title.includes(title)) : projects

    return res.json(results)
})

app.post('/projects',(req,res)=>{
    const {title, owner} = req.body
    const project  = {id:uuidv4(), title, owner}

 
    projects.push(project)

    return res.json(project)
})

app.put('/projects/:id',(req,res)=>{

    const { id } = req.params
    const {title, owner} = req.body
    const projectIndex = projects.findIndex(project => project.id == id)

    if(projectIndex < 0){
        return res.status(400).json({error: "Project not found"})
    }

    const project = {
        id,
        title,
         owner
    }

    projects[projectIndex] = project

    return res.json(project)
})

app.delete('/projects/:id',(req,res)=>{

    const { id } = req.params

    const projectIndex = projects.findIndex(project => project.id == id)

    if(projectIndex < 0){
        return res.status(400).json({error: "Project not found"})
    }

    projects.splice(projectIndex,1)

    return res.status(204).send()
})

app.listen(3333, ()=>{
    console.log("✔ Server is running")
})