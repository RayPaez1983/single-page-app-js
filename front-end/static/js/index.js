import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import Settings from "./views/Settings.js";
import Pages from "./views/Pages.js";

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  // /post/:id

  const routes = [
    {
      path: "/",
      view: Dashboard,
    },
    {
      path: "/posts",
      view: Posts,
    },
    {
      path: "/posts/:id",
      view: ViewPosts,
    },
    {
      path: "/settings",
      view: Settings,
    },
    {
      path: "/pages",
      view: Pages,
    },
  ];

  //test routes for potencial match

  const potencialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  let match = potencialMatches.find((potencialMatch) => potencialMatch.isMatch);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  const view = new match.route.view();

  document.querySelector("#app").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});
