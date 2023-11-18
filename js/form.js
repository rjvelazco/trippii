"use strict";

const popSucessProps = {
    title: "You are on the waitlist",
    message: "Thanks for joining. We will notify you as soon as the product becomes available. Follow our social channels to stay tuned!",
    icon: `check_circle`,
}

const popErrorProps = {
    title: "Something went wrong...",
    message: "Please try again later",
    icon: `Cancel`
}

window.addEventListener("load", function () {
    const form = document.querySelector("#form-email");
    const popUp = document.querySelector("#pop-up");
    const popUpClose = document.querySelector("#pop-up-close");
    const popUpTitle = popUp.querySelector("#pop-up-title");
    const popUpMessage = popUp.querySelector("#pop-up-message");
    const popUpIcon = popUp.querySelector("#pop-up-icon");

    const showPopUp = ({ title, message, icon }) => {
        popUpTitle.textContent = title;
        popUpMessage.textContent = message;
        popUpIcon.textContent = icon;

        popUp.classList.remove("hidden"); // Show the pop-up
        setTimeout(() => hidePopUp(), 5000); // Hide the pop-up after 5 seconds
    };

    const hidePopUp = () => popUp.classList.add("hidden");

    popUpClose.addEventListener("click", () => hidePopUp());

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const emailInput = document.querySelector("#email");
        const email = emailInput.value;

        // Hide the pop-up immediately when the submit button is clicked
        hidePopUp();

        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email }),
            });
            
            const data = await response.json();
            
            emailInput.value = "";
            showPopUp(popSucessProps);
            console.log("Success:", data);
        } catch (error) {
            showPopUp(popErrorProps);
            console.error("Error:", error);
        }
    });
});