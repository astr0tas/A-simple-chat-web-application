import domain from "./domain.config.js"; // Must include `.js` extension in order to work properly!
const corsConfig = {
    origin: `https://${domain}`,
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
export default corsConfig;
