import { useContext, useEffect, useState } from "react";
import { RadioContext } from "../contexts/RadioContext";
import { UsersContext } from "../contexts/UsersContext";
import style from "../css/ChannelDesc.module.css"

const ChannelDesc = (props) => {
    const { channels, formatDate, renderImg } = useContext(RadioContext);
    const {favorites, loggedInUser, checkFavorites} = useContext(UsersContext);
    const [channelToShow, setChannelToShow] = useState(null);
    const [channelSchedule, setChannelSchedule] = useState(null);

    useEffect(() => {
        if (channels) setChannelToShow(channels.find(channel => String(channel.id) === props.match.params.channelId))
    }, [channels, props.match.params.channelId])

    useEffect(() => {
        if (channelToShow) {
            fetch(`${channelToShow.scheduleurl}&format=json&pagination=false`)
                .then(response => response.json())
                .then(data => setChannelSchedule(data.schedule))
        }
    }, [channelToShow])
    
    const addFavorite = (userId, channelId) => {
        let favoriteInfo = {
            userId: userId,
            channelId: channelId,
            programId: null
        }

        fetch("/api/users/favorite", {
            method: "POST",
            headers: { "content-type": "application/json", },
            body: JSON.stringify(favoriteInfo),
        })
            .then(response => response.json())

        checkFavorites();
    }

    const deleteFavorite = (userId, channelId) => {
        let favoriteInfo = {
            userId: userId,
            channelId: channelId,
            programId: null
        }

        fetch("/api/users/favorite", {
            method: "DELETE",
            headers: { "content-type": "application/json", },
            body: JSON.stringify(favoriteInfo),
        })
            .then(response => response.json())

        checkFavorites();
    }

    const addOrDelete = (e, userId, channelId) => {
        if (e.target.classList.contains(`${style.fave}`)) {
            deleteFavorite(userId, channelId)
        } else {
            addFavorite(userId, channelId)
        }
    }

    const renderStar = (channel) => {
        let favClass = `${style.star}`
        favorites.forEach(favorite => {
            if (channelToShow.id === favorite.channelId) {
                favClass = `${style.star} ${style.fave}`
            }
        })

        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 78.45 74.86" className={favClass} onClick={(e) => addOrDelete(e, loggedInUser.id, channelToShow.id)}>
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
        <div className={`${style.channelDesc}`}>
            {channelToShow && //Reload guard
                <div>
                    <div className={style.descGrid}>
                        <img className={style.descImg} src={channelToShow.image} alt={`A logo of the channel ${channelToShow.name}`} />
                        <div className={style.desc}>
                            <div>
                                <div className={style.flexBetween}>
                                    <h1 className={style.h1}>{channelToShow.name}</h1>
                                    {loggedInUser && favorites && channelToShow && renderStar(channelToShow)}
                                </div>
                                <p>{channelToShow.tagline}</p>
                            </div>
                            <div className={style.button}>
                                <span>Today's schedule</span>
                            </div>
                        </div>
                    </div>
                    <div className={style.programsGrid}>
                        {channelSchedule && channelSchedule.map((item, i) => (
                            <div className={style.programsItem} key={i}>
                                <img className={style.programsImg} src={renderImg(item?.imageurl)} alt={`A logo of the channel`} />
                                <div className={style.cardDesc}>
                                    <h2>{item.title}</h2>
                                    <p>{formatDate(item.starttimeutc)}</p>
                                    <p>{formatDate(item.endtimeutc)}</p>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
}

export default ChannelDesc;