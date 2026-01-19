require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `\x1b[95mServer is Listening on port: \x1b[0m${PORT}\x1b[0m -> \x1b[96mhttp://localhost:${PORT}\x1b[0m`,
  );
});
