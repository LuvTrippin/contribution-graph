import { useState, useEffect } from "react";
import {
    format, startOfWeek, subWeeks,
    addDays, eachDayOfInterval, isSameDay,
    isSameMonth
} from 'date-fns';


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


    useEffect(() => {
        try {
            fetchContributions();
        } catch (error) {
            console.log(error);
        }

        console.log(getWeeks());
        setWeeks(getWeeks());
    }, []);

    return (
        <div className="contribution-graph">
        </div>
    );
}


export default ContributionGraph;
