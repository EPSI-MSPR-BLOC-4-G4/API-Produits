import express from "express";
import * as dotevnv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import productRouter from "./routes/product.routes";
import { setupSwagger } from '../swagger';

dotevnv.config();

if (!process.env.PORT) {
  console.log(`No port value specified...`);
}

const PORT = parseInt(process.env.PORT as string, 10);

const app = express();

// Setup Swagger
setupSwagger(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use("/", productRouter);

if (process.env.NODE_ENV !== "test")   {
  app.listen(PORT, async () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

export default app;
