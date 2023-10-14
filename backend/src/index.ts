import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { BookingService } from "./services/BookingService";
import { user } from "./dataTesting";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  return res.status(200).send({ Response: "IPC - Alumni Bike" });
});

BookingService.bookingRequestSingle("standard", user[0]);

app.listen(3000, () => {
  console.log("Express server started on port 3000");
});
