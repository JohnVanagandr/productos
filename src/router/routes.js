import productController from "../views/product/productController.js";
import userController from "../views/user/userController.js";
import logoutController from "../views/logout/logoutController.js";
import categoryController from "../views/category/categoryController.js";
import homeController from "../views/home/homeController.js";
import loginController from "../views/login/loginController.js";

 // Constante para manejar las rutas, cargamos la vista con la función anonima loadView
export const routes = {
  home: {
    private: false,
    template: "home/index",
    controller: homeController,
  },
  product: {
    private: true,
    template: "product/index",
    controller: productController,
  },
  category: {
    private: true,
    template: "category/index",
    controller: categoryController,
  },
  login: {
    private: false,
    template: "login/index",
    controller: loginController,
  },
  logout: {
    private: true,
    template: "logout/index",
    controller: logoutController,
  },
  "user/:id": {
    private: true,
    template: "user/index",
    controller: userController,
  },
};