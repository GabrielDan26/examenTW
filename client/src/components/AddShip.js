import React,{Fragment,useState,useEffect} from "react";
import axios from 'axios';

const AddShip = () =>{
    const[name,setName]=useState('');
    const[displacement,setDisplacement]=useState();
    
    const addHandler = async (e)=>{
        e.preventDefault();
        const data= {
            name:name,
            displacement:displacement,
        }
        console.log(data);
        await axios.post('http://localhost:8080/ships',data);
        window.location= "/";
    }


    return(
        <Fragment>
            <h1 className="text-center my-5">Add a ship</h1>
            <form>
                <p>Ship name:</p>
                <input className="form-control" type="text" placeholder="movie title"
                value={name}
                onChange={e=> setName(e.target.value)}/>
                <br></br>
                <p>Ship displacement:</p>
                <input className="form-control" type="text" placeholder=">50"  
                value={displacement}
                onChange={e=> setDisplacement(e.target.value)}/>
                <br></br>
                <button className="btn btn-success mt-5 mb-5" onClick={addHandler}>Add ship</button>

            </form>
        </Fragment>
    )
}


export default AddShip;