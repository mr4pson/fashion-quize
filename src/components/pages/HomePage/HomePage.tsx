import { Button } from 'antd';
import { memo } from 'react';
import { Link } from "react-router-dom";
import { Page, paths } from 'routes/constants';
import { getLinkToNameInput } from './helper';
import styles from './HomePage.module.scss';
import classnames from 'classnames';

function HomePage(): JSX.Element {
    return (
        <div className={styles['home-page']}>
            <h1 className={styles['home-page__title']}>Стиль, который вдохновлён вами!</h1>
            <h1 className={styles['home-page__desc']}>Расскажите нам о своём уникальном стиле, размерах, установите ценовой лимит в анкете. Мы подготовим для вас образы и прислушаемся к вашим отзывам, чтобы вы всегда выглядели и чувствовали себя как можно лучше!</h1>
            <div className={styles['home-page__nav']}>
                <Link to={getLinkToNameInput()}>
                    <Button
                        type="primary"
                        danger
                        className={styles['home-page__quize-btn']}
                    >Пройти опрос</Button>
                </Link>
                <Link to={paths[Page.LOGIN]}>
                    <Button
                        type="primary"
                        danger
                        className={classnames(styles['home-page__quize-btn'], styles['home-page__login-btn'])}
                    >Войти</Button>
                </Link>
            </div>
        </div>
    );
}

export default memo(HomePage);