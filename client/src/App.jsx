// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UrlShortenerPage from "./pages/UrlShortenerPage";
import UrlStatisticsPage from "./pages/UrlStatisticsPage";
import { AppBar, Toolbar, Button } from "@mui/material";
import "./App.css";
import RedirectPage from "./pages/Redirect";

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Shortener
          </Button>
          <Button color="inherit" component={Link} to="/stats">
            Statistics
          </Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<UrlShortenerPage />} />
        <Route path="/stats" element={<UrlStatisticsPage />} />
        <Route path="/:shortcode" element={<RedirectPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
