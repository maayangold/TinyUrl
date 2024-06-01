
function login() {
    fetch("http://localhost:3000/login", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email: "maayan@example.com", password: "123456" }),
    }).then((res) => {
      res.json().then((data) => {
        console.log("token", data.accessToken);
        localStorage.setItem("accessToken", data.accessToken);
      });
    });
  }

  function getUsers() {
    const token = localStorage.getItem("accessToken");
    fetch("http://localhost:3000/users", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      res.json().then((data) => {
        console.log("users", data);
      });
    });
  }
  