import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"


function SearchBar() {

    const history=useNavigate();

    const [city,setCity]=useState('')
   

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:8000/",{
                city
            })
            .then(res=>{
                if(res.data=="exist"){
                    history("/home",{state:{id:city}})
                }
                else if(res.data=="notexist"){
                    alert("city not exist")
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }

    }


    return (
        <div className="login">

            <h1>Login</h1>

            <form action="POST">
                <input type="search" onChange={(e) => { setCity(e.target.value) }} placeholder="Search"  />
               
                <input type="submit" onClick={submit} />

            </form>

           

        </div>
    )
}

export default SearchBar