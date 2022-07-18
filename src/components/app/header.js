import '../../css/components/header.css'
import logo from "../../img/earth.png";

export default function Header() {
    return (
        <header className="header">
            <img src={logo} height={60} width={60} alt="logo"></img>
        </header>
    );
}
