
const express = require("express");
const { Op } = require("sequelize");
const app= express();
const cors = require("cors");
const port=8080;

const sequelize=require("./sequelize");

app.use(cors());

//import models

const Ship = require("./models/ship");
const CrewMember=require("./models/crewmember");
const {application} =require ("express");
//Define the relationship 
Ship.hasMany(CrewMember);

const res= require("express/lib/response");
const e = require("express");

app.use(
    express.urlencoded({extended:true})
);
app.use(express.json());



app.listen(port, () => {
    console.log("The server is running on http://localhost:" + port);
  });

//endpoint for syncing the database with the models
app.get("/sync", async (req, res) => {
    try {
      await sequelize.sync({ force: true });
      res.status(201).json({ message: "Database created with the models." });
    } catch (err) {
      console.error(err.message);
    }
  });


//get all ships

app.get("/ships",async (req,res)=>{
    try {
        const pageAsNumber= Number.parseInt(req.query.page);
        const sizeAsNumber=Number.parseInt(req.query.size);
        const name=req.query.name;
        const displacement=req.query.displacement;

        //the pagination
        let page=0;
        if(!Number.isNaN(pageAsNumber)&& pageAsNumber>0){
            page=pageAsNumber;
        }
        let size =10;
        if(!Number.isNaN(sizeAsNumber)&& sizeAsNumber>0 && sizeAsNumber<10){
            size=sizeAsNumber;
        }

        const ships= await Ship.findAll({
            where: name ? { name: { [Op.like]: `${name}%`}}:undefined || displacement?{displacement: {[Op.gt]:displacement}}:undefined ,  //filter by name or by displacement
            order: [
                ['displacement','ASC']     //order by displacement
            ],
            limit:size,
            offset: page*size
        });
        res.status(200).json(ships);

    } catch (err) {
        console.error(err.message);
    }
})

//get a ship by id

app.get("/ships/:id", async(req,res)=>{
    try {
        const ship= await Ship.findByPk(req.params.id,{
            include:CrewMember
        });
        if(ship){
            res.status(200).json(ship);
        }else{
            res.status(404).json({message: "Ship does not exist"});
        }
    } catch (err) {
        console.error(err.message);
    }
})

//post a new ship
app.post("/ships" ,async (req,res)=>{
    try {
        await Ship.create(req.body);
        res.status(201).json({message: "Ship has been created!"});

    } catch (err) {
        console.error(err.message);
    }
})

//Delete a certain ship

app.delete("/ships/:id",async (req,res)=>{
    try {
        const ship= await Ship.findByPk(req.params.id);
        if(ship){
            await ship.destroy();
            res.status(202).json({message: "Ship deleted!"});
        }
        else{
            res.status(404).json({message: "Ship does not exist!"});
        }
    } catch (err) {
        console.error(err.message);
    }
})

//update a ship

app.put("/ships/:id",async (req,res)=>{
try {
    const ship=await Ship.findByPk(req.params.id);
    if(ship){
        await ship.update(req.body, {
            fields: ["id","name","displacement"],
        });
        res.status(202).json({message: "Ship updated"});
    }else{
        res.status(404).json({message:"Ship does not exist!"});
    }
} catch (err) {
    console.error(err.message);
}    
})

//Get Crew Members of a ship 

app.get("/ships/:shipId/crewmembers",async (req,res)=>{
    try {
        const ship= await Ship.findByPk(req.params.shipId,{
            include: [CrewMember] });
        if(ship){
            res.status(200).json(ship.CrewMembers);
        }else{
            res.status(404).json({Message: "Ship does not exist!"});
        }
    } catch (err) {
        console.error(err.message);
    }
})

//Post a new crew member on a ship

app.post("/ships/:shipId/crewmembers",async (req,res,next)=>{
    try {
        const ship=await Ship.findByPk(req.params.shipId);
        if(ship){
            const crewMember= req.body;
            crewMember.shipId=req.params.shipId;
            console.log(crewMember);
            await CrewMember.create(crewMember);
            res.status(201).json({message: "Crew member created"});
        }
        else{
            res.status(404).json({message: "404 - ship not found"});
        }
    } catch (err) {
        next(err);
    }
});


//Update a certain crew member of a certain ship

app.put("/ships/:shipId/crewmembers/:crewId", async (req,res,next)=>{
    try {
        const ship= await Ship.findByPk(req.params.shipId);
        if(ship){
            const crewMembers= await ship.getCrewMembers({
                where : {
                    id: req.params.crewId,
                },
            });
            const crewMember= crewMembers.shift();
            if(crewMember){
                await crewMember.update(req.body);
                res.status(200).json({message: "Crew member modified"})
            }
            else{
                res.status(404).json({message: "Crew member not found!"});
            }
        }else{
            res.status(404).json({message: "Ship not found!"});
        }
    } catch (err) {
        next(err);
    }
})

//Delete a certain crew member from a certain ship

app.delete("/ships/:shipId/crewmembers/:crewId", async (req,res,next)=>{
    try {
        const ship= await Ship.findByPk(req.params.shipId);
        if(ship){
            const crewMembers= await ship.getCrewMembers({
                where : {
                    id: req.params.crewId,
                },
            });
            const crewMember= crewMembers.shift();
            if(crewMember){
                await crewMember.destroy();
                res.status(200).json({message: "Crew member deleted!"})
            }
            else{
                res.status(404).json({message: "Crew member not found!"});
            }
        }else{
            res.status(404).json({message: "Ship not found!"});
        }
    } catch (err) {
        next(err);
    }
})