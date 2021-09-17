import classNames from 'classnames';
import Footer from 'components/modules/Footer';
import Header from 'components/modules/Header';
import { memo } from 'react';
import { Link } from "react-router-dom";
import { ReactComponent as RightArrow } from './../../../assets/icons/right-arrow.svg';
import { qandAItems } from './constants';
import { getLinkToNameInput } from './helper';
import styles from './HomePage.module.scss';
import QandAItem from './QandAItem';

function HomePage(): JSX.Element {
    return (
        <>
            <Header/>
            <div className={styles['home-page']}>
                <div className={styles['compilation-section']}>
                    <div className="container">
                        <div className={styles['compilation-section__content']}>
                            <div className={styles['compilation-section__left']}>
                                <div className={styles['compilation-section__title']}>Подбор и доставка стильных образов</div>
                                <div className={styles['compilation-section__desc']}>Персональные подборки для вашего гардероба от стилистов за 1990₽. <br/>Для любых целей. <br/>И всё онлайн.</div>
                            </div>
                            <div className={styles['compilation-section__right']}></div>
                            <Link to={getLinkToNameInput()}>
                                <div className={styles['compilation-section__btn-wrap']}>
                                    <div className={styles['compilation-section__btn-white']}>Обнови свой гардероб</div>
                                    <div className={styles['compilation-section__btn-black']}>
                                        <span>Анкета</span>
                                        <RightArrow />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={styles['receive-section']}>
                    <div className="container">
                        <div className={styles['receive-section__content']}>
                            <div className={styles['receive-section__left']}>
                                <div className={styles['receive-section__title']}>Что вы получаете</div>
                                <ul className={styles['receive-section__items']}>
                                    <li>3 подборки одежды</li>
                                    <li>5 вещей + 1 аксессуар в каждой подборке</li>
                                    <li>Персональные рекомендации от стилиста</li>
                                    <li>Платите только за услуги стилиста, доставка и возврат — бесплатно</li>
                                </ul>
                                <div className={styles['receive-section__price']}>Стоимость услуги — <span>1990₽</span></div>
                            </div>
                            <div className={styles['receive-section__right']}></div>
                        </div>
                    </div>
                </div>
                <div className={styles['how-work-section']}>
                    <div className="container">
                        <div className={styles['how-work-section__title']}>Как работает<br/> наш сервис</div>
                        <div className={classNames(styles['work-example'], styles['work-example--left'])}>
                            <div className={styles['work-example__image']}></div>
                            <div className={styles['work-example__info']}>
                                <div className={styles['work-example__top']}></div>
                                <div className={styles['work-example__title']}>Заполнение анкеты</div>
                                <div className={styles['work-example__desc']}>Анкета нужна, чтобы мы познакомились с вами и смогли наиболее точно подобрать подходящие вещи для ваших целей. На заполнение уйдет 15-20 минут. Это быстрее, чем поход в магазин или на прием к стилисту.</div>
                            </div>
                        </div>
                        <div className={classNames(styles['work-example'], styles['work-example--right'])}>
                            <div className={styles['work-example__image']}></div>
                            <div className={styles['work-example__info']}>
                                <div className={styles['work-example__top']}></div>
                                <div className={styles['work-example__title']}>Создание задачи</div>
                                <div className={styles['work-example__desc']}>После заполнения анкеты вы сможете создавать задачи для стилистов, следить за прогрессом и выбирать подборки, а также давать обратную связь. <br/> Все в одном месте.</div>
                            </div>
                        </div>
                        <div className={classNames(styles['work-example'], styles['work-example--left'])}>
                            <div className={styles['work-example__image']}></div>
                            <div className={styles['work-example__info']}>
                                <div className={styles['work-example__top']}></div>
                                <div className={styles['work-example__title']}>Выбор персональных подборок</div>
                                <div className={styles['work-example__desc']}>Вы сможете выбрать какие подборки хотите примерить, а какие нет. Если не понравится ни одна из подборок - разберемся в ситуации и дадим скидку на следующие образы.</div>
                            </div>
                        </div>
                        <div className={classNames(styles['work-example'], styles['work-example--right'])}>
                            <div className={styles['work-example__image']}></div>
                            <div className={styles['work-example__info']}>
                                <div className={styles['work-example__top']}></div>
                                <div className={styles['work-example__title']}>Доставка и примерка</div>
                                <div className={styles['work-example__desc']}>Бесплатно доставим образы в удобное для вас время. Покупайте только то, что вам нравится. При покупке комплекта, из общей суммы вычитается стоимость подбора образов. Доставка и возврат бесплатны, платите только за работу стилиста.</div>
                            </div>
                        </div>
                        <Link to={getLinkToNameInput()}>
                            <button className={styles['how-work-section__quize-btn']}>
                                <span>Заполнить анкету</span>
                                <RightArrow className={styles['icon']} />
                            </button>
                        </Link>
                    </div>
                </div>
                <div className={styles['all-types-section']}>
                    <div className="container">
                        <div className={styles['all-types-section__title']}>Подбираем гардероб для всех, даже если вы не такой как все</div>
                        <div className={styles['all-types-section__line']}></div>
                        <div className={styles['all-types-section__desc']}>Подберем образы любых типов: <br/> +size, petite и для беременных</div>
                        <div className={styles['all-types-section__image']}></div>
                    </div>
                </div>
                <div className={styles['try-quize-section']}>
                    <div className="container">
                        <div className={styles['try-quize-section__title']}>Заполните анкету и получите первую подборку образов от вашего онлайн стилиста</div>
                        <Link to={getLinkToNameInput()}>
                            <button className={styles['try-quize-section__btn']}>
                                Попробовать
                            </button>
                        </Link>
                    </div>
                </div>
                <div className={styles['q-and-a']}>
                    <div className="container">
                        <div className={styles['q-and-a__content']}>
                            <div className={styles['q-and-a__title']}>Q&A</div>
                            <div className={styles['q-and-a__items']}>
                                {qandAItems.map((qandAItem, index) => <QandAItem key={`q-and-a-${index}`} item={qandAItem} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default memo(HomePage);