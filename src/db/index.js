import mongoose from "mongoose";
import dns from "dns";
import { DB_NAME } from "../constants.js";

// Some Windows machines (VPN clients / antivirus / local DNS proxies) point
// Node's resolver at a local address (e.g. 127.0.0.1) that refuses SRV
// queries, even though the OS resolver (nslookup) works fine. This causes
// "querySrv ECONNREFUSED" when connecting with a mongodb+srv:// URI.
// Forcing public DNS servers here fixes SRV lookups without depending on
// the machine's local network/DNS configuration.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;

        if (!mongoUri) {
            throw new Error("MONGODB_URI (or MONGO_URL) is missing in .env");
        }

        const connectionInstance = await mongoose.connect(mongoUri, {
            dbName: DB_NAME,
        });

        console.log(
            `MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.error("MONGODB connection FAILED:", error.message);
        process.exit(1);
    }
};

export default connectDB;
