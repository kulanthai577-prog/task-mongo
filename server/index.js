const express =require('express');
const mongoose=require('mongoose');
const cors =require('cors');
const app=express();


app.use(cors({
    origin:'http://localhost:3000',
    methods:['PUT','GET','POST','DELETE']
}))

app.use(express.json());


const FoodModel=require("./models/Food")
mongoose.connect("mongodb+srv://root:root@cluster0.h9zmf8m.mongodb.net/?appName=Cluster0/Food")
.then(()=>console.log('Connected'))
.catch(err=>console.log(err))


//Inserted the data

app.post("/insert",async(req,res)=>{
    const {foodName,description}=req.body;
    const food=new FoodModel({
        foodName:foodName,
        description:description
        })
        try{
            const result=await food.save()
            res.send(result)
            console.log(result)
        }
        catch(err)
        {
            console.log(err)
        }
})
//Read the data
app.get("/read",async(req,res)=>{
    try
    {
        const food=await FoodModel.find();
        res.send(food);
    }
    catch(err)
    {
         console.log(err);

    res.status(500).send([]); 
    }
})

// update data

app.put("/update",async(req,res)=>{
    const {newFoodName,id}=req.body;
    try
    {
      const updateFood=await FoodModel.findById(id);
      if(!updateFood)
      {
        return res.status(400).send("Data not found");
      }
      updateFood.foodName=newFoodName;
      await updateFood.save()
      res.send("Data Updated..")
    }
    catch(err)
    {
        console.log(err);
    }
})



//deleting the data

app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    try
    {
        const result=await FoodModel.findByIdAndDelete(id);
        if(!result)
        {
            return res.status(404).send("Food item not found")
        }
        res.send("Food item delete")
    }catch(err)
        {
            console.error(err)
        }
    })

app.listen(3001,()=>{
    console.log("Server is Running...")
})


