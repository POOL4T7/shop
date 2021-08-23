import express from "express";
import dotenv from "dotenv";
import mongoDB from "./config/db.js";
import colors from "colors";
import path from "path";
import morgan from "morgan";
//import routes
import productRoutes from "./routes/productRoute.js";
import userRoutes from "./routes/userRoute.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoute.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();
const app = express();

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}
mongoDB();
app.use(express.json());
//routes middleware

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.json(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("hii");
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running in ${process.env.NODE_ENV} on ${port}`);
});
