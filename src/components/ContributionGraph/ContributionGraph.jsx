import { useState, useEffect } from "react";
import {
    format, startOfWeek, subWeeks,
    addDays, eachDayOfInterval, isSameDay,
    isSameMonth
} from 'date-fns';
import { ru } from 'date-fns/locale';
import GraphCol from "../GraphCol/GraphCol.jsx";


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
        console.log(data)
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
                    <GraphCol key={weekIndex} week={week} contributions={contributions} ></GraphCol>
                ))}
            </div>
        </div>
    );
}


export default ContributionGraph;
