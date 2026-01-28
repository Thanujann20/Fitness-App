import "../styles/card.css";
import { Link } from "react-router-dom"

export default function Card ({title, image, to, description, onUpdate}) {
    
    let action;

    if (to) {
        action = <Link to={to}>Go</Link>
    }
    else if (onUpdate) {
        action = <button type="button" onClick={onUpdate}></button>
    }
    return (
        <div className="Card">
            <img src={image} alt={title} />
            <h5>{title}</h5>
            {description && <p>{description}</p>}
            {action}
        </div>
    )
}