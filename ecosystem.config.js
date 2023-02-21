module.exports = {
  apps: [
    {
      name: 'long-daily-service',
      script: 'pnpm',
      args: 'start:prod',
      env: {
        PORT: 9000,
        NODE_ENV: 'production',
      },
    },
  ],
};
