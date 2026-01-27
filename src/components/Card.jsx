import "../styles/card.css";
import { Link } from "react-router-dom"

export default function Card ({title, image, to}) {
    return (
        <div className="Card">
            <img src={image} alt={title} />
            <h5>{title}</h5>
            <Link to={to}>Go</Link>
        </div>
    )
}