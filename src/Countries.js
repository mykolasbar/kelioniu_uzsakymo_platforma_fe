import React, { useState, useEffect, useContext, useRef }  from 'react';
import { BrowserRouter, Route, Routes, Outlet, useNavigate, Link } from "react-router-dom";
import { AuthContext, AuthProvider } from './Auth';
import Header from './header';


const Countries = () => {
    let [countries, setCountries] = useState([])
    let [data, setData] = useState({})
    let [refresh, setRefresh] = useState(false)
    let auth = useContext(AuthContext)
    let navigate = useNavigate()

    const handleData = (event) => {
            setData({...data, [event.target.name] : event.target.value })
        }

    useEffect(() => {
            fetch("http://127.0.0.1:8000/api/countries?embed=hotels")
            .then(response => response.json())
            .then((result) => {setCountries(countries = result); console.log(countries)})
        }, [refresh]);

    let handleSubmit = (event) => {
            event.preventDefault();
            fetch("http://127.0.0.1:8000/api/newcountry", {method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.getToken()}` }, body: JSON.stringify(data)})
            .then(console.log(JSON.stringify(data)))
            .then(() => {
            // setData({})
            setRefresh(!refresh)
        })
    }

    let deleteCountry = (id, event) => {
            console.log(id)
            fetch("http://127.0.0.1:8000/api/deletecountry/" + id, {method: 'DELETE', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.getToken()}` }})
            .then((response) => {
                setRefresh(!refresh)
            })
        }

    return (
        <>

            <div className="d-flex flex-column aligns-items-center justify-content-center container">
                <div className="container w-100 m-3 d-flex flex-column">
                    <table className = "table-borderless m-2 w-100 border-0"><tbody>{ countries.map((post) => 
                        <tr key = {post.id} className = "m-2"> 
                            <td><span><Link to={'/editcountry/' + post.id} style={{color:"black"}}><strong>{post.name}</strong></Link></span></td>
                            <td><span><strong>{post.season}</strong></span></td>
                            {/* <td><i>{new Date(post.created_at).toLocaleDateString('lt-LT')} </i>{new Date(post.created_at).toLocaleTimeString('lt-LT')}</td> */}
                            <td><button onClick={ () => {deleteCountry(post.id)} } className="btn btn-dark btn-sm m-2 rounded-0">Ištrinti</button></td>
                            <td><button className="btn btn-dark btn-sm m-2 rounded-0"><Link to={'/editcountry/' + post.id} style={{textDecorationLine: "none"}}>Atnaujinti</Link></button></td>
                        </tr>) }
                        </tbody>
                    </table>
                    <div className = "card border-1 mt-5 p-2 w-75 rounded-0">
                        <form onSubmit = { handleSubmit }>
                        <span className = "card border-0 mt-4"><h3>Pridėti naują šalį</h3></span>
                        <div className="form-group mt-2">
                            <input className="form-control h-100" type = "text" name = "name" onChange={handleData} placeholder = "Šalies pavadinimas"></input>
                        </div>
                        <div className="form-group mt-2">
                            <input className="form-control h-100" type = "text" name = "season" onChange={handleData} placeholder = "Sezonas"></input>
                        </div>
                        {/* <div className="form-group mt-2">
                            <input className="form-control h-75" type = "text" name = "adresas" onChange={handleData} placeholder = "Adresas"></input>
                        </div>
                        <div className="form-group mt-2">
                            <input className="form-control h-75" type = "text" name = "darbolaikas" onChange={handleData}  placeholder = "Darbo laikas"></input>
                        </div> */}
                            <input type = "submit" value = "Pridėti" className="btn btn-dark btn-sm m-2"></input>
                        </form>
                    </div>
                </div>
            </div> 
        </>
    );
};

export default Countries;