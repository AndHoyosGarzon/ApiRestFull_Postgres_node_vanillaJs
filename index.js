import express from "express";
import { config } from "dotenv";
import userRouter from "./src/routes/user.routes.js";
import petRouter from "./src/routes/pets.routes.js";

import publicRouter from "./src/routes/public.routes.js";

config();
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", publicRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/pets", petRouter);

//connection frontend
app.use(express.static("public"));

const PORT = process.env.PORT ?? 5001;
app.listen(PORT, () => {
  console.log(`Server listening on PORT http://localhost:${PORT}`);
});
