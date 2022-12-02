import React, { useState, useEffect, useContext }  from 'react';
import Header from './header';
import { Link, useNavigate, useParams } from "react-router-dom";


const EditCountry = () => {

    let { id } = useParams();
    let [post, setPost] = useState([])
    let navigate = useNavigate('')
    let [refresh, setRefresh] = useState(false)


    let handleSubmit = (event) => {
        event.preventDefault()
        fetch("http://127.0.0.1:8000/api/school/" + id, {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)})
        .then(response => console.log(response))
        .then(() => {
            navigate("/admin");
        });
    }

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/countries/" + id, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
        .then((result) => {setPost(post = result)})
        }, [refresh]);
        
    return (
        <>            
        <Header />

        <div className="d-flex aligns-items-center justify-content-center">
        <div className="card w-75 m-3">
            <h2 className = "p-3">Įvesti šalies duomenis</h2>
            {<form onSubmit = { handleSubmit }>
                <div className="form-group m-2">
                    <input className="form-control" type = "text" value = { post.name } name = "name" onChange={(event) => setPost({ ...post, name: event.target.value })}></input>
                </div>
                <div className="form-group m-2">
                    <input className="form-control h-75" value = { post.season } type = "text" name = "season" onChange={(event) => setPost({ ...post, season: event.target.value })} onFocus={() => post.miestas ?? setPost({ ...post, miestas: "" })}></input>
                </div>
                {/* <div className="form-group m-2">
                    <input className="form-control" value = { post.adresas } type = "text" name = "adresas" onChange={(event) => setPost({ ...post, adresas: event.target.value })}></input>
                </div>
                <div className="form-group m-2">
                    <input className="form-control" value = { post.darbolaikas } type = "text" name = "darbolaikas" onChange={(event) => setPost({ ...post, darbolaikas: event.target.value })}></input>
                </div> */}
                <input className="btn btn-dark btn-sm m-2" type = "submit"></input>
            </form>}
        </div>
    </div>
    </>
    );
};

export default EditCountry;