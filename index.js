const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");  //  add this
const middlewares = require("./src/middlewares/middlewares.js");
const loginRoute = require("./src/Controllers/loginAPI.js");
const HomeRoute=require("./src/Controllers/HomePage/Home.js")
const AssemblyHomeRoute=require("./src/Controllers/Assembly/AssemblyHome.js")
const AssemblyLineRoute=require("./src/Controllers/Assembly/AssemblyLineWise.js")
const SMTLineRoute = require("./src/Controllers/SMTLine/SmtLine.js");
 
 
const app = express();



app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

//app.use(limiter);   
  // app.use("/api", limiter);
app.use(express.json());

app.use("/api/login", loginRoute);

 app.use("/api/Home",HomeRoute );
  app.use("/api/AssemblyHome",AssemblyHomeRoute );
  app.use("/api/AssemblyLine",AssemblyLineRoute );
  app.use("/api/smtLine", SMTLineRoute);
const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.get("/api/status", (request, response) => {
  middlewares.standardResponse(response, null, 200, "running");
});
