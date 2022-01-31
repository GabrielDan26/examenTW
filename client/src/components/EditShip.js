import React,{Fragment,useState,useEffect} from "react";
import axios from 'axios';

const EditShip = () =>{
    const[name,setName]=useState('');
    const[displacement,setDisplacement]=useState();
    
    return(
        <Fragment>
            <h1 className="text-center my-5">Edit a ship</h1>
            <form>
                <p>Change ship name:</p>
                <input className="form-control" type="text" placeholder="movie title"
                value={name}
                onChange={e=> setName(e.target.value)}/>
                <br></br>
                <p>Change ship displacement:</p>
                <input className="form-control" type="text" placeholder=">50"  
                value={displacement}
                onChange={e=> setDisplacement(e.target.value)}/>
                <br></br>
                <button className="btn btn-success mt-5 mb-5" >Add ship</button>

            </form>
        </Fragment>
    )
}


export default EditShip;