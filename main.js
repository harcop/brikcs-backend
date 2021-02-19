const app = require('./app');

const port = 3280;
app.listen(port, () => {
    console.log(`chilling at ${port}`);
});