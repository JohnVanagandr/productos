import aboutController from "../controllers/aboutController";
import contactController from "../controllers/contactController";
import homeController from "../controllers/homeController";
import loginController from "../controllers/loginController";
import logoutController from "../controllers/logoutController";
import userController from "../controllers/userController";

 // Constante para manejar las rutas, cargamos la vista con la función anonima loadView
export const routes = {
  home: {
    private: false,
    template: "home",
    controller: homeController,
  },
  about: {
    private: false,
    template: "about",
    controller: aboutController,
  },
  contact: {
    private: false,
    template: "contact",
    controller: contactController,
  },
  login: {
    private: false,
    template: "login",
    controller: loginController,
  },
  logout: {
    private: true,
    template: "logout",
    controller: logoutController,
  },
  "user/:id": {
    private: true,
    template: "user",
    controller: userController,
  },
};