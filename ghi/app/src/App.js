import logo from './logo.svg';
import './App.css';
import Nav from './Nav';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendeeForm from './AttendeeForm';
import PresentationForm from './PresentationForm';
import MainPage from './MainPage';

function App(props) {
  if(props.attendees === undefined){
    return null;
  }
  return (
    <BrowserRouter>
    <Nav />
      <Routes>
    <Route index element={<MainPage />} />
    <Route path='/locations/new' element={< LocationForm/>} />
    <Route path='/attendees' element={<AttendeesList attendees = {props.attendees} />} />
    <Route path='/conferences/new' element={< ConferenceForm/>} />
    <Route path='/attendees/new' element={< AttendeeForm/>} />
    <Route path='/presentations/new' element={<PresentationForm/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
