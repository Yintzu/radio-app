import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UsersContext } from "../contexts/UsersContext";
import style from "../css/Programs.module.css"

const ProgramCard = (props) => {
    const history = useHistory();
    const {program, renderImg, renderStars} = props;
    const {loggedInUser, favorites} = useContext(UsersContext);

    const handleClick = (e) => {
        if (e.target.tagName !== "svg"){
            history.push(`/programs/${program.id}`)
        }
    }

    return (
        <div className={style.programsItem} onClick={handleClick}>
            <img className={style.programsImg} src={renderImg(program.programimage)} alt="A description of said program" />
            <div className={style.cardDesc}>
                <h2 className={style.h2}>{program.name}</h2>
                <p>{program.channel.name} - {program?.programcategory ? program.programcategory.name : "[No category]"}</p>
                <p className={style.descText}>{program.description}</p>
            </div>

            {loggedInUser && favorites && renderStars(program)}

        </div>
    );
}

export default ProgramCard;