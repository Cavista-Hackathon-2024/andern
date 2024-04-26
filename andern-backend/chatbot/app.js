const express = require('express');
require("dotenv").config();
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./logger');
const cors = require('cors');
const path = require('path');
const { useQueue } = require('./lib/amqp');
const queues = require('./constants/queues');
const app = express();
const port = process.env.PORT || 3004;
const tipsRouter = require("./routes/tips.router");
const chatsRouter = require("./routes/chat.router")
const useCron = require('./lib/cron');


// Use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('combined'));
app.use(cors());

app.use("/api/tips", tipsRouter)
app.use("/api/chats", chatsRouter)


useQueue(queues.analyze_post, analyzePost)

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});