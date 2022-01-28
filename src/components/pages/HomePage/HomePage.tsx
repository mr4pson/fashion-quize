import { Checkbox, Col, Form, Radio, Input, Row, Select, Space } from "antd";
import classNames from "classnames";
import { BMixin, Button } from "components/modules";
import Footer from "components/modules/Footer";
import Header from "components/modules/Header";
import { memo } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as StepsIcon } from "./../../../assets/icons/steps.svg";
import { qandAItems } from "./constants";
import { getLinkToQiuze } from "./helper";
import styles from "./HomePage.module.scss";
import QandAItem from "./QandAItem";
const { Option } = Select;

function HomePage(): JSX.Element {
  const onFinish = (value) => {
    console.log(value);
  };

  return (
    <>
      <Header />
      <div className={styles["home-page"]}>
        <div className={styles["compilation-section"]}>
          <div className="container">
            <div className={styles["compilation-section__title"]}>Подбор и доставка стильных образов</div>
            <div className={styles["compilation-section__desc"]}>
              Персональные подборки для вашего гардероба <br /> от стилистов. Для любых целей. Полностью онлайн.
            </div>
            <div className={styles["compilation-section__btn"]}>
              <Link to={getLinkToQiuze()}>
                <Button mixin={[BMixin.FLEX, BMixin.PRIMARY]}>Заполнить анкету</Button>
              </Link>
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
            <Form onFinish={onFinish}>
              <Form.Item name="Что занимает ваше основное время?">
                <Checkbox.Group>
                  <Row style={{ rowGap: 24 }}>
                    <Col span={12}>
                      <Checkbox value="Работа">Работа</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value="Спорт">Спорт</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value="Путешествия">Путешествия</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value="Кафе и рестораны">Кафе и рестораны</Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value="Активный отдых">Активный отдых</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </Form.Item>

              <Form.Item name="Мой тип фигуры">
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value="Полупрямой/полуприталенный тип (талия выражена, плечи приблизительно равны бедрам по ширине)">
                      Полупрямой/полуприталенный тип (талия выражена, плечи приблизительно равны бедрам по ширине);
                    </Radio>
                    <Radio value="Прямой тип (талия не выражена)">Прямой тип (талия не выражена);</Radio>
                    <Radio value="Приталенный/округлый тип (талия выражена, бедра шире плеч)">
                      Приталенный/округлый тип (талия выражена, бедра шире плеч);
                    </Radio>
                    <Radio value="Прямой тип, при этом плечи шире относительно бёдер">
                      Прямой тип, при этом плечи шире относительно бёдер;
                    </Radio>
                    <Radio value="Округлый тип фигуры крупного телосложения (plus size)">
                      Округлый тип фигуры крупного телосложения (plus size);
                    </Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>

              <Form.Item name="Мои плечи">
                <Radio.Group>
                  <Space direction="horizontal">
                    <Radio value="Короткие">Короткие</Radio>
                    <Radio value="Средние">Средние</Radio>
                    <Radio value="Длинные">Длинные</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>

              <Form.Item name="Тип задачи">
                <Select>
                  <Option value="Минорная">Минорная</Option>
                  <Option value="Сложная">Сложная</Option>
                </Select>
              </Form.Item>

              <Form.Item name="Текст" rules={[{ required: true, message: "Поле не может быть пустым" }]}>
                <Input allowClear/>
              </Form.Item>

              <button>Send</button>
            </Form>
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
                <div className={styles["work-example__quize-btn"]}>
                  <Link to={getLinkToQiuze()}>
                    <Button mixin={[BMixin.FLEX, BMixin.PRIMARY]}>Заполнить анкету</Button>
                  </Link>
                </div>
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
                <Button mixin={[BMixin.FLEX, BMixin.PRIMARY]}>Заполнить анкету</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles["q-and-a"]}>
          <div className={classNames("container", styles["q-and-a__container"])}>
            <div className={styles["q-and-a__content"]}>
              <div className={styles["q-and-a__title"]}>Вопросы & Ответы</div>
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
}

export default memo(HomePage);
