import {useEffect, useRef, useState} from "react";
import { HTMLAttributes } from "react";
import ToolTip from "./ToolTip.tsx";


interface GraphCubeProps {
    isToday: boolean;
    count: number;
    date: Date | null;
    label: string;
}

enum ContributionLevel {
    None = 'no-contrib',
    Low = 'under-10',
    Medium = 'under-20',
    High = 'under-30',
    VeryHigh = 'above-30'
}

const GraphCube = ({ isToday, count, date, label, ...props }: GraphCubeProps & HTMLAttributes<HTMLDivElement>) => {
    const getColor = (count: number): ContributionLevel => {
        if (count === 0) return ContributionLevel.None;
        if (count < 10) return ContributionLevel.Low;
        if (count < 20) return ContributionLevel.Medium;
        if (count < 30) return ContributionLevel.High;
        return ContributionLevel.VeryHigh;
    };

    const [ isToolTip, setIsToolTip ] = useState(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsToolTip(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <div className="day-cell-wrapper" ref={wrapperRef} {...props}>
            <div className={`day-cell ${isToday ? 'today' : ''} ${getColor(count)}`}
                 onClick={() => setIsToolTip(!isToolTip)} />
            { isToolTip ? <ToolTip label={label} date={date} /> : null }
        </div>
    );
}

export default GraphCube;
