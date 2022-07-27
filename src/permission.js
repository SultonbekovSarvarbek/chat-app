import router from "./router";
import store from "./store";

import { getToken } from "@/utils/auth"; // get token from cookie

const whiteList = ["/login", "/register"]; // no redirect whitelist

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

router.beforeEach(async (to, from, next) => {
  // determine whether the user has logged in
  const hasToken = getToken();

  if (hasToken !== "undefined" && hasToken) {
    const token = parseJwt(getToken());
    if (token && token.exp < Date.now() / 1000) {
      store.dispatch("user/resetToken");
      next({
        path: "/login",
      });
    } else {
      store.commit("user/loginSuccess", true);
      if (to.path === "/login" || to.path === "/register") {
        next({ path: "/" });
      } else {
        next();
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      next({
        path: "/login",
      });
    }
  }
});
