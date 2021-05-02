import React, { createContext, useEffect, useState} from "react";
import ReactDOM from "react-dom"
import { useHistory } from "react-router-dom";
import style from "../css/Register.module.css"

export const UsersContext = createContext();

const UsersProvider = (props) => {
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [registerError, setRegisterError] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState("");
    const [favorites, setFavorites] = useState([]);

    const loginCheck = () => {
        fetch("/api/users/whoami")
            .then(response => response.json())
            .then(result => setLoggedInUser(result))
    }

    const loginUser = (loginInfo) => {
        fetch("/api/users/login", {
            method: "POST",
            headers: { "content-type": "application/json", },
            body: JSON.stringify(loginInfo),
        })
            .then(response => response.json())
            .then(result => {
                if (result.hasOwnProperty("error")) {
                    setLoginError(true)
                } else {
                    setLoggedInUser(result.loggedInUser)
                    setLoginError(false)
                    setShowModal(false)
                }
            })
    }

    const logoutUser = () => {
        fetch("/api/users/logout")
            .then(response => response.json())
            // .then(result => { console.log(result) });

        if (window.location.href.includes("favorites")) {
            history.push("/")
        }
        setLoggedInUser(null)
    }

    const registerUser = (registerInfo) => {
        fetch("/api/users/register", {
            method: "POST",
            headers: { "content-type": "application/json", },
            body: JSON.stringify(registerInfo),
        })
            .then(response => response.json())
            .then(result => {
                if (result.hasOwnProperty("error")) {
                    setRegisterError(true)
                } else {
                    setRegisterError(false)
                    ReactDOM.render(
                        React.createElement('div', {className: style.confirmation}, 'User created successfully!'),
                        document.getElementById('confirmAnchor')
                    );
                }
            })
    }

    const checkFavorites = () => {
        fetch(`/api/users/favorite/${loggedInUser.id}`)
            .then(response => response.json())
            .then(result => setFavorites(result))
    }

    //----------USE EFFECTS----------

    //Set session user to loggedInUser after page reload
    useEffect(() => {
        loginCheck()
        // eslint-disable-next-line
    }, [])

    //Get and set the favorites of the loggedInUser
    useEffect(() => {
        if (loggedInUser) {
            checkFavorites()
        }
        //eslint-disable-next-line
    }, [loggedInUser])

    const values = {
        loginCheck,
        loginUser,
        logoutUser,
        registerUser,
        loggedInUser,
        setLoggedInUser,
        loginError,
        setLoginError,
        registerError,
        setRegisterError,
        favorites,
        setFavorites,
        checkFavorites,
        showModal,
        setShowModal
    }

    return (
        <UsersContext.Provider value={values}>
            {props.children}
        </UsersContext.Provider>
    );
}

export default UsersProvider;