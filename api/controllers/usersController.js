const sqlite3 = require("sqlite3");
const path = require("path");
const encrypt = require("../Encrypt.js");

const db = new sqlite3.Database(path.join(__dirname, "../../usersDB.db"));

const whoami = (req, res) => {
    res.json(req.session.user || null);
};

const login = (req, res) => {
    let query = `SELECT * FROM users WHERE email = $email`;
    let params = { $email: req.body.email };

    db.get(query, params, (error, userInDB) => {
        if (!userInDB) {
            res.status(401).json({ error: "Bad credentials" });
            return;
        }

        req.body.password = encrypt(req.body.password);

        if (userInDB.password === req.body.password) {
            delete userInDB.password;
            req.session.user = userInDB;
            res.json({ success: "Login successfull", loggedInUser: userInDB });
            return;
        } else {
            res.status(401).json({ error: "Bad credentials" });
            return;
        }

    })

}

const logout = (req, res) => {
    delete req.session.user;
    res.json({ success: "Logged out successfully" })
}

const register = (req, res) => {
    let userToRegister = req.body;

    // Checking if user exists
    let query = `SELECT * FROM users WHERE email = $email`;
    let params = { $email: userToRegister.email };

    db.get(query, params, (err, userExist) => {
        if (userExist) {
            res.status(400).json({ error: "User with that email already exists" });
            return;

        } else {
            validatePassword(userToRegister.password)

            //Encryption line
            req.body.password = encrypt(req.body.password);

            //Registering user
            query = `INSERT INTO users (email, password) VALUES ($email, $password)`;
            params = {
                $email: userToRegister.email,
                $password: userToRegister.password,
            };
            db.run(query, params, function (err) {
                if (err) {
                    res.status(400).json({ error: err });
                    return;
                }
                res.json({ success: "User registration successfull", lastID: this.lastID });
            });

        }
    })




}

const editUser = (req, res) => {
    if (req.session.user) {
        validatePassword(req.body.password)

        req.body.password = encrypt(req.body.password)
        let userToUpdate = req.body;

        let query = `UPDATE users
        SET email = $email, password = $password
        WHERE id = $userId`

        let params = {
            $email: userToUpdate.email,
            $password: userToUpdate.password,
            $userId: req.session.user.id
        }

        db.run(query, params, (err) => {
            if (err) return console.log(err);
            res.json({ success: "Updated user" })
        })

    } else { res.json({ error: "Session timed out please log in again" }) }
}

const addFavorite = (req, res) => {
    let favoriteInfo = req.body;
    let query = `SELECT * FROM users, favorites
    WHERE userId = users.id
    AND userId = $userId
    AND programId = $programId
    AND channelId = $channelId`
    let params = {
        $userId: favoriteInfo.userId,
        $programId: favoriteInfo.programId,
        $channelId: favoriteInfo.channelId
    }

    db.get(query, params, (err, favoriteExists) => {
        if (err) console.log(err);
        if (favoriteExists) {
            res.status(400).json({ error: "That program is already a favorite" });
            return;
        }
    });

    query = `INSERT INTO favorites (programId, userId, channelId)
    VALUES ($programId, $userId, $channelId)`

    db.run(query, params, (err) => {
        if (err) return console.log(err);

        res.json({ success: "Added to favorites" })
    })
}

const deleteFavorite = (req, res) => {
    let favoriteInfo = req.body;

    for (const key in favoriteInfo) {
        if (favoriteInfo[key] === null) {
            favoriteInfo[key] = "IS NULL"
        } else favoriteInfo[key] = `= ${favoriteInfo[key]}`
    }

    let query = `DELETE FROM favorites
    WHERE programId ${favoriteInfo.programId}
    AND channelId ${favoriteInfo.channelId}
    AND userId ${favoriteInfo.userId}`;

    db.run(query, [], function (err, result) {
        if (err) { console.log(err); }
        res.json({ success: "Deleted favorite", changes: this.changes })
    })
}

const getFavorites = (req, res) => {
    let query = `SELECT * FROM favorites
    WHERE userId = $userId`;
    let params = { $userId: req.params.id }
    db.all(query, params, (err, result) => {
        res.json(result);
    });
}

const validatePassword = (password) => {
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/.test(password)) {
        console.log("Password passed backend validation");
    } else {
        res.json({ failed: "Password not valid" })
        return
    }
}

module.exports = {
    whoami,
    login,
    logout,
    register,
    editUser,
    addFavorite,
    getFavorites,
    deleteFavorite,
}