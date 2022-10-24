import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const publicPath = resolve(__dirname, 'public');

export {publicPath}