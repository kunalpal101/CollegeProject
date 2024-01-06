//const { response } = require("express");

//const back_uri = window.location.href.replace(/\/$/, "");
const back_uri = "https://smoggy-boa-sun-hat.cyclic.app";

function date_now() {
  if (document.querySelector("#date").value == "") {
    document.querySelector("#date").valueAsDate = new Date();
  } else {
    document.querySelector("#date").value = "";
  }
}

var username, password;

const start_prg = function () {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);
  username = urlParams.get("usename");
  password = urlParams.get("password");

  const elements = document.getElementById("nav-title");
  elements.innerHTML =
    "<i class='bi bi-person-circle'></i>   Welcome, " + username;
};

start_prg();

function submit_mem() {
  const mem_date = document.getElementById("date").value,
    mem_time = document.getElementById("time").value,
    mem_privacy =
      document.getElementById("private_1").checked == true
        ? "private"
        : "public",
    mem_head = document.getElementById("mem-header").value,
    mem_desc = document.getElementById("mem-desc").value;

  fetch(back_uri + "/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      time: mem_time,
      date: mem_date,
      privacy: mem_privacy,
      heading: mem_head,
      body: mem_desc,
    }),
  })
    .then((response) => {
      console.log("H");
      if (response.status == 200) window.alert("Submitted succesfully");
      else window.alert("Error");
    })
    .catch((err) => {
      console.log("Exception: " + err);
    });
}

function generate() {
  fetch(back_uri + "/fetchmem", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username }),
  })
    .then((res) => {
      if (res.status == 200) {
        const data = res.json();
        const size = data.length;

        //for custom images
        var unsplash = 500;
        document.getElementById("cols").innerHTML = "";

        let getMem = function () {
          for (let i = 0; i < size; i++, unsplash++) {
            let body = document.createElemetn("div");
            body.className = "card-col";
            body.ontouchstart = "this.classList.toggle('hover');";
            body.innerHTML =
              "<div class='card-container'> <div class='front' onload='boom();' style='background-image: url(https://unsplash.it/" +
              unsplash +
              "/" +
              unsplash +
              "/);'>" +
              " <div class='inner'> <p>" +
              data[i].memories.heading +
              "</p> <span>" +
              data[i].memories.date +
              "</span> </div> </div>" +
              "<div class='back'> <div class='inner'> <p>" +
              data[i].memories.description +
              " </p></div> </div></div>";

            document.getElementById("cols").appendChild(body);
          }
        };
        getMem();
        function blur_thingy() {
          document
            .getElementById("own-mem-wrapper")
            .classList.remove("blur-effect");
          document.getElementById("loader-block").style.visibility = "hidden";
        }

        setTimeout(blur_thingy, 4500);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
