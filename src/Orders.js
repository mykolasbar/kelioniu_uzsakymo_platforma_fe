import React, { useState, useEffect, useContext, useRef, useCallback }  from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth"

const Orders = () => {

    let [orders, setOrders] = useState([])
    let [data, setData] = useState({})
    let [refresh, setRefresh] = useState(false)
    let auth = useContext(AuthContext)
    let [reversed, setReversed] = useState(false)
    let [orderId, setOrderId] = useState('')


    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/orders/", {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
        .then((result) => {setOrders(orders = result); console.log(orders)})
    }, [refresh]);

    let confirmReservation = (orderId, event) => {
        // event.preventDefault()
        fetch("http://127.0.0.1:8000/api/confirmreservation/" + orderId, {method: 'PUT'})
        // .then(console.log(JSON.stringify(data)))
        .then(() => {
        setData({})
        setRefresh(!refresh)})
    }

    let sortByX = () => {
        setReversed(!reversed)
        orders.sort((a, b) => {return reversed ? a.price-b.price : b.price-a.price})
        setOrders([...orders])
    }

    return (
        <>
            <table className = "table-borderless m-3 w-75">
                <thead><tr><td>Visi užsakymai <span className = "text-primary">({orders.length})</span></td></tr></thead>
                <tbody>
                <tr><td><b>Vartotojas</b></td><td onClick={()=>sortByX()}><b>Viešbutis</b></td><td><b>Rezervacijos patvirtinimas</b></td></tr>
                {orders.map((order, index) => 
                <tr key = {order.id} style = {{fontSize: "1rem", height: "110px"}} className = "m-2"> 
                    <td className = "m-2">{order.user.name}</td>
                    <td className = "m-2">{order.hotels.title}</td>
                    <td className = "m-2">{(order.confirmed == 0) ? <td><input name = {order.id} type = "submit" value = "Patvirtinti užsakymą" className="btn btn-dark btn-sm m-2" onClick={(event) => {confirmReservation(order.id)}}></input></td> : <strong>Patvirtinta</strong>}</td>    
                </tr>)}
                </tbody>
            </table>
        </>
    );
};

export default Orders;