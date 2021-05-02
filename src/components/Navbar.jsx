import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UsersContext } from "../contexts/UsersContext";
import style from "../css/Navbar.module.css";
import LoginModal from "./LoginModal";

const Navbar = () => {
    const { loggedInUser, logoutUser, showModal, setShowModal } = useContext(UsersContext);

    const toggleMenu = (e) => {
        if (e.target.tagName === "A") {
            document.querySelector("#menu").classList.remove(`${style.open}`)
        } else if (e.target.classList.contains(`${style.menu}`) || e.target.classList.contains(`${style.hamburger}`)) {
            document.querySelector(`.${style.menu}`).classList.toggle(`${style.open}`)
        }
    }

    return (
        <nav>
            <div className={style.navbar}>
                <div className={`container ${style.flexer}`}>
                    <NavLink className={`${style.logo}`} exact to={"/"}>
                        <img className={style.logoImg} src="/assets/logo.gif" alt="A spinning logo of a casette radio" />
                        <span className={style.logoText}>RadioLab</span>
                    </NavLink>
                    <div className={style.menu} id="menu" onClick={toggleMenu}>
                        <div className={style.links}>
                            <NavLink className={style.navlink} exact to={"/channels"}>Channels</NavLink>
                            <NavLink className={style.navlink} exact to={"/programs"}>Programs</NavLink>
                            {loggedInUser && <NavLink className={style.navlink} exact to={"/favorites"}>Favorites</NavLink>}
                            {loggedInUser ? <span className={style.logoutButton} onClick={logoutUser}>Log out</span>
                                : <span className={style.loginButton} onClick={() => setShowModal(true)}>Log in</span>}
                        </div>
                    </div>
                    <div className={style.hamburger} onClick={toggleMenu}>
                        <div className={style.hbar1}></div>
                        <div className={style.hbar2}></div>
                        <div className={style.hbar3}></div>
                    </div>
                </div>
            </div>
            <div className={style.border}></div>
            {showModal && <LoginModal setShowModal={setShowModal} />}
        </nav>
    );
}

export default Navbar;