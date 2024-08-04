const express = require("express")
const cors = require("cors");
const cookieParser = require('cookie-parser')
const { userRoutes } = require('./routes/userRoutes');
const {stationRoutes} = require('./routes/stationRoutes');
const {trainServiceRoutes} = require("./routes/trainServiceRoutes");
const {walletRoutes} = require("./routes/walletRoutes");
const {ticketRoutes} = require("./routes/ticketRoutes");
const authenticateToken = require("./middleware/authMiddleware");




const app = express();


const PORT = 8080;




app.use(express.json())
app.use(cors());
app.use(cookieParser())

  
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });

  app.use("/api/users",userRoutes)

  /* protected the route by middleware */
  app.use("/api/stations",authenticateToken,stationRoutes)
  app.use('/api/trainServices',authenticateToken, trainServiceRoutes);
  app.use('/api/funds', authenticateToken,walletRoutes);
  app.use('/api/tickets',authenticateToken, ticketRoutes);

  /* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmFmODdjZGQ1OWZiODNiODJlMzg2YTEiLCJpYXQiOjE3MjI3ODgwMTN9.kUMAA1lGdf23zWUSzkYSSAH9dRMECCpwdo7-6_SoXtc */