// config/plugins.js

module.exports = ({ env }) => ({
    'users-permissions': {
        enabled: true,
        config: {
        jwt: {
            expiresIn: '1m',
        },
        },
    },
    'google-auth': {
        enabled: true,
    }
});