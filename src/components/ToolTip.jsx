import {format} from "date-fns";
import { ru } from 'date-fns/locale';


const ToolTip = ({ count, date= null }) => {
    return (
        <div className="tooltip">
            <div className="coontributions-count">{`${count} contributions`}</div>
            {date
                ? <div className="contribution-date">{format(date, 'EEEE, LLLL d, yyyy', {locale: ru})}</div>
                : null}
        </div>
    );
}


export default ToolTip;
