import FileStoreFactory from 'session-file-store';
import session from "express-session";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const FileStore = FileStoreFactory(session);
const sessionConfig = {
    store: new FileStore({
        path: `${dirname(fileURLToPath(import.meta.url))}/model/sessions`,
    }),
    secret: 'uwc-enhanced-edition',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 3600000 * 24 * 3,
    }
};
export default sessionConfig;
