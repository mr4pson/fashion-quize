import { Button } from 'antd';
import { memo } from 'react';
import { Link } from "react-router-dom";
import { getLinkToFisrtQuestion } from './helper';
import styles from './HomePage.module.scss';

function HomePage(): JSX.Element {
    return (
        <div className={styles['home-page']}>
            <h1 className={styles['home-page__title']}>Открой для себя покупки по-новому</h1>
            <div className={styles['home-page__nav']}>
                <Link to={getLinkToFisrtQuestion()}>
                    <Button
                        type="primary"
                        danger
                        className={styles['home-page__quize-btn']}
                    >Пройти опрос</Button>
                </Link>
            </div>
        </div>
    );
}

export default memo(HomePage);