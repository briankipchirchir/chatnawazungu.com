const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/payment/initiate", async (req, res) => {
  const { phone, amount, userId } = req.body;
  // TODO: replace this with your real M-PESA STK push logic
  console.log("Payment request:", { phone, amount, userId });
  res.json({ success: true, message: "STK push sent" });
});

app.post("/api/payment/callback", (req, res) => {
  console.log("M-PESA callback:", req.body);
  res.json({ ResultCode: 0, ResultDesc: "Accepted" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
