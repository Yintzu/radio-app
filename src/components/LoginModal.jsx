import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UsersContext } from "../contexts/UsersContext";
import style from "../css/LoginModal.module.css"

const LoginModal = (props) => {
    const { loginUser, loginError, setLoginError } = useContext(UsersContext);
    const history = useHistory();

    const submitLoginHandler = (e) => {
        e.preventDefault();
        const loginInfo = {
            email: document.getElementById("loginEmail").value,
            password: document.getElementById("loginPassword").value
        }
        loginUser(loginInfo);
    }

    const closeModal = (e) => {
        if (e.target.className === `${style.overlay}`) {
            props.setShowModal(false)
            setLoginError(false)
        }
    }

    const registerRoute = () => {
        props.setShowModal(false)
        history.push("/register")
    }

    return (
        <div className={style.overlay} onClick={closeModal}>
            <div className={style.loginDiv}>
                <h2 className={style.h2}>Log in</h2>
                <form action="submit" onSubmit={submitLoginHandler}>
                    <label className={style.label} htmlFor="loginEmail">E-mail:</label>
                    <input className={style.input} type="email" id="loginEmail" required />
                    <label className={style.label} htmlFor="loginPassword">Password:</label>
                    <input className={style.input} type="text" id="loginPassword" required />
                    {loginError && <p className={style.error}>Bad credentials</p>}
                    <button className={style.button}>Log in</button>
                </form>
                <p className={style.register} to={"/register"} onClick={registerRoute}>Not a member? Click HERE to register an account.</p>
            </div>
        </div>
    );
}

export default LoginModal;