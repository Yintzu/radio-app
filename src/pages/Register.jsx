import { useContext, useEffect } from "react";
import { UsersContext } from "../contexts/UsersContext";
import style from "../css/Register.module.css"

const Register = () => {
    const { registerUser, registerError, setRegisterError } = useContext(UsersContext);

    const registerSubmitHandler = (e) => {
        e.preventDefault();
        const registerInfo = {
            email: document.getElementById("registerEmail").value,
            password: document.getElementById("registerPassword").value,
        }
        registerUser(registerInfo)
    }

    useEffect(()=>{
        setRegisterError(false)
        // eslint-disable-next-line
    },[])

    return (
        <div className={style.register}>
            <h1 className={style.h1}>Register new account</h1>
            <form action="submit" onSubmit={registerSubmitHandler}>
                <label className={style.label} htmlFor="registerEmail">E-mail:</label>
                <input className={style.input} type="email" id="registerEmail" required/>
                <label className={style.label} htmlFor="registerPassword">Password:</label>
                <input className={style.input} type="text" id="registerPassword" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$" required/>
                <p className={style.p}>8-24 letters. At least one lower case, one upper case letter, one number, one special character.</p>
                <div id="confirmAnchor"></div>
                {registerError && <p className={style.error}>User email already exists.</p>}
                <button className={style.button}>Create account</button>
            </form>
        </div>
    );
}

export default Register;