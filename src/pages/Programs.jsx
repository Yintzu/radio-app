import { useContext, useEffect, useState } from "react";
import { RadioContext } from "../contexts/RadioContext";
import style from "../css/Programs.module.css"
import LazyLoad from "react-lazyload";
import ToTheTop from "../components/ToTheTop";
import { UsersContext } from "../contexts/UsersContext";
import Filter from "../components/Filter";
import ProgramCard from "../components/ProgramCard";

const Programs = () => {
    const { programs, renderImg } = useContext(RadioContext);
    const { loggedInUser, favorites, checkFavorites } = useContext(UsersContext);
    const [programsToShow, setProgramsToShow] = useState([]);

    useEffect(() => {
        setProgramsToShow(programs)
        // //eslint-disable-next-line
    }, [programs]);

    useEffect(() => {
        if (loggedInUser) {
            checkFavorites()
        }
        //eslint-disable-next-line
    }, [loggedInUser])

    const addFavorite = (userId, programId) => {
        let favoriteInfo = {
            userId: userId,
            programId: programId,
            channelId: null
        }

        fetch("/api/users/favorite", {
            method: "POST",
            headers: { "content-type": "application/json", },
            body: JSON.stringify(favoriteInfo),
        })
            .then(response => response.json())

        checkFavorites();
    }

    const deleteFavorite = (userId, programId) => {
        let favoriteInfo = {
            userId: userId,
            programId: programId,
            channelId: null
        }

        fetch("/api/users/favorite", {
            method: "DELETE",
            headers: { "content-type": "application/json", },
            body: JSON.stringify(favoriteInfo),
        })
            .then(response => response.json())

        checkFavorites();
    }

    const addOrDelete = (e, userId, programId) => {
        if (e.target.classList.contains(`${style.fave}`)) {
            deleteFavorite(userId, programId)
        } else {
            addFavorite(userId, programId)
        }
    }

    const renderStars = (program) => {
        let favClass = `${style.star}`
        favorites.forEach(favorite => {
            if (program.id === favorite.programId) {
                favClass = `${style.star} ${style.fave}`
            }
        })
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 78.45 74.86" className={favClass} onClick={(e) => addOrDelete(e, loggedInUser.id, program.id)} data-program={program.id}>
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                        <path className={`cls-1 ${style.clickThrough}`}
                            d="M41.53,1.46l9.83,20.85a2.55,2.55,0,0,0,2,1.45l22.86,2.9a2.55,2.55,0,0,1,1.43,4.39L60.85,46.84a2.58,2.58,0,0,0-.76,2.34L64.4,71.82a2.56,2.56,0,0,1-3.74,2.72L40.45,63.45a2.54,2.54,0,0,0-2.45,0L17.79,74.54a2.56,2.56,0,0,1-3.74-2.72l4.31-22.64a2.58,2.58,0,0,0-.76-2.34L.81,31.05a2.55,2.55,0,0,1,1.42-4.39l22.87-2.9a2.58,2.58,0,0,0,2-1.45L36.92,1.46A2.55,2.55,0,0,1,41.53,1.46Z" />
                    </g>
                </g>
            </svg>
        )
    }

    return (
        <div className={style.programs}>
            <h1 className={style.h1}>Programs</h1>
            <Filter setProgramsToShow={setProgramsToShow} />
            <div className={style.programsGrid}>
                {programsToShow && programsToShow.map((program, i) =>
                    (
                        <LazyLoad key={i}>
                            <ProgramCard renderImg={renderImg} renderStars={renderStars} program={program} />
                        </LazyLoad>
                    )
                )}
            </div>
            <ToTheTop />
        </div>
    );
}

export default Programs;