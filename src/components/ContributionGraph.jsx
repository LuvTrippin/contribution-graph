import { useState, useEffect } from "react";
import {
    format, startOfWeek, subWeeks,
    addDays, eachDayOfInterval, isSameDay,
    isSameMonth
} from 'date-fns';
import { ru } from 'date-fns/locale';
import GraphCube from "./GraphCube.jsx";


const ContributionGraph = () => {
    const [contributions, setContributions] = useState({});
    const [weeks, setWeeks] = useState([]);

    const getWeeks = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const startDate = subWeeks(today, 50);
        const firstMonday = startOfWeek(startDate, { weekStartsOn: 1 });

        const weeksArray = [];
        for (let i = 0; i < 51; i++) {
            const weekStart = addDays(firstMonday, i * 7);
            const weekEnd = addDays(weekStart, 6);

            weeksArray.push(eachDayOfInterval({
                start: weekStart,
                end: weekEnd
            }));
        }

        return weeksArray;
    }

    const fetchContributions = async () => {
        const response = await fetch('https://dpg.gg/test/calendar.json');
        if (!response.ok) {
            throw new Error("Ошибка при получении данных")
        }
        const data = await response.json();
        setContributions(data);
    }

    const shouldRenderMonth = (week, weekIndex) => {
        if (weekIndex === 0) return true;

        const prevWeekFirstDay = weeks[weekIndex-1][0];
        const currentWeekFirstDay = week[0];

        return !isSameMonth(prevWeekFirstDay, currentWeekFirstDay);
    };

    useEffect(() => {
        try {
            fetchContributions();
        } catch (error) {
            console.log(error);
        }

        setWeeks(getWeeks());
    }, []);

    return (
        <div className="contribution-graph">
            <div className="months-header">
                {weeks.map((week, weekIndex) =>
                        shouldRenderMonth(week, weekIndex) && (
                            <div key={`month-${weekIndex}`} className="month-label">
                                {format(week[0], 'MMM', {locale: ru})}
                            </div>
                        )
                )}
            </div>

            <div className="weeks-container">
                {weeks.map((week, weekIndex) => (
                    <div className="week-column" key={weekIndex}>
                        {week.map((date) => {
                            const dateString = format(date, 'yyyy-MM-dd');
                            const count = contributions[dateString] || 0;
                            const isToday = isSameDay(date, new Date());

                            return (
                                <GraphCube key={dateString} isToday={isToday} count={count} date={date} label={count}/>
                            );
                        })}
                    </div>
                ))}
            </div>
            <div className="day-names-container">
                <div className="day-name">Пн</div>
                <div className="day-name">Ср</div>
                <div className="day-name">Пт</div>
            </div>
            <div className="cube-explaining">
                <div>Меньше</div>
                <div className="cube-container">
                    <GraphCube key="0" isToday={false} count={0} date={null} label={"No"} />
                    <GraphCube key="0" isToday={false} count={1} date={null} label={"1-9"} />
                    <GraphCube key="0" isToday={false} count={10} date={null} label={"10-19"} />
                    <GraphCube key="0" isToday={false} count={20} date={null} label={"20-29"} />
                    <GraphCube key="0" isToday={false} count={30} date={null} label={"30+"} />
                </div>
                <div>Больше</div>
            </div>
        </div>
    );
}


export default ContributionGraph;
