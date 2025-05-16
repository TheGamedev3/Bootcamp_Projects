/** Server for bookstore. */


const app = require("./app");

let port = 3000;

const link = `http://localhost:${port}`;
app.listen(port, () => {
  console.log(`Server starting at ${link}`);
});

module.exports = link;