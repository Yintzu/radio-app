import { useContext, useEffect, useState } from "react";
import { RadioContext } from "../contexts/RadioContext";
import style from "../css/ProgramDesc.module.css";

const ProgramDesc = (props) => {
    const { programs, formatDate, renderImg } = useContext(RadioContext);
    const [programToShow, setProgramToShow] = useState(null);
    const [episodeList, setEpisodeList] = useState(null);

    useEffect(() => {
        if (programs) {
            setProgramToShow(programs.find(program => String(program.id) === props.match.params.programId))
        }
        // eslint-disable-next-line
    }, [programs])

    useEffect(() => {
        fetch(`/api/programs/${props.match.params.programId}`)
            .then(response => response.json())
            .then(result => setEpisodeList(result.episodes))
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        console.log(`episodeList`, episodeList);
    }, [episodeList])

    return (
        <div className={style.programDesc}>
            {programToShow &&
                <div>
                    <div className={style.descGrid}>
                        <img className={style.descImg} src={programToShow.programimage} alt={`A logo of the channel ${programToShow.name}`} />
                        <div className={style.desc}>
                            <div>
                                <div className={style.flexBetween}>
                                    <h1 className={style.h1}>{programToShow.name}</h1>
                                </div>
                                <p>{programToShow.description}</p>
                                <div>
                                    <p>{programToShow?.responsibleeditor}</p>
                                    <p>{programToShow?.email}</p>
                                </div>
                            </div>
                            <div className={style.button}>
                                <span>Episode list</span>
                            </div>
                        </div>
                    </div>

                    <div className={style.programsGrid}>
                        {episodeList && episodeList.map((item, i) => (
                            <div className={style.programsItem} key={i}>
                                <img className={style.programsImg} src={renderImg(item?.imageurl)} alt={`A logo of the channel`} />
                                <div className={style.cardDesc}>
                                    <h2 className={style.h2}>{item.title}</h2>
                                    {item?.broadcasttime &&
                                        <div>
                                            <p>{formatDate(item.broadcasttime.starttimeutc)}</p>
                                            <p>{formatDate(item.broadcasttime.endtimeutc)}</p>
                                            <p>{item.description}</p>
                                        </div>}

                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            }
        </div>
    );
}

export default ProgramDesc;