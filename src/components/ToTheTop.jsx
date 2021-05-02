const ToTheTop = () => {

    const circle = {
        cursor: "pointer",
        width: "100px",
        height: "100px",
        background: "black",
        borderRadius: "100%",
        position: "fixed",
        bottom: "2vh",
        right: "2vw"
    }

    const bar1 = {
        width: "42%",
        height: "5%",
        background: "white",
        transform: "rotate(-45deg)",
        position: "absolute",
        top: "42%",
        left: "16%"

    }
    const bar2 = {
        width: "42%",
        height: "5%",
        background: "white",
        transform: "rotate(45deg)",
        position: "absolute",
        top: "42%",
        left: "43%"
    }

    return ( 
        <div>
            <div style={circle} onClick={()=>window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div style={bar1}></div>
                <div style={bar2}></div>
            </div>
        </div>
     );
}
 
export default ToTheTop;