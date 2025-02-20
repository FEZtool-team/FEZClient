module.exports = {
  apps: [
    {
      name: "FezClient", // Replace with your Nuxt application name
      script: "./.output/server/index.mjs", // Path to the Nuxt server entry point
      exec_mode: "cluster", // Leverage Node.js cluster module for multi-process performance
      instances: "max", // Run the maximum number of worker processes allowed by your system
      port: "3030",
      version: "0.0.1",
      env: {
        // Optional environment variables for your application
        NODE_ENV: "production", // Set the environment to production
        // Add other environment variables as needed
      },
    },
  ],
};
