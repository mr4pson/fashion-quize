import { Button } from "antd";
import classNames from "classnames";
import { FC, memo } from "react";
import { Link } from "react-router-dom";

import { Footer, Header } from "components/modules";
import { ReactComponent as StepsIcon } from "./../../../assets/icons/steps.svg";
import { ReactComponent as StepsMobileIcon } from "./../../../assets/icons/steps-mobile.svg";
import { qandAItems, stylistJobs, whyUsItems } from "./constants";
import { getLinkToQiuze } from "./helper";
import styles from "./HomePage.module.scss";
import ImageSlider, { ImageSliderThemes } from "./ImageSlider";
import QandAItem from "./QandAItem";

const HomePage: FC = () => {
  return (
    <>
      <Header />
      <div className={styles["home-page"]}>
        <div className={styles["compilation-section"]}>
          <div className={classNames("container", styles["compilation-section__container"])}>
            <div className={styles["compilation-section__title"]}>Подбор и доставка стильных образов</div>
            <div className={styles["compilation-section__desc"]}>
              Персональные подборки для вашего гардероба <br /> от стилистов. <br /> Для любых целей.Полностью онлайн.
            </div>
            <Link to={getLinkToQiuze()}>
              <Button className={styles["compilation-section__btn"]} type="primary">
                Заполнить анкету
              </Button>
            </Link>
            <div className={classNames("why-us", styles["why-us"])}>
              <h3 className={styles["why-us__title"]}>Почему мы?</h3>
              <ImageSlider slidesToShow={3} theme={ImageSliderThemes.LIGHT}>
                {whyUsItems.map((item, index) => (
                  <div key={`why-us-${index}`} className={classNames(styles["why-us-item"], styles[`why-us-item--${index}`])}>
                    <div className={styles["why-us-item__image"]} style={{ backgroundImage: `url(${item.image})` }}></div>
                    <div className={styles["why-us-item__label"]}>{item.label}</div>
                  </div>
                ))}
              </ImageSlider>
            </div>
          </div>
        </div>
        <div className={styles["receive-section"]}>
          <div className="container">
            <div className={styles["receive-section__content"]}>
              <div className={styles["receive-section__image-card"]}>
                <div className={styles["receive-section__image-card-content"]}></div>
              </div>
              <div className={styles["receive-section__right"]}>
                <StepsIcon className={styles["receive-section__steps"]} />
                <StepsMobileIcon
                  className={classNames(
                    styles["receive-section__steps"],
                    styles["receive-section__steps--mobile"]
                  )}
                />
                <div className={styles["receive-section__title"]}>Как мы работаем</div>
                <ul className={styles["receive-section__items"]}>
                  <li>Вы заполняете анкету;</li>
                  <li>Стилисты приложения подберают вам готовые образы;</li>
                  <li>Заказывайте только то, что вам понравилось;</li>
                  <li>Примеряете перед покупкой;</li>
                  <li>
                    Платите только за услуги стилистов, доставка <br /> и возврат бесплатны.
                  </li>
                </ul>
                <div className={styles["receive-price"]}>
                  <div className={styles["receive-price__content"]}>
                    <div className={styles["receive-price__label"]}>Стоимость услуги:</div>
                    <div className={styles["receive-price__value"]}>1490₽</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classNames(styles["how-work-section"], styles["how-work-section--light"])}>
          <div className={classNames("container", styles["how-work-section__container"])}>
            <h3 className={styles["how-work-section__title"]}>Что вас ждет впереди?</h3>
            <div className={classNames(styles["work-example"], styles["work-example--right"])}>
              <div className={styles["work-example__image"]}>
                <div className={styles["work-example__popup-image"]}></div>
              </div>
              <div className={styles["work-example__info"]}>
                <div className={styles["work-example__number"]}>01.</div>
                <div className={styles["work-example__title"]}>Заполнение анкеты</div>
                <div className={styles["work-example__desc"]}>
                  Анкета нужна, чтобы мы познакомились с вами и смогли наиболее точно подобрать подходящие вещи для
                  ваших целей. <br />
                  На заполнение уйдет 5-7 минут. Это быстрее, чем поход <br /> по магазинам или встреча со стилистом.
                  После прохождения <br /> опроса вы автоматически регистрируетесь и получаете <br /> письмо с паролем
                  на почту.
                </div>
              </div>
            </div>
            <div className={classNames(styles["work-example"], styles["work-example--left"])}>
              <div className={styles["work-example__image"]}>
                <div className={styles["work-example__popup-image"]}></div>
              </div>
              <div className={styles["work-example__info"]}>
                <div className={styles["work-example__number"]}>02.</div>
                <div className={styles["work-example__title"]}>Создание задачи</div>
                <div className={styles["work-example__desc"]}>
                  После регистрации вы сможете создавать конкретные задачи <br /> для стилистов: выбирать тип задачи,
                  дату и время исполнения. <br /> А также оставлять комментарий с пожеланиями.{" "}
                </div>
              </div>
            </div>
            <div className={classNames(styles["work-example"], styles["work-example--right"])}>
              <div className={styles["work-example__image"]}></div>
              <div className={styles["work-example__info"]}>
                <div className={styles["work-example__number"]}>03.</div>
                <div className={styles["work-example__title"]}>Работа стилистов</div>
                <div className={styles["work-example__desc"]}>
                  Стилисты подберут вам <b>3 образа</b>. В каждом 5 вещей, включая обувь и аксессуары. <br /> Как только
                  образы будут готовы, вам придет уведомление на почту. В приложении вы сможете увидеть их на странице
                  подборок <br /> и выбрать понравившиеся.
                </div>
              </div>
              <div className={classNames("stylist-jobs", styles["stylist-jobs"])}>
                <ImageSlider slidesToShow={2} theme={ImageSliderThemes.DARK}>
                  {stylistJobs.map((item, index) => (
                    <div key={`stylist-job-${index}`} className={styles["stylist-job"]}>
                      <div className={styles["stylist-job__image"]} style={{ backgroundImage: `url(${item.image})` }}></div>
                    </div>
                  ))}
                </ImageSlider>
              </div>
            </div>
          </div>
        </div>
        <div className={classNames(styles["how-work-section"], styles["how-work-section--dark"])}>
          <div className={classNames("container", styles["how-work-section__container"])}>
            <div className={classNames(styles["work-example"], styles["work-example--left"])}>
              <div className={styles["work-example__image"]}>
                <div className={styles["work-example__popup-image"]}></div>
              </div>
              <div className={styles["work-example__info"]}>
                <div className={styles["work-example__number"]}>04.</div>
                <div className={styles["work-example__title"]}>Доставка и оплата</div>
                <div className={styles["work-example__desc"]}>Доставка в удобное вам время. Оплата после примерки.</div>
              </div>
            </div>
            <div className={classNames(styles["work-example"], styles["work-example--right"])}>
              <div className={styles["work-example__image"]}></div>
              <div className={styles["work-example__info"]}>
                <div className={styles["work-example__number"]}>05.</div>
                <div className={styles["work-example__title"]}>Обратная связь</div>
                <div className={styles["work-example__desc"]}>
                  Если вам не понравится образ или не подойдут вещи, вы сможете связаться со стилистом и рассказать о
                  причинах. И, наоборот, прокомментировать почему образ вас впечатлил, как вы себя в нем ощущаете. С
                  каждым новым комментарием стилист будет лучше знать ваши предпочтения и собирать образы быстрее!
                </div>
                <Link to={getLinkToQiuze()}>
                  <Button className={styles["work-example__quize-btn"]} type="primary">
                    Заполнить анкету
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["all-types-section"]}>
          <div className="container">
            <div className={styles["all-types-section__card"]}>
              <div className={styles["all-types-section__card-content"]}>
                Подберем образы любых типов: <br /> +size, petite и для беременных
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className={styles["try-quize-section"]}>
            <h3 className={styles["try-quize-section__title"]}>
              Заполните анкету и получите первую подборку <br /> образов от вашего онлайн стилиста
            </h3>
            <div className={styles["try-quize-section__btn-wrap"]}>
              <Link to={getLinkToQiuze()}>
                <Button type="primary">Заполнить анкету</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles["q-and-a"]}>
          <div className={classNames("container", styles["q-and-a__container"])}>
            <div className={styles["q-and-a__title"]}>Вопросы & Ответы</div>
            <div className={styles["q-and-a__content"]}>
              <div className={styles["q-and-a__items"]}>
                {qandAItems.map((qandAItem, index) => (
                  <QandAItem key={`q-and-a-${index}`} item={qandAItem} />
                ))}
              </div>
              <div className={styles["q-and-a__image"]}></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default memo(HomePage);
