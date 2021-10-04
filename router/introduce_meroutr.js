const controllers = require("../controller/introduce_mecontroller");

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
    handler: controllers.saveintroduce,
  },
  {
    method: "PUT",
    url: "/api/introduce/:id",
    handler: controllers.updateintroduce,
  },
  {
    method: "DELETE",
    url: "/api/introduce/:id",
    handler: controllers.deleteintroduce,
  }
];

module.exports = routes;
