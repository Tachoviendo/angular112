import fastifyPlugin from "fastify-plugin";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

// fastify-plugin para que swagger vea las rutas registradas en los otros plugins
export default fastifyPlugin(async function swaggerPlugin(fastify) {
  await fastify.register(swagger, {
    openapi: {
      openapi: "3.0.0",
      info: {
        title: "API de tareas",
        description: "API RESTful de usuarios y tareas",
        version: "1.0.0",
      },
      servers: [{ url: `http://localhost:${process.env.PORT ?? 3000}` }],
      tags: [
        { name: "auth", description: "Login y usuario autenticado" },
        { name: "usuarios", description: "CRUD de usuarios" },
        { name: "tareas", description: "CRUD de tareas" },
      ],
      components: {
        securitySchemes: {
          bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
        },
      },
    },
  });

  await fastify.register(swaggerUi, {
    routePrefix: "/documentation",
  });
});
