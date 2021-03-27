const config = require("config");
const express = require("express");
const app = express();
const courses = require("./routes/courses");
const home = require("./routes/home");

app.use(express.json());
app.use(express.static("public"));
app.use(courses);
app.use(home);

//Configuration
console.log(`Application name: ${config.get("name")}`);
console.log(`Mail server: ${config.get("mail.host")}`);
console.log(`Mail password: ${config.get("mail.password")}`);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
