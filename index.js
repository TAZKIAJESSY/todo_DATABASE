const express = require("express"); //import
const User = require("./models").user;

const app = express(); //make express server
const PORT = 4001; //port to listen

app.use(express.json()); //parse the body of HTTP requests

// app.post("/echo", (req, res) => {
//   res.send(req.body);
// });

// Terminal command: http POST :4001/echo hello=world

//create a new row in users table
app.post("/users", async (req, res, next) => {
  try {
    const email = req.body.email;
    if (!email || email === " ") {
      res.status(400).send("Must provide an email address");
    } else {
      const user = await User.create(req.body);
      res.send(user);
    }
  } catch (error) {
    next(error.message);
  }
});
//http -v POST :4001/users email=Peter@gmail.com

app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));
