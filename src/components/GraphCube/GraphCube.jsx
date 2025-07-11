import {format} from "date-fns";


const GraphCube = ({ isToday, count, date }) => {
    const getColor = (count) => {
        if (count === 0) return '#EDEDED';
        if (count < 10) return '#ACD5F2';
        if (count < 20) return '#7FA8C9';
        if (count < 30) return '#527BA0';
        return '#254E77';
    };

    return (
        <div
            className={`day-cell ${isToday ? 'today' : ''}`}
            style={{backgroundColor: getColor(count)}}
            data-tooltip={`${count} contributions · ${format(date, 'EEEE, MMMM d, yyyy')}`}
        />
    );
}

export default GraphCube;
