const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {

  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository);

  return response.status(400).json(repository);
});

app.put("/repositories/:id", (request, response) => {
   const {id} = request.params;
   const { title, url, techs } = request.body;

  const findeRepositoryIndex = repositories.findIndex(repository => 
    repository.id === id    
  );

  if(findeRepositoryIndex === -1) {
    return response.status(400).json({ error: "Repository not found in the search" });
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[findeRepositoryIndex].likes
  };

  repositories[findeRepositoryIndex] = repository

  return response.json(repository);


});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const findeRepositoryIndex = repositories.findIndex(repository => 
    repository.id === id    
  );

  if(findeRepositoryIndex >= 0) {
    repositories.splice(findeRepositoryIndex, 1);
  } else {
    return response.status(400).json({ error: "project not found" });
  }

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const findeRepositoryIndex = repositories.findIndex(repository => 
    repository.id === id    
  );

  if(findeRepositoryIndex === -1) {
    return response.status(400).json({ error: "Repository not found" });
  }

  repositories[findeRepositoryIndex].likes ++;

  return response.json(repositories[findeRepositoryIndex]);
 
});

module.exports = app;