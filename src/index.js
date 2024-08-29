import express from "express";
import loginRouter from "./routes/login.js";
import userRouter from "./routes/users.js";
import hostRouter from "./routes/hosts.js";
import propertiesRouter from "./routes/properties.js";
import amenitiesRouter from "./routes/amenities.js";
import bookingsRouter from "./routes/bookings.js";
import reviewsRouter from "./routes/reviews.js";
import log from "./middleware/logMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";
import "dotenv/config";

import * as Sentry from "@sentry/node";

const app = express();

Sentry.init({
  dsn: "https://23c7ceb38eb5a6e3beee58368753f204@o4507350401679360.ingest.de.sentry.io/4507860097957968",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use(log);

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

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.use(Sentry.Handlers.errorHandler());

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
