swipeAnimation();

const back_uri = window.location.href.replace(/\/$/, "");

const login_btn = document.getElementById("log-in");
login_btn.onclick = function () {
  const user_id = document.getElementById("log-username").value;
  const user_pwd = document.getElementById("log-password").value;

  fetch(back_uri + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: user_id,
      password: user_pwd,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.Auth == "Success") auth_success(data);
      else if (data.Auth == "Decline") auth_failed();
      else if (data.Auth == "Decline password") auth_failed_password();
    });

  function auth_success(data) {
    window.alert("Login successfull!");
    window.location.href =
      "../HomePage/index.html?username=" +
      data.username +
      "&password=" +
      data.password;
  }

  function auth_failed() {
    window.alert("Login Failed! Username not found!");
  }

  function auth_failed_password() {
    window.alert("Login Failed! Wrong Password");
  }
};

function signup() {
  const sign_id = document.getElementById("sign-user").value,
    sign_pwd = document.getElementById("sign-pass").value,
    sign_cnf_pwd = document.getElementById("sign-cnf-pass").value;

  if (sign_pwd != sign_cnf_pwd) return window.alert("Password missmatch!!");

  fetch(back_uri + "/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: sign_id,
      password: sign_pwd,
    }),
  })
    .then((res) => {
      if (res.status == 200) window.alert("Account Created!");
      else if (res.status == 400) window.alert("Account already exists");
    })
    .catch((err) => {
      console.log("Error: " + err);
    });
}

function swipeAnimation() {
  const signupButton = document.getElementById("signup-button"),
    loginButton = document.getElementById("login-button"),
    userForms = document.getElementById("user_options-forms");

  /**
   * Add event listener to the "Sign Up" button
   */
  signupButton.addEventListener(
    "click",
    () => {
      userForms.classList.remove("bounceRight");
      userForms.classList.add("bounceLeft");
    },
    false
  );

  loginButton.addEventListener(
    "click",
    () => {
      userForms.classList.remove("bounceLeft");
      userForms.classList.add("bounceRight");
    },
    false
  );
}
