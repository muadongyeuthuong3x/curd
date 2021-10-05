const fastify = require("fastify")({
    logger: true,
  });
  require("./utils/connectDB");
  const swagger = require("./utils/swagger");
  const introduces = require("./router/introduce_meroutr");
  fastify.register(require("fastify-swagger"), swagger.options);
  fastify.register( require('fastify-multipart'))
  fastify.register(require('fastify-formbody'))
  const path = require("path")
  fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'uploads'),
    prefix: '/uploads/', // optional: default '/'
  })

  fastify.register(require("fastify-cors"), {
    origin: "*",
  });


  introduces.forEach((route) => {
    fastify.route(route);
  });
  
  const start = async () => {
    try {
      await fastify.listen(5000);
      fastify.swagger();
      fastify.log.info(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  };
  
  start();
  