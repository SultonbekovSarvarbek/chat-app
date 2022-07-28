import router from "./router";
import store from "./store";
import parseJwt from "./services/parseJwt";

import { getToken } from "@/utils/auth";

const whiteList = ["/login", "/register"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // determine whether the user has logged in
  const hasToken = getToken();

  if (hasToken) {
    const token = parseJwt(getToken());
    const { user_id, username } = token;
    const user = {
      user_id,
      username,
    };
    store.commit("user/SET_USER_DATA", user);
    if (token && token.exp < Date.now() / 1000) {
      store.dispatch("user/resetToken");
      next({
        path: "/login",
      });
    } else {
      store.commit("user/LOGIN_SUCCESS", true);
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
