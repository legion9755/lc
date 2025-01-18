import InteractiveExploration from './InteractiveExploration';
import data from '../data.json' // Import your data
const Interaction = () => {
    return (
        <div>
            <InteractiveExploration data={ data } />
        </div>
    );
}

export default Interaction;


