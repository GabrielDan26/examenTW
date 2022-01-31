import React,{Fragment,useState,useEffect,useRef} from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';


const ListShips =() =>{

    const [ships,setShips] =useState([]);

    useEffect(()=>{
        const getShips= async () =>{
            const {data} = await axios.get('http://localhost:8080/ships');
            console.log(data)
            setShips(data);
        }
        getShips();
    },[]);

    const deleteShip= async (id) =>{
        await axios.delete(`http://localhost:8080/ships/${id}`);
        setShips(ships.filter(ship=>ship.id!==id));
    }

    return (
        <Fragment>
            {""}
            <h1 className="text-center my-5">List of ships</h1>
           
            <Link to='/add' className="btn btn-success">Add ship</Link>
            
           

            <ul className="list-group-flush mb-5 mt-5">
                {
                ships.map(ship=>(
                            <li key={ship.id}>
                                Name of the ship: {ship.name}
                                <br></br>
                                Displacement of the ship: {ship.displacement}
                                <br></br>
                                    
                                <Link to='/edit' className="btn btn-warning mt-3">Edit ship</Link>
                                <br></br>
                                <button className="btn btn-danger mt-3 mb-5" onClick={()=>deleteShip(ship.id)}>Delete</button>
                            </li>
                        ) )
                }
                
            </ul>

             <br></br>
        </Fragment>
    )

}



export default ListShips;