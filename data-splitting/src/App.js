import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navbar';
import UsersList from './usersList';
import LinksList from './linksList';
import TinyUrlAnalytics from './tinyUrlAnalytics';
import Login from './Login';

const App = () => {
  return (
    <Router>
    <div>
      <Navbar />
      <Routes>
        <Route path="/users" element={<UsersList />} />
        <Route path="/links" element={<LinksList />} />
        <Route path="/analytics" element={<TinyUrlAnalytics />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  </Router>
  );
};

export default App;
  // function login() {
  //   fetch("http://localhost:3000/login", { 
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({name: "maayan", password: "123456" }),
  //   }).then((res) => {
  //     res.json().then((data) => {
  //       console.log("token", data.accessToken);
  //       localStorage.setItem("accessToken", data.accessToken);
  //     });
  //   });
  // }

  // function getUsers() {
  //   const token = localStorage.getItem("accessToken");
  //   fetch("http://localhost:3000/users", {
  //     headers: { Authorization: `Bearer ${token}` },
  //   }).then((res) => {
  //     res.json().then((data) => {
  //       console.log("users", data);
  //     });
  //   });
  // }