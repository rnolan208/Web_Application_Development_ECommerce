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




//Script I got online to ensure anchor links loaded correctly when going from
//jerseyShop or miscShop onto the shopEntire page

//source for the script - https://www.geeksforgeeks.org/html/offsetting-an-anchor-to-adjust-for-fixed-header/?utm_source=chatgpt.com
//edited to match with offset for my navbar heading and to allow the images to load before the anchor tag 'kicks in'

// Wait until the page is fully loaded
window.addEventListener("load", () => {
    // Check for hash (like #section or ids)
    if (window.location.hash) {
        // Targets the element with that ID
        const target = document.querySelector(window.location.hash);
        if (target) {
            const yOffset = -120; // height offset
            // Calculates where the element should scroll to
            const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
            // Scroll to that exact position instead of landing randomly while images, etc, load on the screen
            // Linked navbar also caused part of that issue (anchor links were landing in wrong places)
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    }
});

