import '../../index.css'
import { Link } from 'react-scroll';

function NavTab() {
    return (
        <nav className='nav'>
            <ul className='nav__container'>
                <Link to='about-project' spy={true} smooth={true} duration={1000} className='nav__link'>О проекте</Link>
                <Link to='techs-used' spy={true} smooth={true} duration={1000} className='nav__link'>Технологии</Link>
                <Link to='about-me' spy={true} smooth={true} duration={1000} className='nav__link'>Студент</Link>
            </ul>
        </nav>
    )
};

export default NavTab;
