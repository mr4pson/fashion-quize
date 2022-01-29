import { Button } from "antd";
import classNames from "classnames";
import { FC, memo } from "react";
import { Link } from "react-router-dom";

import { Footer, Header } from "components/modules";
import { ReactComponent as StepsIcon } from "./../../../assets/icons/steps.svg";
import { qandAItems, stylistJobs, whyUsItems } from "./constants";
import { getLinkToQiuze } from "./helper";
import s from "./HomePage.module.scss";
import ImageSlider, { ImageSliderThemes } from "./ImageSlider";
import QandAItem from "./QandAItem";

const HomePage: FC = () => {
  return (
    <>
      <Header />
      <div className={s["home-page"]}>
        <div className={s["compilation-section"]}>
          <div className={classNames("container", s["compilation-section__container"])}>
            <div className={s["compilation-section__title"]}>Подбор и доставка стильных образов</div>
            <div className={s["compilation-section__desc"]}>
              Персональные подборки для вашего гардероба <br /> от стилистов. Для любых целей. Полностью онлайн.
            </div>
            <Link to={getLinkToQiuze()}>
              <Button className={s["compilation-section__btn"]} type="primary">
                Заполнить анкету
              </Button>
            </Link>
            <div className={classNames("why-us", s["why-us"])}>
              <h3 className={s["why-us__title"]}>Почему мы?</h3>
              <ImageSlider slidesToShow={3} theme={ImageSliderThemes.LIGHT}>
                {whyUsItems.map((item, index) => (
                  <div key={`why-us-${index}`} className={classNames(s["why-us-item"], s[`why-us-item--${index}`])}>
                    <div className={s["why-us-item__image"]} style={{ backgroundImage: `url(${item.image})` }}></div>
                    <div className={s["why-us-item__label"]}>{item.label}</div>
                  </div>
                ))}
              </ImageSlider>
            </div>
          </div>
        </div>
        <div className={s["receive-section"]}>
          <div className="container">
            <div className={s["receive-section__content"]}>
              <div className={s["receive-section__image-card"]}>
                <div className={s["receive-section__image-card-content"]}></div>
              </div>
              <div className={s["receive-section__right"]}>
                <StepsIcon className={s["receive-section__steps"]} />
                <div className={s["receive-section__title"]}>Как мы работаем</div>
                <ul className={s["receive-section__items"]}>
                  <li>Вы заполняете анкету;</li>
                  <li>Стилисты приложения подберают вам готовые образы;</li>
                  <li>Заказывайте только то, что вам понравилось;</li>
                  <li>Примеряете перед покупкой;</li>
                  <li>
                    Платите только за услуги стилистов, доставка <br /> и возврат бесплатны.
                  </li>
                </ul>
                <div className={s["receive-price"]}>
                  <div className={s["receive-price__content"]}>
                    <div className={s["receive-price__label"]}>Стоимость услуги:</div>
                    <div className={s["receive-price__value"]}>1490₽</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classNames(s["how-work-section"], s["how-work-section--light"])}>
          <div className={classNames("container", s["how-work-section__container"])}>
            <h3 className={s["how-work-section__title"]}>Что вас ждет впереди?</h3>
            <div className={classNames(s["work-example"], s["work-example--right"])}>
              <div className={s["work-example__image"]}>
                <div className={s["work-example__popup-image"]}></div>
              </div>
              <div className={s["work-example__info"]}>
                <div className={s["work-example__number"]}>01.</div>
                <div className={s["work-example__title"]}>Заполнение анкеты</div>
                <div className={s["work-example__desc"]}>
                  Анкета нужна, чтобы мы познакомились с вами и смогли наиболее точно подобрать подходящие вещи для
                  ваших целей. <br />
                  На заполнение уйдет 5-7 минут. Это быстрее, чем поход <br /> по магазинам или встреча со стилистом.
                  После прохождения <br /> опроса вы автоматически регистрируетесь и получаете <br /> письмо с паролем
                  на почту.
                </div>
              </div>
            </div>
            <div className={classNames(s["work-example"], s["work-example--left"])}>
              <div className={s["work-example__image"]}>
                <div className={s["work-example__popup-image"]}></div>
              </div>
              <div className={s["work-example__info"]}>
                <div className={s["work-example__number"]}>02.</div>
                <div className={s["work-example__title"]}>Создание задачи</div>
                <div className={s["work-example__desc"]}>
                  После регистрации вы сможете создавать конкретные задачи <br /> для стилистов: выбирать тип задачи,
                  дату и время исполнения. <br /> А также оставлять комментарий с пожеланиями.{" "}
                </div>
              </div>
            </div>
            <div className={classNames(s["work-example"], s["work-example--right"])}>
              <div className={s["work-example__image"]}></div>
              <div className={s["work-example__info"]}>
                <div className={s["work-example__number"]}>03.</div>
                <div className={s["work-example__title"]}>Работа стилистов</div>
                <div className={s["work-example__desc"]}>
                  Стилисты подберут вам <b>3 образа</b>. В каждом 5 вещей, включая обувь и аксессуары. <br /> Как только
                  образы будут готовы, вам придет уведомление на почту. В приложении вы сможете увидеть их на странице
                  подборок <br /> и выбрать понравившиеся.
                </div>
              </div>
              <div className={classNames("stylist-jobs", s["stylist-jobs"])}>
                <ImageSlider slidesToShow={2} theme={ImageSliderThemes.DARK}>
                  {stylistJobs.map((item, index) => (
                    <div key={`stylist-job-${index}`} className={s["stylist-job"]}>
                      <div className={s["stylist-job__image"]} style={{ backgroundImage: `url(${item.image})` }}></div>
                    </div>
                  ))}
                </ImageSlider>
              </div>
            </div>
          </div>
        </div>
        <div className={classNames(s["how-work-section"], s["how-work-section--dark"])}>
          <div className={classNames("container", s["how-work-section__container"])}>
            <div className={classNames(s["work-example"], s["work-example--left"])}>
              <div className={s["work-example__image"]}>
                <div className={s["work-example__popup-image"]}></div>
              </div>
              <div className={s["work-example__info"]}>
                <div className={s["work-example__number"]}>04.</div>
                <div className={s["work-example__title"]}>Доставка и оплата</div>
                <div className={s["work-example__desc"]}>Доставка в удобное вам время. Оплата после примерки.</div>
              </div>
            </div>
            <div className={classNames(s["work-example"], s["work-example--right"])}>
              <div className={s["work-example__image"]}></div>
              <div className={s["work-example__info"]}>
                <div className={s["work-example__number"]}>05.</div>
                <div className={s["work-example__title"]}>Обратная связь</div>
                <div className={s["work-example__desc"]}>
                  Если вам не понравится образ или не подойдут вещи, вы сможете связаться со стилистом и рассказать о
                  причинах. И, наоборот, прокомментировать почему образ вас впечатлил, как вы себя в нем ощущаете. С
                  каждым новым комментарием стилист будет лучше знать ваши предпочтения и собирать образы быстрее!
                </div>
                <Link to={getLinkToQiuze()}>
                  <Button className={s["work-example__quize-btn"]} type="primary">
                    Заполнить анкету
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={s["all-types-section"]}>
          <div className="container">
            <div className={s["all-types-section__card"]}>
              <div className={s["all-types-section__card-content"]}>
                Подберем образы любых типов: <br /> +size, petite и для беременных
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className={s["try-quize-section"]}>
            <h3 className={s["try-quize-section__title"]}>
              Заполните анкету и получите первую подборку <br /> образов от вашего онлайн стилиста
            </h3>
            <div className={s["try-quize-section__btn-wrap"]}>
              <Link to={getLinkToQiuze()}>
                <Button type="primary">Заполнить анкету</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className={s["q-and-a"]}>
          <div className={classNames("container", s["q-and-a__container"])}>
            <div className={s["q-and-a__content"]}>
              <div className={s["q-and-a__title"]}>Вопросы & Ответы</div>
              <div className={s["q-and-a__items"]}>
                {qandAItems.map((qandAItem, index) => (
                  <QandAItem key={`q-and-a-${index}`} item={qandAItem} />
                ))}
              </div>
              <div className={s["q-and-a__image"]}></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default memo(HomePage);
