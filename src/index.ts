import express, {Application, Request, Response} from "express"

const app: Application = express();

const port: number = 8000;


app.get('/',(req: Request,res: Response)=>{
    res.send("working with typescipt...")
})

app.listen(port,()=>{
    console.log(`connected successfully ${port}`);
    
})