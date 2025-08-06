/// <reference path="../pb_data/types.d.ts" />

routerAdd("GET", "/", (e) => {
  return e.redirect(302, "https://aguapp.nachbaur.dev");
});
