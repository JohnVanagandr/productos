import productsController from "../views/product/productsController.js";
import productController from "../views/product/edit/editController.js";
import userController from "../views/user/userController.js";
import logoutController from "../views/logout/logoutController.js";
import categoryController from "../views/category/categoryController.js";
import homeController from "../views/home/homeController.js";
import loginController from "../views/login/loginController.js";
import registerController from "../views/register/registerController.js";

 // Constante para manejar las rutas, cargamos la vista con la función anonima loadView
export const routes = {
  home: {
    private: false,
    template: "home/index",
    controller: homeController,
  },
  category: {
    private: true,
    template: "category/index",
    controller: categoryController,
  },
  register: {
    private: false,
    template: "register/index",
    controller: registerController,
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
  products: {
    products: {
      private: true,
      template: "product/index",
      controller: productsController,
    },
    "edit/:id": {
      private: true,
      template: "product/edit",
      controller: productController,
    },
  },
};