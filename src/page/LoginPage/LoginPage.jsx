
import FormLogin from "../../component/FormLogin/FormLogin";
import Header from "../../component/HeaderComponent";
import '../LoginPage/loginPage.css'
export default function loginPage() {
    return (
        <div>
            <Header></Header>
            <div className="whitespace">
                <h2>Login</h2>
                <p>Enter your email and password to login:</p>
            </div>
            <FormLogin></FormLogin>
        </div>
    )
}
