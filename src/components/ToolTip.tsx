import {format} from "date-fns";
import { ru } from 'date-fns/locale';

interface ToolTipProps {
    date: Date | null;
    label: string;
}

const ToolTip = ({ label, date= null }: ToolTipProps) => {
    return (
        <div className="tooltip">
            <div className="coontributions-count">{`${label} contributions`}</div>
            {date
                ? <div className="contribution-date">{format(date, 'EEEE, LLLL d, yyyy', {locale: ru})}</div>
                : null}
        </div>
    );
}


export default ToolTip;
