module.exports = {
  apps: [
    {
      name: 'Pronto Frontend Preview',
      script: 'npm',  // Usamos npm para ejecutar el script
      args: 'run preview',  // El comando que ejecuta el preview
      watch: ['src/database/actualizaciones/.env', 'src/database/actualizaciones/actualizaciones.js'],
      watch_delay: 50,
      log_file: './logs/logs_fronted_preview.txt',
      merge_logs: true,
      watch_options: {
        usePolling: true,
        followSymlinks: false,
      },
    },
  ],
};
