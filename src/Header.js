
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './header.css'
export default function Header(props) {

    const [isDirector, setIsDirector] = useState(props.isDirector);


    useEffect(() => {
        let condition = (isDirector.toLowerCase() === 'true')
        setIsDirector(condition);
    }, []);
    console.log(isDirector)
   


    return (
        <>
            <div className="topnav">
                <Link to={`/home/${isDirector}/items`} className="link active">Items</Link>
                {isDirector && <Link to={`/home/${isDirector}/addItem`} className="link">Add Item</Link>}
                {isDirector && <Link to={`/home/${isDirector}/donators`} className="link">view donators</Link>}
            </div>
        </>
    );
}




