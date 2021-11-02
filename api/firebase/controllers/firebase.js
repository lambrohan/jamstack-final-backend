'use strict';

const { sanitizeEntity } = require('strapi-utils');

const sanitizeUser = user =>
  sanitizeEntity(user, {
    model: strapi.query('user', 'users-permissions').model,
  });

module.exports = {
  async auth(ctx) {
    try {
      const idToken = ctx.request.body.token;
      const decodedToken = await strapi.firebase
        .auth()
        .verifyIdToken(idToken);
      if (decodedToken.email) {
        let jwt;
        let user = await strapi.plugins['users-permissions'].services.user.fetch({
          email: decodedToken.email,
        });
        if (user) {
          user = sanitizeUser(user);

          jwt = strapi.plugins['users-permissions'].services.jwt.issue({
            id: user.id,
          });

          ctx.body = {
            user,
            jwt
          };
        } else {
          const pluginStore = await strapi.store({
            environment: '',
            type: 'plugin',
            name: 'users-permissions',
          });

          const settings = await pluginStore.get({
            key: 'advanced',
          });

          const role = await strapi
            .query('role', 'users-permissions')
            .findOne({ type: settings.default_role }, []);

          const params = {};
          params.role = role.id;
          params.email = decodedToken.email;
          params.username = decodedToken.email.split('@')[0];
          params.confirmed = true;

          let user = await strapi.query('user', 'users-permissions').create(params);
          if (user) {
            user = sanitizeUser(user);
            jwt = strapi.plugins['users-permissions'].services.jwt.issue({
              id: user.id,
            });

            ctx.body = {
              user,
              jwt
            };
          } else {
            throw 'user empty';
          }
        }
      } else {
        throw 'email missing';
      }
    } catch (error) {
      return ctx.badRequest(null, [{ messages: [{ id: 'unauthorized' }] }]);
    }
  },

};
