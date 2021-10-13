// module.exports = ({ env }) => ({
//   host: env('HOST', '0.0.0.0'),
//   port: env.int('PORT', 80),
//   cron: { enabled: true },
//   url: env('URL', 'http://localhost'),


//   admin: {
//     auth: {
//       secret: env('ADMIN_JWT_SECRET', '9bf8cc74ab83590b280df0851beaec60'),
//     },
//   },

// });

module.exports = ({ env }) => {
  const port = env('PORT', '1337');
  const host = env('HOST', '0.0.0.0');
  const url = env('URL', `http://localhost${port !== '80' ? ':'+port : ''}`);
  const adminAuthSecret = env('ADMIN_JWT_SECRET', '9bf8cc74ab83590b280df0851beaec60');

  return {
    host, port, url,
    cron: { enabled: true },
    cors: { enabled: true, origin: ['*'] },
    admin: {
      auth: { secret: adminAuthSecret },
    }
  };
};
