import { app } from "./app.js";
import { configDotenv } from "dotenv";
import { dbConnnect } from "./db/dbConfig.js";
import dns from 'dns'

dns.setServers(['8.8.8.8'])
configDotenv()
const port = process.env.PORT

dbConnnect()
    .then(() => {
        app.listen(port, () => {
            console.log(`Backend running in locahost:${port}`)
        })
    })
    .catch((error) => {
        console.error("Server failed to start:", error);
        process.exit(1);
    });
