import "../styles/card.css"
import { Link } from "react-router-dom"

export default function Card ({title, image, to, description}) {
    
    return (
        <div className="Card">
            <img src={image} alt={title} />
            <h5>{title}</h5>
            {description && <p>{description}</p>}
            {to && <Link to={to}>Go</Link>}
        </div>
    )
}