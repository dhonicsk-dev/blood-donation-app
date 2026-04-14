const API = "https://blood-backend-6.onrender.com"; // your backend

const handleLogin = async () => {
  try {
    const res = await axios.post(`${API}/api/login`, form);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", form.email);

    alert("Login success ✅");
    navigate("/donors");

  } catch (err) {
    console.log(err.response?.data || err);
    alert("Login failed ❌");
  }
};

const API = "backend-url";   // define once

await axios.post(`${API}/api/login`, form);  // single call