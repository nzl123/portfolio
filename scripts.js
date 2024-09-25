// smooth scroll for header's section links
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// scroll and stick to top
document.querySelector(".top a").addEventListener("click", function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// menu
function toggleMenu() {
    const menu = document.querySelector(".menu");
    menu.classList.toggle("show");
}

// automatically close the menu when one of the section link is clicked
document.querySelectorAll(".menu a").forEach(anchor => {
    anchor.addEventListener("click", () => {
        const menu = document.querySelector(".menu");
        menu.classList.remove("show");
    });
});

// automatically close the menu when the home button is clicked
document.querySelector(".top a").addEventListener("click", () => {
    const menu = document.querySelector(".menu");
    menu.classList.remove("show");
});

// close the menu when click outside of it, excluding header
document.addEventListener("click", (event) => {
    const menu = document.querySelector(".menu");
    const hamBurgerIcon = document.querySelector(".hamburger-icon");
    const header = document.querySelector("header");
    
    // close the menu if the click is outside the menu and the menu icon
    if (!menu.contains(event.target) && !hamBurgerIcon.contains(event.target) && !header.contains(event.target)) {
        menu.classList.remove("show");
    }
});

// collapsible
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".collapsible-toggle").forEach(toggle => {
        const content = toggle.nextElementSibling;
        content.style.display = "none";
        toggle.addEventListener("click", () => {
            const isOpen = content.style.display === "block";
            content.style.display = isOpen ? "none" : "block";
            toggle.parentNode.classList.toggle("active", !isOpen);
        });
    });
});





// form using EmailJS
const form = document.getElementById("contactForm");
const emailInput = form.querySelector("input[name='email']");
let emailError = document.querySelector(".email-error");

// create the error message if it doesnt exist
if (!emailError) {
    emailError = document.createElement("div");
    emailError.classList.add("email-error");
    emailInput.parentNode.appendChild(emailError); // add the error message right below the email input
}

// EmailJS and form submission with validation
form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    let isValid = true;

    // regular expression for email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // check if the email is valid
    if (!emailPattern.test(emailInput.value)) {
        emailInput.style.borderColor = "red";
        emailError.textContent = "Please enter a valid email address (e.g., example@mail.com)";
        emailError.style.display = "block"; // display the error message
        isValid = false;
    } else {
        emailInput.style.borderColor = ""; // reset the border color to default colour
        emailError.style.display = "none"; // hide the error message
    }

    // block EmailJS if email is invalid
    if (!isValid) {
        return;  // stop execution here if email validation fails
    }

    // EmailJS is ONLY called if validation passed
    emailjs.sendForm("personal_portfolio", "personal_portfolio", this)
    .then(function() {
        alert("Message sent successfully!!!");

        // to remember form submission
        sessionStorage.setItem("scrollToContact", "true");

        // refresh the page immediately
        window.location.reload(); // refresh the page and start from the top
    }, function(error) {
        console.log("FAILED...", error);
        alert("Failed to send message. Please try again.");
    });
});

// scroll to the contact section after page refreshed if the form was submitted
if (sessionStorage.getItem("scrollToContact") === "true") {
    // remove the session storage value to prevent multiple scrolls (down to up)
    sessionStorage.removeItem("scrollToContact");

    // add a custom delay to slow down the scrolling effect
    document.addEventListener("DOMContentLoaded", function() {
        setTimeout(function() {
            setTimeout(function() {
                window.scrollTo({ top: 0, behavior: "auto" });
            }, 100);  // brief delay to make sure the page is at the top

            setTimeout(function() {
                document.querySelector("#contact").scrollIntoView({
                    behavior: "smooth"
                });
            }, 100);  // delay
        }, 800);  // delay to slow down the scroll
    });
}
