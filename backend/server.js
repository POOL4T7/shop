import express from "express";
import dotenv from "dotenv";
import mongoDB from "./config/db.js";
import colors from "colors";
//import routes
import productRoutes from "./routes/productRoute.js";
import userRoutes from "./routes/userRoute.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();
const app = express();
mongoDB();
app.use(express.json());
//routes middleware
app.get("/", (req, res) => {
  res.send("hii");
});
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.json(process.env.PAYPAL_CLIENT_ID)
);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running in ${process.env.NODE_ENV} on ${port}`);
});
