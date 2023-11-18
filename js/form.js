"use strict";

/* Pop-up properties */
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
    /* Elements Listener */
    const form = document.querySelector("#form-email");
    const popUp = document.querySelector("#pop-up");
    const popUpOverlay = document.querySelector("#pop-up-overlay");
    const popUpClose = document.querySelector("#pop-up-close");
    const popUpTitle = document.querySelector("#pop-up-title");
    const popUpMessage = document.querySelector("#pop-up-message");
    const popUpIcon = document.querySelector("#pop-up-icon");

    /* Functions */
    /**
     * Show the pop-up with the given properties
     *
     * @param {*} { title, message, icon }
     */
    const showPopUp = ({ title, message, icon }) => {
        popUpTitle.textContent = title;
        popUpMessage.textContent = message;
        popUpIcon.textContent = icon;

        popUp.classList.remove("hidden"); // Show the pop-up
        popUpOverlay.classList.remove('hidden');
        setTimeout(() => hidePopUp(), 5000); // Hide the pop-up after 5 seconds
    };

    /**
     * Hide the pop-up
     *
     */
    const hidePopUp = () => {
        popUp.classList.add('hidden');
        popUpOverlay.classList.add('hidden');
    };

    const hidePopUpOverlay = (event)=> {
        if (event.target === popUpOverlay) {
            popUp.classList.add('hidden');
            popUpOverlay.classList.add('hidden');
        }
    }

    /**
     * Handle the form submission
     *
     * @param {*} event
     */
    const handleFormSubmit = async (event) => {
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
    }

    /* Event Listener */
    form.addEventListener("submit", handleFormSubmit); // Handle the form submission
    popUpOverlay.addEventListener('click', hidePopUpOverlay); // Hide the pop-up when the user clicks on the overlay
    popUpClose.addEventListener("click", hidePopUp); // Hide the pop-up when the user clicks on the close button
});