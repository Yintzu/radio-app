import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { RadioContext } from "../contexts/RadioContext";
import style from "../css/Channels.module.css"

const Channels = () => {
    const { channels, renderImg} = useContext(RadioContext)
    const history = useHistory();

    return (
        <div className={`channels`}>
            <h1 className={style.h1}>Channels</h1>
            <div className={style.channelGrid}>
                {channels && channels.map((channel, i) => (
                    <div key={i} className={style.gridItem} onClick={() => history.push(`/channels/${channel.id}`)}>
                        <img className={style.channelImg} src={renderImg(channel.image)} alt={`A logo for ${channel.name}`} />
                        <h2 className={style.h2}>{channel.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Channels;