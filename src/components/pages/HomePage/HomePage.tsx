import classNames from 'classnames';
import Footer from 'components/modules/Footer';
import Header from 'components/modules/Header';
import { memo } from 'react';
import { Link } from "react-router-dom";
import { ReactComponent as RightArrow } from './../../../assets/icons/right-arrow.svg';
import { qandAItems } from './constants';
import { getLinkToQiuze } from './helper';
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
                                <div className={styles['compilation-section__desc']}>Персональные подборки для вашего гардероба от стилистов. <br/>Для любых целей. <br/>Полностью онлайн.</div>
                            </div>
                            <div className={styles['compilation-section__right']}></div>
                            <Link to={getLinkToQiuze()}>
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
                                <div className={styles['receive-section__title']}>Как мы работаем</div>
                                <ul className={styles['receive-section__items']}>
                                    <li>Заполняете анкету</li>
                                    <li>Стилисты приложения подберут вам готовые образы</li>
                                    <li>Заказывайте только то, что вам понравилось</li>
                                    <li>Примеряете перед покупкой</li>
                                    <li>Платите только за услуги стилистов, доставка и возврат бесплатны</li>
                                </ul>
                                <div className={styles['receive-section__price']}>Стоимость услуги — <span>1490₽</span></div>
                            </div>
                            <div className={styles['receive-section__right']}></div>
                        </div>
                    </div>
                </div>
                <div className={styles['how-work-section']}>
                    <div className="container">
                        <div className={styles['how-work-section__title']}>Что вас ждет<br/> впереди</div>
                        <div className={classNames(styles['work-example'], styles['work-example--left'])}>
                            <img className={styles['work-example__image']} src={"./assets/images/quize-input.jpg"} alt="" />
                            <div className={styles['work-example__info']}>
                                <div className={styles['work-example__top']}></div>
                                <div className={styles['work-example__title']}>Заполнение анкеты</div>
                                <div className={styles['work-example__desc']}>Анкета нужна, чтобы мы познакомились с вами и смогли наиболее точно подобрать подходящие вещи для ваших целей. На заполнение уйдет 5-7 минут. Это быстрее, чем поход по магазинам или встреча со стилистом. После прохождения опроса вы автоматически регистрируетесь и получаете письмо с паролем на почту.</div>
                            </div>
                        </div>
                        <div className={classNames(styles['work-example'], styles['work-example--right'])}>
                            <img className={styles['work-example__image']} src={"./assets/images/task-creation.jpg"} alt="" />
                            <div className={styles['work-example__info']}>
                                <div className={styles['work-example__top']}></div>
                                <div className={styles['work-example__title']}>Создание задачи</div>
                                <div className={styles['work-example__desc']}>После регистрации вы сможете создавать конкретные задачи для стилистов: выбирать тип задачи, дату и время исполнения. А также оставлять комментарий с пожеланиями. </div>
                            </div>
                        </div>
                        <div className={classNames(styles['work-example'], styles['work-example--left'])}>
                            <img className={styles['work-example__image']} src={"./assets/images/stylists-job.jpg"} alt="" />
                            <div className={styles['work-example__info']}>
                                <div className={styles['work-example__top']}></div>
                                <div className={styles['work-example__title']}>Работа стилистов</div>
                                <div className={styles['work-example__desc']}>Стилисты подберут вам 3 образа. В каждом 5 вещей, включая обувь и аксессуары. Как только образы будут готовы, вам придет уведомление на почту, в приложении вы сможете увидеть их на странице подборок.</div>
                            </div>
                        </div>
                        <div className={classNames(styles['work-example'], styles['work-example--right'])}>
                            <img className={styles['work-example__image']} src={"./assets/images/look-selection.jpg"} alt="" />
                            <div className={styles['work-example__info']}>
                                <div className={styles['work-example__top']}></div>
                                <div className={styles['work-example__title']}>Выбор понравившихся образов</div>
                                <div className={styles['work-example__desc']}>Вы изучаете образы и выбираете вещи, которые вам понравились.</div>
                            </div>
                        </div>
                        <div className={classNames(styles['work-example'], styles['work-example--left'])}>
                            <img className={styles['work-example__image']} src={"./assets/images/delivery-and-payment.jpg"} alt="" />
                            <div className={styles['work-example__info']}>
                                <div className={styles['work-example__top']}></div>
                                <div className={styles['work-example__title']}>Доставка и оплата</div>
                                <div className={styles['work-example__desc']}>Доставка в удобное вам время. Оплата после примерки.</div>
                            </div>
                        </div>
                        <div className={classNames(styles['work-example'], styles['work-example--right'])}>
                            <img className={styles['work-example__image']} src={"./assets/images/feedback.jpg"} alt="" />
                            <div className={styles['work-example__info']}>
                                <div className={styles['work-example__top']}></div>
                                <div className={styles['work-example__title']}>Обратная связь</div>
                                <div className={styles['work-example__desc']}>Если вам не понравится образ или не подойдут вещи, вы сможете связаться со стилистом и рассказать о причинах. И, наоборот, прокомментировать почему образ вас впечатлил, как вы себя в нем ощущаете. С каждым новым комментарием стилист будет лучше знать ваши предпочтения и собирать образы быстрее!</div>
                            </div>
                        </div>
                        <Link to={getLinkToQiuze()}>
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
                        <Link to={getLinkToQiuze()}>
                            <button className={styles['try-quize-section__btn']}>
                                Попробовать
                            </button>
                        </Link>
                    </div>
                </div>
                <div className={styles['q-and-a']}>
                    <div className="container">
                        <div className={styles['q-and-a__content']}>
                            <div className={styles['q-and-a__title']}>Вопросы & Ответы</div>
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