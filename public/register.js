<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login & Register</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <div class="form-container">
      <div class="form-box login-box">
        <h2>Login</h2>
        <form action="#" method="POST">
          <div class="input-group">
            <label for="login-email">Email</label>
            <input type="email" id="login-email" name="email" required>
          </div>
          <div class="input-group">
            <label for="login-password">Password</label>
            <input type="password" id="login-password" name="password" required>
          </div>
          <button type="submit" class="submit-btn">Login</button>
        </form>
        <p class="toggle-form">Don't have an account? <span onclick="toggleForm()">Register</span></p>
      </div>

      <div class="form-box register-box">
        <h2>Register</h2>
        <form action="#" method="POST">
          <div class="input-group">
            <label for="register-email">Email</label>
            <input type="email" id="register-email" name="email" required>
          </div>
          <div class="input-group">
            <label for="register-password">Password</label>
            <input type="password" id="register-password" name="password" required>
          </div>
          <div class="input-group">
            <label for="register-confirm-password">Confirm Password</label>
            <input type="password" id="register-confirm-password" name="confirm-password" required>
          </div>
          <button type="submit" class="submit-btn">Register</button>
        </form>
        <p class="toggle-form">Already have an account? <span onclick="toggleForm()">Login</span></p>
      </div>
    </div>
  </div>

  <script>
    function toggleForm() {
      const loginBox = document.querySelector('.login-box');
      const registerBox = document.querySelector('.register-box');
      loginBox.classList.toggle('active');
      registerBox.classList.toggle('active');
    }
  </script>
</body>
</html>
```

### CSS (styles.css)

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  width: 100%;
  max-width: 400px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-container {
  display: flex;
  flex-direction: column;
}

.form-box {
  padding: 20px;
  display: none;
  flex-direction: column;
}

.form-box h2 {
  text-align: center;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  font-size: 14px;
  color: #333;
}

.input-group input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-btn {
  background-color: #4CAF50;
  color: white;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #45a049;
}

.toggle-form {
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
}

.toggle-form span {
  color: #007BFF;
  cursor: pointer;
}

.login-box.active, .register-box.active {
  display: flex;
}

.login-box {
  display: flex;
}

.register-box {
  display: none;
}
`
