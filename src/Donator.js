
import './donators.css'

export default function Donator(props) {




    return (
        <>
            <div className='donator'>
                <p className="name">{props.name}</p>
                <p className="phone"><span>phone:</span> {props.phone}</p>
                <p className="city"><span>city:</span> {props.city}</p>
            </div>
        </>
    )
}