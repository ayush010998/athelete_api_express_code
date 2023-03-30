const express=require('express');
const app=express();
require("../src/db/conn")
const port=process.env.PORT||3000;
const MensRanking=require("../src/models/mens");




app.use(express.json())


app.post('/mens',async(req,res)=>{
    try{
        const addingMensRecords=new MensRanking(req.body);
        const insertMens=await addingMensRecords.save();
        res.status(201).send(insertMens);
        
    }catch(e){
        res.status(400).send(e);

    }
})

app.get('/mens',async(req,res)=>{
    try{
        const getMens=await MensRanking.find({});
        res.status(200).send(getMens);

    }catch(e){
        res.status(400).send(e);

    }
})

app.get('/mens/:id',async(req,res)=>{
    try{
        const _id=req.params.id;
        const getMen=await MensRanking.findById(_id);
        res.status(200).send(getMen);

    }catch(e){
        res.status(400).send(e);

    }
})


app.patch('/mens/:id',async(req,res)=>{
    try{
        const _id=req.params.id;
        const updateMens=await MensRanking.findByIdAndUpdate(_id,req.body);
        res.status(200).send(updateMens);

    }catch(e){
        res.status(400).send(e);

    }
})

app.delete('/mens/:id',async(req,res)=>{
    try{
        const _id=req.params.id;
        const deleteMens=await MensRanking.findByIdAndDelete(req.params.id);
        res.send(deleteMens);

    }catch(e){
        res.status(404).send(e);

    }
})

app.listen(port,()=>{
    console.log(`server up and running at port ${port}`);
})