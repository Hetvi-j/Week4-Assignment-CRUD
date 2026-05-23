import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";

import {
  errorHandler
} from "./middleware/errorMiddleware.js";

const app = express();

const PORT = 5000;



// MIDDLEWARE
app.use(cors());

app.use(express.json());



// ROUTES
app.use(
  "/api/users",
  userRoutes
);



// TEST ROUTE
app.get("/", (req, res) => {

  res.json({
    message:
      "Server Running Successfully"
  });
});



// ERROR HANDLER
app.use(errorHandler);



// SERVER
app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );
});