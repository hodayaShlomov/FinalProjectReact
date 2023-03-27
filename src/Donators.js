import { useSelector } from 'react-redux';
import Donator from './Donator';
import './donators.css'



export default function Donators() {
    const users = useSelector((state) => state.users.usersList)

    return (
        <div className='donators'>
            {users.map((value, index) =>
                <Donator key={index} name={value.name} phone={value.phone} city={value.city} />)}
        </div>
    )
}

