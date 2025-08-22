const fs = require('fs').promises;
const check = require('syntax-error');

const syntaxError = async (fileName) => {
    const file = process.cwd() + fileName;
    const src = await fs.readFile(file);
    
    const err = check(src, file);

    if (err) {
        return err;
    }
};

module.exports = syntaxError;