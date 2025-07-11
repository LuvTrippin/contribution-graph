import {format} from "date-fns";
import {useEffect, useRef, useState} from "react";
import ToolTip from "./ToolTip.jsx";


const GraphCube = ({ isToday, count, date, label }) => {
    const getColor = (count) => {
        if (count === 0) return 'no-contrib';
        if (count < 10) return 'under-10';
        if (count < 20) return 'under-20';
        if (count < 30) return 'under-30';
        return 'above-30';
    };

    const [ isToolTip, setIsToolTip ] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsToolTip(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <div className="day-cell-wrapper" ref={wrapperRef}>
            <div className={`day-cell ${isToday ? 'today' : ''} ${getColor(count)}`}
                 onClick={() => setIsToolTip(!isToolTip)} />
            { isToolTip ? <ToolTip count={label} date={date} /> : null }
        </div>
    );
}

export default GraphCube;
