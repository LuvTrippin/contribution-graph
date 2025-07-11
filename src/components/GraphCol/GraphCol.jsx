import {format, isSameDay} from "date-fns";
import GraphCube from "../GraphCube/GraphCube.jsx";


const GraphCol = ({ week, contributions }) => {
    return (
        <div className="week-column">
            {week.map((date) => {
                const dateString = format(date, 'yyyy-MM-dd');
                const count = contributions[dateString] || 0;
                const isToday = isSameDay(date, new Date());

                return (
                    <GraphCube key={dateString} isToday={isToday} count={count} date={date} />
                );
            })}
        </div>
    );
}

export default GraphCol;