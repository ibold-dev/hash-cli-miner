module.exports = {
  apps: [
    {
      name: "hash256-miner",
      script: "./hash256-cli.js",
      args: "mine --engine cuda --submit --loop",
      instances: 1,
      autorestart: true,
      watch: false, 
      max_memory_restart: "80G",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      out_file: "./logs/miner-out.log",
      error_file: "./logs/miner-error.log",
      merge_logs: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
