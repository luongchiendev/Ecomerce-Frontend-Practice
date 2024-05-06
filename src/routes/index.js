import CartPage from "../page/CartPage";
import HomePage from "../page/HomePage";
import LoginPage from "../page/LoginPage";
import ProductDetailPage from "../page/ProductDetailPage";
import ProductPage from "../page/ProductPage";
import SignUp from "../page/SignUp";
import TestPagePractice from "../page/TestPagePractice";
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
    },
    {
        path: "/practice",
        page: TestPagePractice
    },
    {
        path: "/cart",
        page: CartPage
    },
    {
        path: "/product/:id",
        page: ProductDetailPage
    }

]