import express from "express";
import loginRouter from "./routes/login.js";
import userRouter from "./routes/users.js";
import hostRouter from "./routes/hosts.js";
import propertiesRouter from "./routes/properties.js";
import amenitiesRouter from "./routes/amenities.js";
import bookingsRouter from "./routes/bookings.js";
import reviewsRouter from "./routes/reviews.js";
import "dotenv/config";

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/hosts", hostRouter);
app.use("/properties", propertiesRouter);
app.use("/amenities", amenitiesRouter);
app.use("/bookings", bookingsRouter);
app.use("/reviews", reviewsRouter);

app.use("/login", loginRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
