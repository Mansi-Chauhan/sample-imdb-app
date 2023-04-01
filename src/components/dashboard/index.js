import React from 'react';
import {
  CNavbar,
  CContainer,
  CNavbarBrand,
  CForm,
  CFormInput,
  CButton,
  CCol,
  CRow,
} from '@coreui/react'
import { useDispatch, useSelector } from "react-redux";
import { loadmovies } from "../../store/movie";
import { useEffect } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { useNavigate } from "react-router-dom";

import './dashboard.css'

// SEARCH INPUT
const SearchBar = () => {

  const [searchedWord, setSearchedWord] = React.useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadmovies(searchedWord));
    // eslint-disable-next-line
  }, [searchedWord]);

  return <>
    <CFormInput type="search" className="me-2" placeholder="Search Movie..." onChange={(event) => { setSearchedWord(event) }} />
  </>

}

// DASHBOARD
const Dashboard = () => {

  const navigate = useNavigate();

  const [movieList, setMovieList] = React.useState([]);
  const [movieHostory, setMovieHistory] = React.useState([]);

  let movies = useSelector((state) => state.list);

  useEffect(() => {
    var moviesArray = []
    if (Object.keys(movies).length) {
      movies.d.forEach(element => {
        var movie = { data: element }
        moviesArray.push(movie)
      });
    }
    setMovieList([...movieList, ...moviesArray])
    // eslint-disable-next-line
  }, [movies])


  const updateHistory = (id) => {
    setMovieHistory([...movieHostory, ...[id]])
  }

  const onHistoryButtonClick = () => {
    navigate('/history/')
  }

  return <>
    <div style={{ "margin": "8%" }} >
      <CNavbar colorScheme="light" className="bg-light" style={{ "borderRadius": "12px" }}>
        <CContainer fluid >
          <CRow className="w-100 p-3">
            <CCol md="3" style={{ "textAlign": "center" }}>
              <CNavbarBrand href="#"><strong style={{ "fontSize": "x-large" }}>IMDb</strong></CNavbarBrand>
            </CCol>
            <CCol md="9">
              <CForm className="d-flex">
                <SearchBar />
                <CButton type="submit" color="warning" style={{ "marginLeft": "2px", "backgroundColor": "#c9b617" }} onClick={onHistoryButtonClick}>
                  History
                </CButton>
              </CForm>
            </CCol>
          </CRow>
          <CRow className="w-100 p-3" style={{ "backgroundColor": "fcfeff" }}>
            {movieList.length && <Movies movieList={movieList} updateHistory={updateHistory} />}
          </CRow>
        </CContainer>
      </CNavbar>
    </div>
  </>
}

const Movies = (props) => {
  const navigate = useNavigate();
  const data = props.movieList
  const tableData = []
  data.forEach(element => {
    tableData.push({ 'id': element.data.id, 'title': element.data.l, 'year': element.data.y, 'genre': element.data.q, 'image': element.data.i ? element.data.i.imageUrl : '' })
  });
  const columns = [
    {
      dataField: 'image',
      // text: 'Image',
      headerClasses: "theader",
      formatter: (cell, row, rowIndex, formatExtraData = {}) => (
        <div >
          <CRow style={{"height":"130px"}}>
            <CCol md= {3}>
            {row.image !== "" ?
            <a href={row.image}><img alt="stack overflow" src={row.image} style={{ "width": "100px", "height": "120px" }}></img></a>
            :
            <i class="fa fa-pencil" aria-hidden="true"></i>}
           
            </CCol>
            <CCol md= {9} style={{"textAlign":"left"}}>
            <CRow><h4>{row.title}</h4></CRow>
            <CRow><h4 style={{"color":"gray"}}>Genre:&nbsp;<span>{row.genre}</span></h4></CRow>
            <CRow><h5>{row.year} </h5></CRow>
            </CCol>
          </CRow>
         
        </div>
      )
    },
  ]

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      props.updateHistory(row.id)
      var history = JSON.parse(localStorage.getItem("moviehistory") || "{}")
      if (Object.keys(history).length) {
        history.push(row)
        localStorage.setItem('moviehistory', JSON.stringify(history));
      }
      else {
        localStorage.setItem('moviehistory', JSON.stringify([row]));
      }
      var path = '/synopses/' + row.id
      navigate(path, { state: { data: row } })
    }
  };

  return <BootstrapTable
    keyField='id'
    data={tableData}
    columns={columns}
    hover={true}
    rowEvents={rowEvents}
    condensed={true}
    // bordered
  // striped
  />
}

export default Dashboard;