import '../../index.css'


function Techs() {
    return (
        <section className='techs' id='techs-used'>
            <h2 className='project__header'>Технологии</h2>
            <span className='techs__line'></span>
            <div className='techs__container-about'>
                <h3 className='techs__header-about'>
                    7 Технологий
                </h3>
                <p className='techs__text'>
                    На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
                </p>
                <div className='techs__container-stack'>
                    <div className='techs__stack'>HTML</div>
                    <div className='techs__stack'>CSS</div>
                    <div className='techs__stack'>JS</div>
                    <div className='techs__stack'>React</div>
                    <div className='techs__stack'>Git</div>
                    <div className='techs__stack'>Express.js</div>
                    <div className='techs__stack'>mongoDB</div>
                </div>
            </div>
        </section>
    )
};

export default Techs;
