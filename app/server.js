import app from "./app.js";

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Running server on port: ${PORT}`);
});