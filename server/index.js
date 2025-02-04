const express = require('express');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const app = express();

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production';

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  // Use default values if `nuxt.options.server` is undefined
  const host = process.env.HOST || '0.0.0.0';
  const port = process.env.PORT || 3000;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // Give Nuxt middleware to Express
  app.use(nuxt.render);

  // Listen to the server
  app.listen(port, host, () => {
    consola.ready({
      message: `🚀 Server running at http://${host}:${port}`,
      badge: true,
    });
  });
}

start();
