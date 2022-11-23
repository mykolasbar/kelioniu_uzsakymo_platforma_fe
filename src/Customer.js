import React, { useState, useEffect, useContext, useRef, useCallback }  from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth"
// import Getmeal from './meal';
import Header from './header';

const Customer = () => {
    let [reversed, setReversed] = useState(false)
    let [data, setData] = useState({})
    let [refresh, setRefresh] = useState(false)
    let auth = useContext(AuthContext)
    let navigate = useNavigate()
    let [countries, setCountries] = useState([])
    let [countryId, setCountryId] = useState('')
    let [hotels, setHotels] = useState([])

    // if (!auth.isLoggedin()) {navigate("/login");}

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/countries?embed=hotels")
        .then(response => response.json())
        .then((result) => {setCountries(countries = result)})
    }, []);


    useEffect(() => {
        if (countryId == "visos")
        fetch("http://127.0.0.1:8000/api/hotels/", {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        else fetch("http://127.0.0.1:8000/api/hotels/" + countryId, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
        .then((result) => {setHotels(hotels = result)})
        .then(() => {console.log(hotels)})
    }, [countryId]);

    let sortByX = () => {
        setReversed(!reversed)
        hotels.sort((a, b) => {return reversed ? a.price-b.price : b.price-a.price})
        setHotels([...hotels])
    }

    let handleSubmit = (event) => {
        event.preventDefault()
        fetch("http://127.0.0.1:8000/api/addreservation", {method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.getToken()}` }, body: JSON.stringify(data)})
        .then(() => {
            console.log(data)
        setData({})
        setRefresh(!refresh)})
    }
        
    return (
        <>
        <Header />
            <div className="d-flex flex-column">
                <div className = "m-3">
                    <div>
                        <label><span>Filtruoti pagal šalį: &nbsp;</span></label>
                             <select onChange={(event)=>{setCountryId(event.target.value); if (event.target.value === "visos") setCountryId(''); console.log(countryId)}} name = "countries_id">
                                <option default value = "visos">Visos</option>
                                { countries.map((country) => 
                                <option name = "restaurants_id" className = "m-4" key = {country.id} value = {country.id}> 
                                    {country.id} {country.name} 
                                </option>) }
                            </select>
                    </div>
                    <form onSubmit = { handleSubmit }>
                    <table className = "table-borderless m-2 w-75">
                        <thead><tr><td>Visi viešbučiai <span className = "text-primary">({hotels.length})</span></td></tr></thead>
                        <tbody>
                        <tr><td><b>Viešbutis</b></td>
                        <td name = "kaina" onClick={()=>sortByX()}><b>Kaina</b></td>
                        <td name = "nuotrauka" ><b>Nuotrauka</b></td>
                        <td name = "trukme" onClick={(e)=>sortByX(e.target.name)}><b>Kelionės trukmė</b></td>
                        {auth.isLoggedin() ? (<td><b>Užsakymas</b></td>) : ("")}</tr>
                        {hotels.map((hotel, index) => 
                        <tr key = {hotel.id} style = {{fontSize: "1rem", height: "110px"}}> 
                            <td>{hotel.title}</td>
                            <td>{hotel.price}</td>
                            <td>{hotel.picture !== "" || null ? <img src= {'http://localhost:8000/' + hotel.picture}  alt = {hotel.picture} style = {{maxWidth: "200px", maxHeight: "100px", border: "1px solid"}}/> : "Nuotraukos nėra"}</td>
                            <td>{hotel.durationofjourny}</td>
                            <td><input type = "submit" name = {hotel.id} value = "Rezervuoti" className="btn btn-dark btn-sm m-2" onClick={(event) => {setData({ ...data, hotels_id: event.target.name, user_id: auth.getUser().id }); console.log(data)}}></input></td>
                        </tr>)}
                        </tbody>
                    </table>
                    </form>
                </div> 
            </div>
        </>
    );
};

export default Customer;

{/* <AverageEvaluation mealId = {meal.id} restaurantId = {restaurantId}/> */}

{/* <td><Getmeal id = {meal.id} /></td> */}