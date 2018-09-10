
const config = {
  development: {
    appId: process.env.PUSHER_APP_ID_DEV,
    key: process.env.PUSHER_KEY_DEV,
    secret: process.env.PUSHER_SECRET_DEV,
    cluster: process.env.PUSHER_CLUSTER_DEV,
  },
  production: {
    appId: process.env.PUSHER_APP_ID_PROD,
    key: process.env.PUSHER_KEY_PROD,
    secret: process.env.PUSHER_SECRET_PROD,
    cluster: process.env.PUSHER_CLUSTER_PROD,
  },
};

const pusherConfig = config.development;

export default pusherConfig;
