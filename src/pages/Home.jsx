import { useContext } from "react";
import style from "../css/Home.module.css"
import { UsersContext } from "../contexts/UsersContext";
import { useHistory } from "react-router-dom";

const Home = () => {
    const { setShowModal, loggedInUser } = useContext(UsersContext)
    const history = useHistory();
    return (
        <div className={`${style.home}`}>
            <h1>Home</h1>
            <div className={style.gradient}>
                <div className={style.content}>
                    <h2>Welcome to RadioLab</h2>
                    <h2>Check out our channels or a full list of programs:</h2>
                    <button className={style.button} onClick={() => history.push("/channels")}>Channels</button>
                    <button className={style.button} onClick={() => history.push("/programs")}>Programs</button>
                    {loggedInUser ?
                        <div>
                            <h2>Edit your account info:</h2>
                            <button className={style.button} onClick={() => history.push("/edit")}>Edit account</button>
                        </div> :
                        <div>

                            <h2>Log in to save your favorite radio programs or create an account.</h2>
                            <button className={style.button} onClick={() => setShowModal(true)}>Log in</button>
                            <button className={style.button} onClick={() => history.push("/register")}>Register</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;