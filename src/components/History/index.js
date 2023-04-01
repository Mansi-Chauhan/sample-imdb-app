import React from 'react';
import {
    CListGroup,
    CContainer,
    // CButton,
    CRow
} from '@coreui/react'
import { useNavigate } from "react-router-dom";

const MoviesHIstory = () => {

    const navigate = useNavigate();

    var history = JSON.parse(localStorage.getItem("moviehistory") || "{}")

    const buttonOnclick = (e, data) => {
        e.preventDefault();
        var path = "/synopses/" + data.id
        navigate(path, { state: { data: data } })
    }

    return <>
        <CContainer style={{ "marginTop": "30px", "backgroundColor": "rgb(253 252 252)", "boxShadow": "5px 5px 5px"}}>
            <CRow className='pt-3'>
                <h1> History </h1>
            </CRow>
            <hr></hr>
        {history && history.map((data) => {
            var path = "/synopses/" + data.id
            return (
                // <CContainer >
                    <CRow className="w-100 p-3" style={{"backgroundColor":"gray !importatnt"}}>
                    <CListGroup style={{"backgroundColor":"gray !importatnt"}}>
                        {/* <CButton color="secondary" key={data.id} onClick={() => buttonOnclick(data)}> {data.title} </CButton> */}
                        <div className="nav-right nav-menu">
                        <a href={path} onClick={(e) => buttonOnclick(e, data)} style={{"color":"black"}}>
                        {data.title}
                        
                        </a>
                        {data.year && data.genre && <strong>&nbsp;,{data.year},&nbsp;{data.genre}</strong>}
                        
                    </div>
                    </CListGroup>
                    </CRow>
                // </CContainer>
                )
        })}
        </CContainer>
    </>

}

export default MoviesHIstory;