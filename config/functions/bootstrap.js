'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#bootstrap
 */

const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccountKey.json');

module.exports = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  strapi.firebase = admin;
};
// module.exports = () => {};
