import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import ContactPage from "./ContactPage";
import Map from "./Map";
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-4">
          <Routes>
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/map" element={<Map />} />
          </Routes>
        </div>
      </div>
    </Router>
    </Provider>
  );
}

export default App;
