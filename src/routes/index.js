import HomePage from "../page/HomePage";
import LoginPage from "../page/LoginPage";
import ProductPage from "../page/ProductPage";
import SignUp from "../page/SignUp";

export const routes = [
    {
        path: "/",
        page: HomePage
    },
    {
        path: "/login",
        page: LoginPage
    },
    {
        path: "/product",
        page: ProductPage
    },
    {
        path: "/signup",
        page: SignUp
    }
]