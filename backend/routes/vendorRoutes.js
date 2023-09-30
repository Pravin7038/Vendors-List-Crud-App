const express = require("express");
const route = express.Router();
const Vendor = require("../models/vendorModel")
route.post("/add",async(req,res)=>{

    try {

        await Vendor.create(req.body);

        res.send({msg:"New vendor created"})
        
    } catch (error) {
        
        res.send({msg:error})
    }
})

route.get("/",async(req,res)=>{

    let perPage = +req.query.limit;
    let page = Math.max(0,req.query.page)
    try {
        
        const data = await Vendor.find().skip(perPage*(page-1)).limit(perPage)
        res.send(data)
    } catch (error) {
        
        res.send({msg:error})
    }
})

route.patch("/:id",async(req,res)=>{

    try {

        await Vendor.findByIdAndUpdate({ _id: req.params.id }, req.body,{new:true})

        let vendor = await Vendor.findById({_id:req.params.id})

        res.send({msg:"Updated Successfully",data:vendor})
        
    } catch (error) {
        
        res.send({msg:error})
    }
});

route.delete("/:id",async(req,res)=>{

    try {
        
      await  Vendor.findOneAndDelete({ _id: req.params.id },{new:true});

      res.send({msg:"Deleted Successfully"});

    } catch (error) {
        
        res.send({msg:error})
    }
})


module.exports = route;