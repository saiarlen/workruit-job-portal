import React from 'react';
import { Route, Routes } from "react-router-dom"
import WrtMainPage from './pages/WrtMainPage';



export default function WrtRoutes() {
    return (
        <Routes>

            <Route exact path="/" element={ <WrtMainPage/> } /> 
            {/* <Route exact path="/post-job"> </Route> */}

        </Routes>
    )
}
