import React, { useState, useEffect, useContext, useRef }  from 'react';
import { AuthContext } from "./Auth"
import Header from './header';
import { Link, useNavigate, useParams } from "react-router-dom";

const NewHotel = () => {

    let { id } = useParams();
    let [post, setPost] = useState([])
    let navigate = useNavigate('')
    let [refresh, setRefresh] = useState(false)
    let [countries, setCountries] = useState([])
    let auth = useContext(AuthContext)
    let [data, setData] = useState({})


    var formData = new FormData();

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/countries?embed=hotels")
        .then(response => response.json())
        .then((result) => {setCountries(countries = result); console.log(countries)})
    }, [refresh]);

    let handleSubmit = (event) => {
        event.preventDefault();
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1])
        }
        fetch("http://127.0.0.1:8000/api/newhotel", {method: 'POST', headers: { Authorization: `Bearer ${auth.getToken()}`  }, body: formData})
        .then(console.log(JSON.stringify(data)))
        .then((response) => {
            console.log(response)
            setData({})
            // navigate("/admin");
        })
    }

    // useEffect(() => {
    //     fetch("http://127.0.0.1:8000/api/hotels/" + id, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
    //     .then(response => response.json())
    //     .then((result) => {setPost(post = result)})
    //     }, [refresh]);
        
    return (
        <>            
        <div className="d-flex aligns-items-center justify-content-center">   
            <div className=" w-75 m-3">
                <span className = "card border-0 m-2"><h3>Pridėti naują viešbutį</h3></span>
                {<form onSubmit = { handleSubmit } id = "hotel" encType="multipart/form-data">
                    <div className="form-group m-2">
                        {/* <input className="form-control" type = "text" name = "patiekalopavadinimas" onChange={(event) => setData({ ...data, patiekalopavadinimas: event.target.value })} placeholder="Patiekalo pavadinimas"></input> */}
                        <input className="form-control" value = { post.title } type = "text" name = "name" onChange={(event) => formData.append('title', event.target.value)} placeholder="Viešbučio pavadinimas"></input>
                    </div>
                    <div className="form-group m-2">
                        {/* <input className="form-control h-75" type = "text" name = "kaina" onChange={(event) => setData({ ...data, kaina: event.target.value })} placeholder="Patiekalo kaina"></input> */}
                        <input className="form-control" value = { post.price } type = "text" name = "price" onChange={(event) => formData.append('price', event.target.value)} placeholder="Kaina"></input>
                    </div>
                    <div className="form-group m-2">
                        <label htmlFor="formFileDisabled" className="form-label">Įkelkite viešbučio nuotrauką</label>
                        {/* <input className="form-control" type="file" name = "nuotrauka" onChange={(event) => {setData({ ...data, nuotrauka: event.target.files })}} placeholder="Patiekalo nuotrauka" ></input> */}
                        <input className="form-control" type = "file" name = "picture" onChange={(event) => formData.append('picture', event.target.files[0])} placeholder="Nuotrauka"></input>
                    </div>
                    <div className="form-group m-2">
                        <label htmlFor="formFileDisabled" value = { post.durationofjourny } className="form-label">Įrašykite kelionės trukmę</label>
                        {/* <input className="form-control" type="file" name = "nuotrauka" onChange={(event) => {setData({ ...data, nuotrauka: event.target.files })}} placeholder="Patiekalo nuotrauka" ></input> */}
                        <input className="form-control" type = "text" name = "durationofjourny" onChange={(event) => formData.append('durationofjourny', event.target.value)} placeholder="Kelionės trukmė"></input>
                    </div>
                    <div className="form-group m-2">
                    <label className="form-group m-2">Pasirinkite šalį:</label>
                            {/* <select onChange={(event) => setData({ ...data, restaurants_id: event.target.value })} name = "restaurants_id" className="form-control"> */}
                            <select onChange={(event) => formData.append('countries_id', event.target.value)} name = "countries_id" className="form-control">
                                <option value="N/A" className="form-control" ></option>
                            { countries.map((country) => 
                                <option name = "restaurants_id" className = "m-4" key = {country.id} value = {country.id}> 
                                    {country.id} {country.name}
                                </option>) 
                            }
                            </select>
                    <input className="btn btn-dark mt-3 rounded-1" type = "submit" value = "Pridėti viešbutį"></input>
                    </div>
                </form>}
            </div>
        </div>
    </>
    );
};

export default NewHotel;