import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import style from "../css/Favorites.module.css"
import channelStyle from "../css/Channels.module.css";
import { UsersContext } from "../contexts/UsersContext";
import Filter from "../components/Filter";
import ToTheTop from "../components/ToTheTop";
import { RadioContext } from "../contexts/RadioContext";
import ProgramCard from "../components/ProgramCard";

const Favorites = () => {
    const { loggedInUser, favorites, checkFavorites } = useContext(UsersContext);
    const { programs, channels, renderImg } = useContext(RadioContext);
    const history = useHistory();
    const [programsToShow, setProgramsToShow] = useState([]);
    const [favoritePrograms, setFavoritePrograms] = useState([]);
    const [favoriteChannels, setFavoriteChannels] = useState([]);

    useEffect(() => {
        setProgramsToShow(programs)
        //eslint-disable-next-line

    }, [programs]);

    useEffect(() => {
        if (programsToShow) {
            setFavoritePrograms(programsToShow.filter(program => program.id === favorites.find(favorite => favorite.programId === program.id)?.programId))
        }
    }, [programsToShow, favorites])

    useEffect(() => {
        if (favorites && channels) {
            let tempFavIds = [];
            favorites.forEach(favorite => {
                if (favorite.channelId !== null) {
                    tempFavIds.push(favorite.channelId)
                }
            })

            setFavoriteChannels(channels.filter(channel => tempFavIds.includes(channel.id)))
        }
    }, [favorites, channels])

    useEffect(() => {
        if (loggedInUser === null) {
            history.push("/")
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
        <div>
            {loggedInUser ?
                <div>
                    <h1 className={style.h1}>Favorite Channels</h1>
                    {favoriteChannels &&
                        <div className={channelStyle.channelGrid}>
                            {favoriteChannels.map((channel, i) => (
                                <div key={i} className={channelStyle.gridItem} onClick={() => history.push(`/channels/${channel.id}`)}>
                                    <img className={channelStyle.channelImg} src={renderImg(channel.image)} alt={`A logo for ${channel.name}`} />
                                    <h2 className={channelStyle.h2}>{channel.name}</h2>
                                </div>
                            ))}
                        </div>
                    }
                    {favoriteChannels.length === 0 &&
                        <p className={style.noResults}>No favorite channels</p>
                    }
                    <h1 className={style.h1}>Favorite Programs</h1>
                    {favoritePrograms.length > 0 && <Filter setProgramsToShow={setProgramsToShow} />}
                    <div className={style.programsGrid}>
                        {favoritePrograms && favoritePrograms.map((program, i) =>
                            (
                                <ProgramCard renderImg={renderImg} renderStars={renderStars} program={program} key={i} />
                            )
                        )}
                    </div>
                    {favoritePrograms.length === 0 &&
                        <p className={style.noResults}>No favorite programs</p>
                    }
                    <ToTheTop />
                </div>
                : null}
        </div>
    );
}

export default Favorites;