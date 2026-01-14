//BACK TO TOP BUTTON FOR ALL PAGES

// Code sourced from: https://mdbootstrap.com/docs/standard/extended/back-to-top/

// Get the back to top button element by its ID (backToTop button id in ejs pages)
const backToTopButton = document.getElementById("backToTop");

// Show button after scrolling down 100px
window.onscroll = function () {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    // shows the button if user has scrolled past 100px on the page
    backToTopButton.style.display = "block";
  } else {
    // hides the button if user has not scrolled past 100px on the page
    backToTopButton.style.display = "none";
  }
};

// Scroll smoothly to top via EventListener (when button is clicked)
backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    // scroll back to top (0)
    top: 0,
    // makes the scroll animated instead of jumping instantly
    behavior: "smooth"
  });
});

