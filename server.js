const app = require("./app");
const PORT = process.env.PORT || 5000;
console.log(process.env.NODE_ENV);
app.listen(PORT, console.log("Server Up and Running"));
