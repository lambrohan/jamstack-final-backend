module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 80),
  cron: { enabled: true },
  url: env('URL', 'http://localhost'),


  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '9bf8cc74ab83590b280df0851beaec60'),
    },
  },

});
