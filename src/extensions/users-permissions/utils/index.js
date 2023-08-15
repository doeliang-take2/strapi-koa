// ../users-permissions/utils/index.js
const {person} = require('../../../util/models');


'use strict';
const getService = name => {
    return strapi.plugin('users-permissions').service(name);
    
};

async function getPerson(ctx){
    // console.log(ctx.state.route.config.auth);

    const data = person(ctx.state.user)

    return {code:1000,data:data,message:"success"}
};

module.exports = {
    getService,
    getPerson
};