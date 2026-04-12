<script>
const API = "https://blood-backend-6.onrender.com";

// ✅ Register
async function register() {
  try {
    if (!name.value || !email.value || !password.value) {
      alert("All fields required ❌");
      return;
    }

    const res = await fetch(`${API}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value
      })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registered Successfully ✅");
    } else {
      alert(data.message || "Error ❌");
    }

  } catch (err) {
    console.log(err);
    alert("Server error ❌");
  }
}

// ✅ Login
async function login() {
  try {
    if (!lemail.value || !lpassword.value) {
      alert("Enter email & password ❌");
      return;
    }

    const res = await fetch(`${API}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: lemail.value,
        password: lpassword.value
      })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      alert("Login Successful ✅");
      navigate("/dashboard");
    } else {
      alert(data.message || "Login failed ❌");
    }

  } catch (err) {
    console.log(err);
    alert("Server error ❌");
  }
}
</script>