"use strict";

window.addEventListener("load", function () {
  const form = document.querySelector("#form-email");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const emailInput = document.querySelector("#email");
    const email = emailInput.value;

    fetch("https://dotcms-endpoint.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
  });
});
