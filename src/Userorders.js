import React, { useState, useEffect, useContext, useRef, useCallback }  from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth"
import Header from './header';


const Userorders = () => {
    let [orders, setOrders] = useState([])
    let [reversed, setReversed] = useState(false)
    // let [data, setData] = useState({})
    let [refresh, setRefresh] = useState(false)
    let auth = useContext(AuthContext)
    let navigate = useNavigate()
    let [countries, setCountries] = useState([])
    let [countryId, setCountryId] = useState('')
    let [hotels, setHotels] = useState([])

    useEffect(() => {
        let id = auth.getUser()?.id;

        fetch("http://127.0.0.1:8000/api/getreservations/" + id, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
        .then((result) => {
            console.log('res', result)
            setOrders(orders = result); console.log(orders)
        })
    }, []);

    return (
        <>
        <Header />
            <table className = "table-borderless m-2 w-75">
                <thead><tr><td>Visi užsakymai <span className = "text-primary">({orders.length})</span></td></tr></thead>
                <tbody>
                <tr><td><b>Užsakymo ID</b></td><td><b>Viešbutis</b></td><td><b>Rezervacijos patvirtinimas</b></td></tr>
                {orders.map((order, index) => 
                <tr key = {order.id} style = {{fontSize: "1rem", height: "110px"}}> 
                    <td>{order.id}</td>
                    <td>{order.hotels.title}</td>
                    <td>{order.confirmed ? "Patvirtinta" : "Laukia patvirtinimo"}</td>
                </tr>)}
                </tbody>
            </table>
        </>
    );
};

export default Userorders;