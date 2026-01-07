//BACK TO TOP BUTTON FOR ALL PAGES
  // Get the back to top button
  const backToTopButton = document.getElementById("backToTop");

  // Show button after scrolling down 100px
  window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  };

  // Scroll smoothly to top when clicked
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
