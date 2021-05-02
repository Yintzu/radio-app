import { useContext } from "react";
import { RadioContext } from "../contexts/RadioContext";
import style from "../css/Filter.module.css"

const Filter = (props) => {
    const { channels, programs, programCategories } = useContext(RadioContext);
    const {setProgramsToShow} = props;

    const handleSelectChange = () => {
        let categorySelectEl = document.getElementById("category");
        let channelSelectEl = document.getElementById("channel");
        if (categorySelectEl.value === "all" && channelSelectEl.value === "all") {
            setProgramsToShow(programs)
        }
        if (categorySelectEl.value !== "all" && channelSelectEl.value === "all") {
            setProgramsToShow(programs.filter(program => program?.programcategory?.name === categorySelectEl.value))
        }
        if (categorySelectEl.value === "all" && channelSelectEl.value !== "all") {
            setProgramsToShow(programs.filter(program => program?.channel?.name === channelSelectEl.value))
        }
        if (categorySelectEl.value !== "all" && channelSelectEl.value !== "all") {
            let tempArray = programs.filter(program => program?.programcategory?.name === categorySelectEl.value)
            setProgramsToShow(tempArray.filter(program => program?.channel?.name === channelSelectEl.value))
        }
    }

    const clearFilter = () => {
        document.querySelectorAll("select").forEach(el => {
            el.selectedIndex = 0
            handleSelectChange();
        })
    }

    return (
        <div className={style.filterDiv}>
            <label className={style.label} htmlFor="category">Categories</label>
            <select className={style.select} name="category" id="category" onChange={handleSelectChange}>
                <option value={"all"}>All</option>
                {programCategories && programCategories.map((category, i) => (
                    <option value={category.name} key={i}>
                        {category.name}
                    </option>
                ))}
            </select>
            <label className={style.label} htmlFor="channel">Channels</label>
            <select className={style.select} name="channel" id="channel" onChange={handleSelectChange}>
                <option value={"all"}>All</option>
                {channels && channels.map((channel, i) => (
                    <option value={channel.name} key={i}>
                        {channel.name}
                    </option>
                ))}
            </select>
            <button className={style.clearFilter} onClick={clearFilter}>Clear Filter</button>
        </div>
    );
}

export default Filter;