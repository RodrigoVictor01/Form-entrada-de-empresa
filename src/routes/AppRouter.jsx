import React from 'react';

import { Routes, Route } from 'react-router-dom';
import CheckInfos from '../views/CheckInfos';
import Home from '../views/Home';



const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' exact element={<Home />}></Route>
            <Route path='/checkinfos' element={<CheckInfos />} ></Route>
        </Routes>
    )


}

export default AppRouter;