import '../../index.css'
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import React from 'react';
import Portfolio from '../Portfolio/Portfolio';

function Main() {
    React.useEffect(() => {
        document.title = 'Главная'
        localStorage.setItem('lastPage', '/')
    }, [])

    return (
        <main>
            <Promo />
            <NavTab />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
        </main>
    )
};

export default Main;
