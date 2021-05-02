import { createContext, useState, useEffect } from "react";

export const RadioContext = createContext();

const RadioProvider = (props) => {
    const [channels, setChannels] = useState(null);
    const [programs, setPrograms] = useState(null);
    const [programCategories, setProgramCategories] = useState([]);

    useEffect(() => {
        fetch("/api/channels")
            .then(response => response.json())
            .then(data => setChannels(data.channels))
    }, []);

    useEffect(() => {
        fetch("/api/programs")
            .then(response => response.json())
            .then(data => setPrograms(data.programs))
    }, [])

    useEffect(() => {
        let programCategoriesTemp = [];
        if (programs) {
            programs.forEach(program => {
                if (program.programcategory) {
                    if (!programCategoriesTemp.some(category => category.name === program.programcategory.name)) {
                        programCategoriesTemp.push(program.programcategory)
                    }
                }
            })
            programCategoriesTemp.sort((a, b) => a.name < b.name ? -1 : (a.name > b.name ? 1 : 0))
            setProgramCategories(programCategoriesTemp);
        }
        //eslint-disable-next-line
    }, [programs])

    const formatDate = (date) => {
        return new Date(Number(date.slice(6, 19))).toLocaleString("sv-SE")
    }

    const renderImg = (imagePath) => {
        if (imagePath) return imagePath
        return "/assets/img-replace.jpg"
    }

    const values = {
        channels,
        programs,
        formatDate,
        renderImg,
        programCategories
    }

    return (
        <RadioContext.Provider value={values}>
            {props.children}
        </RadioContext.Provider>
    );
}

export default RadioProvider;