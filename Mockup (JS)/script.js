document.addEventListener("click", (e) => {
  const { target } = e;
  if (!target.matches(nav)) {
    return;
  }
  e.preventDefault();
  urlRoute();
});

const urlRoutes = {
  404: {
    template: "/templates/404.html",
    title: "",
    description: "",
  },
  "/": {
    template: "/templates/explore.html",
    title: "",
    description: "",
  },
  "/flight": {
    template: "/templates/flight.html",
    title: "",
    description: "",
  },
  "/planner": {
    template: "/templates/planner.html",
    title: "",
    description: "",
  },
  "/profile": {
    template: "/templates/profile.html",
    title: "",
    description: "",
  },
};

const urlRoute = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  urlLocationHandler();
};

const urlLocationHandler = async () => {
  const location = window.location.pathname;
  if ((location.length = 0)) {
    location = "/";
  }
  const route = urlRoutes[location] || urlRoutes[404];
  const html = await fetch(route.template).then((response) => response.text());
  document.getElementById("content").innerHTML = html;
};

window.onpopstate = urlLocationHandler;
window.route = urlRoute;

urlLocationHandler();
