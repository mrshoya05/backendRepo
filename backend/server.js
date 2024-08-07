import app from "./app.js";
import cors from 'cors'

app.use(cors());

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})