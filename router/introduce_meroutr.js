const controllers = require("../controller/introduce_mecontroller");
const upload = require('./uploadfile');

const routes = [
  {
    method: "GET",
    url: "/api/introduces",
    handler: controllers.getintroduces,
  },
  {
    method: "GET",
    url: "/api/introduce/:id",
    handler: controllers.getintroduce,
  },
  {
    method: "POST",
    url: "/api/introduce",
    preHandler:upload.single('picture'),
    handler: controllers.saveintroduce,
  },
  {
    method: "PUT",
    url: "/api/introduce/:id",
    preHandler:upload.single('picture'),
    handler: controllers.updateintroduce,
  },
  {
    method: "DELETE",
    url: "/api/introduce/:id",
    handler: controllers.deleteintroduce,
  }
];

module.exports = routes;
