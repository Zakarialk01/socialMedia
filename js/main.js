document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  const navLinks = document.querySelectorAll(".nav a");

  function loadPage(pageName) {
    app.innerHTML = "";

    switch (pageName) {
      case "feed":
        loadFeed();
        break;
      case "messaging":
        loadMessaging();
        break;
      case "friends":
        loadFriends();
        break;
      default:
        app.innerHTML = "<h1>Page not found</h1>";
    }

    navLinks.forEach((link) => {
      if (link.dataset.page === pageName) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      loadPage(e.target.dataset.page);
    });
  });

  loadPage("feed");
});

console.log("Main script loaded");
