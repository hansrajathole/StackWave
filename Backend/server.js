import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/db/db.js";

const PORT = config.PORT 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB()
});