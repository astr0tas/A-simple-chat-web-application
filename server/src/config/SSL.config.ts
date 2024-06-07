import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';
dotenv.config();

const SSL: any = {
      key: process.env.KEY_PATH,
      cert: process.env.CERT_PATH
};

export default SSL;