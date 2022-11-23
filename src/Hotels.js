import React, { useState, useEffect, useContext, useRef }  from 'react';
import Header from './header';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext, AuthProvider } from './Auth';



const Hotels = () => {
    let [hotels, setHotels] = useState([])
    let [data, setData] = useState({})
    let [refresh, setRefresh] = useState(false)
    let auth = useContext(AuthContext)
    let navigate = useNavigate()


    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/hotels")
        .then(response => response.json())
        .then((result) => {setHotels(hotels = result); console.log(hotels)})
    }, [refresh]);

    let deleteHotel = (id, event) => {
        console.log(id)
        fetch("http://127.0.0.1:8000/api/deletehotel/" + id, {method: 'DELETE', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.getToken()}` }})
        .then((response) => {
            setRefresh(!refresh)
        })
    }

    return (
        <>
            <div className="d-flex flex-column aligns-items-center justify-content-center container">
                <div className="container w-100 m-3 d-flex flex-column">
                    <table className = "table-borderless m-2 w-100 border-0"><tbody>{ hotels.map((post) => 
                        <tr key = {post.id} className = "m-2"> 
                            <td><span><Link to={'/edithotel/' + post.id} style={{color:"black"}}><strong>{post.title}</strong></Link></span></td>
                            <td><span><strong>{post.price}</strong></span></td>
                            <td><span><strong>{post.picture}</strong></span></td>
                            <td><span><strong>{post.durationofjourny}</strong></span></td>
                            {/* <td><i>{new Date(post.created_at).toLocaleDateString('lt-LT')} </i>{new Date(post.created_at).toLocaleTimeString('lt-LT')}</td> */}
                            <td><button onClick={ () => {deleteHotel(post.id)} } className="btn btn-dark btn-sm m-2 rounded-0">Ištrinti</button></td>
                            <td><button className="btn btn-dark btn-sm m-2 rounded-0"><Link to={'/editcountry/' + post.id} style={{textDecorationLine: "none"}}>Atnaujinti</Link></button></td>
                        </tr>) }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Hotels;