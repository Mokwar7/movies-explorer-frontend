import '../../index.css'


function AboutProject() {
    return (
        <section className='project' id='about-project'>
            <h2 className='project__header'>О проекте</h2>
            <span className='project__line'></span>
            <div className='project__container-about'>
                <div className='project__container-text'>
                    <h3 className='project__subheader'>
                        Дипломный проект включал 5 этапов
                    </h3>
                    <p className='project__text'>
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </p>
                </div>
                <div className='project__container-text'>
                    <h3 className='project__subheader'>
                        На выполнение диплома ушло 5 недель
                    </h3>
                    <p className='project__text'>
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </div>
            </div>
            <div className='project__container-graph'>
                <div className='project__container-week'>
                    <div className='project__week-graph'>
                        1 неделя
                    </div>
                    <p className='project__text-graph'>Back-end</p>
                </div>
                <div className='project__container-4week'>
                    <div className='project__4week-graph'>
                        4 недели
                    </div>
                    <p className='project__text-graph'>Front-end</p>
                </div>
            </div>
        </section>
    )
};

export default AboutProject;
