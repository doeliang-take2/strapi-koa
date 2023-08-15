'use strict';

/**
 * sys-user service
 */
const utils = require('@strapi/utils');
const { createCoreService } = require('@strapi/strapi').factories;
const { ApplicationError, ValidationError } = utils.errors;
const { sanitize } = utils;

const sanitizeOutput = (user, ctx) => {
    const schema = strapi.getModel('plugin::users-permissions.user');
    const { auth } = ctx.state;
  
    return sanitize.contentAPI.output(user, schema, { auth });
  };

module.exports = createCoreService('api::sys-user.sys-user',({strapi})=>({
    async addUser(ctx){
        
        const { email, username, role } = ctx.request.body;

        const userWithSameUsername = await strapi
        .query('plugin::users-permissions.user')
        .findOne({ where: { username } });

        if (userWithSameUsername) {
        if (!email) throw new ApplicationError('Username already taken');
        }


        const userWithSameEmail = await strapi
            .query('plugin::users-permissions.user')
            .findOne({ where: { email: email.toLowerCase() } });

        if (userWithSameEmail) {
            throw new ApplicationError('Email already taken');
        }

        const user = {
        ...ctx.request.body,
        email: email.toLowerCase(),
        provider: 'local',
        createOperator: ctx.state.user.username,
        };

        try {
        const data = await strapi.plugin('users-permissions').service('user').add(user);
        // const sanitizedData = await sanitizeOutput(data, ctx);

        // ctx.created(sanitizedData);
        return data;
        } catch (error) {
        throw new ApplicationError(error.message);
        }
    },
    async updateUser(ctx){
        await strapi.controller('plugin::users-permissions.user').update(ctx)
    },
    async deleteUser(ctx){
        await strapi.controller('plugin::users-permissions.user').delete(ctx)
    }
}));
