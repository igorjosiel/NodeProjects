const { request, response } = require('express');
const express = require('express');
const { uuid } = require('uuidv4');

const app = express();
app.use(express.json());

const projects = [];

app.get('/projects', (request, response) => {
    const { title } = request.query;

    const results = title ? projects.filter(project => project.title.includes(title)) : projects;
    //console.log(request.query);
    return response.json(results);
});

app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const { title, owner } = request.body;

    const projectIndex = projects.findIndex(project => project.id == id);
    
    if(projectIndex < 0) {
        return response.status(400).json({ error: "Project not found!" });
    }

    const project = {
        id,
        title,
        owner
    };

    projects[projectIndex] = project;

    return response.json(project);
});

app.post('/projects', (request, response) => {
    const { title, owner } = request.body;
    const project = { id: uuid(), title, owner };

    projects.push(project);

    return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;
    
    const projectIndex = projects.findIndex(project => project.id == id);
    
    if(projectIndex < 0) {
        return response.status(400).json({ error: "Project not found!" });
    }

    projects.splice(projectIndex, 1);
    
    return response.status(204).send();
});

app.listen(3334, () => {
    console.log("Backend started!");
});