import React, { useEffect } from 'react';
import axios from "axios";
import {
    CCard,
    CCardImage,
    CCardBody,
    CCardTitle,
    CCardText,
    CContainer
} from '@coreui/react'
import { useLocation } from "react-router-dom";



const Synopses = (props) => {

    const [synopsisData, setSynopsisData] = React.useState([]);

    // to access state data
    const { state } = useLocation();

    // api call to get synopses data
    async function getData() {
        const method = "GET"
        let headers = {
            'X-RapidAPI-Key': 'ZlwRwvmaLXmshZL92nWYO5mP5HVdp1HdeREjsnZF4hOiIu9xJ8',
            'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
        }
        const response = await axios.request({
            baseURL: "https://run.mocky.io/v3/ca5c18c0-5ecc-4547-b30a-e78d8116757a",
            method,
            headers
        });

        return response
    }

    useEffect(() => {
        getData().then((response) => {
            setSynopsisData(response.data)
        })
    }, [])

    return <>
        <div style={{ "margin": "40px" }}>
            {synopsisData && <CContainer>
                <CCard className="mb-3" style={{ "alignItems": "center" }}>
                    <CCardImage orientation="top" src={state.data.image} style={{ "width": "30%", "marginTop": "10px" }} />
                    <CCardBody>
                        <CCardTitle><strong>{state.data.title}</strong></CCardTitle>
                        <CCardText><small className="text-medium-emphasis">Year : {state.data.year} Genre: {state.data.genre}</small></CCardText>
                        {synopsisData.length && <CCardText>{synopsisData[0].text}</CCardText>}
                    </CCardBody>
                </CCard>
            </CContainer>}
        </div>
    </>
}

export default Synopses;