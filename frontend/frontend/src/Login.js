const handleLogin = async () => {
  try {
    console.log("Login clicked");

    const res = await axios.post(`${API}/api/login`, {
      email,
      password
    });

    console.log("Response:", res.data);

    localStorage.setItem("token", res.data.token);

    alert("Login success ✅");

    navigate("/dashboard"); // 🔥 IMPORTANT

  } catch (err) {
    console.log(err);
    alert("Login failed ❌");
  }
};