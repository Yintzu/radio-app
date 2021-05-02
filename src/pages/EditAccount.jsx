import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UsersContext } from "../contexts/UsersContext";
import style from "../css/Register.module.css"

const EditAccount = () => {
    const history = useHistory();
    const { loggedInUser } = useContext(UsersContext);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (loggedInUser === null) {
            history.push("/")
        }
        //eslint-disable-next-line
    }, [loggedInUser])

    const editHandler = (e) => {
        e.preventDefault()
        document.getElementById("editEmail").disabled = false
        document.getElementById("editPassword").disabled = false
        setEditMode(true)
    }

    const saveHandler = (e) => {
        e.preventDefault()
        let emailEl = document.getElementById("editEmail")
        let passwordEl = document.getElementById("editPassword")
        emailEl.disabled = true
        passwordEl.disabled = true

        let userInfo = {
            email: emailEl.value,
            password: passwordEl.value
        }

        fetch("/api/users/edit", {
            method: "PUT",
            headers: { "content-type": "application/json", },
            body: JSON.stringify(userInfo),
        })
            .then(response => response.json())

        setEditMode(false)
    }

    return (
        <div className={style.edit}>
            {loggedInUser &&
                <div>
                    <h1 className={style.h1}>Edit account</h1>
                    <form action="submit" onSubmit={saveHandler}>
                        <label className={style.label} htmlFor="editEmail">E-mail:</label>
                        <input className={style.input} type="email" id="editEmail" value={loggedInUser.email} disabled required />
                        <label className={style.label} htmlFor="editPassword">Password:</label>
                        <input className={style.input} type="text" id="editPassword" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$" disabled required />
                        <p className={style.p}>8-24 letters. At least one lower case, one upper case letter, one number, one special character.</p>
                        {editMode &&
                            <button className={style.button}>Save</button>
                        }
                    </form>
                    {!editMode && <button className={style.button} onClick={editHandler}>Edit</button>}

                </div>
            }
        </div>
    );
}

export default EditAccount;