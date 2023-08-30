import '../../index.css'


function AboutMe() {
    return (
        <section className='me' id='about-me'>
            <h2 className='project__header'>Студент</h2>
            <span className='me__line'></span>
            <div className='me__container-about'>
                <div className='me__container-text'>
                    <h3 className='me__header'>
                        Виталий
                    </h3>
                    <h5 className='me__subheader'>
                        Фронтенд-разработчик, 30 лет.
                    </h5>
                    <p className='me__text'>
                        Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                    </p>
                    <a href='https://github.com/Mokwar7' target="_blank" className='me__link' rel='noreferrer'>Github</a>
                </div>
                <div className='me__img'></div>
            </div>
        </section>
    )
};

export default AboutMe;
