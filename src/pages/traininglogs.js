import Sidebar from '../components/Sidebar'
import useId from '../hooks/useAuth'

export default function TrainingLogPage() {
    const {id, login, logout} = useId();
    console.log(id);
    return (
        <div styles={{display:'flex', flexDirection:'row' }}>
            <Sidebar />
            
        </div>
    )
}