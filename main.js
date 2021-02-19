const app = require('./app');

const port = process.env.PORT || 3280;

app.listen(port, () => {
    console.log(`chilling at ${port}`);
});