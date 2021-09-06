import { memo } from 'react';
import { Link } from "react-router-dom";
import { Page, paths } from 'routes/constants';
import styles from './Header.module.scss';

function Header(): JSX.Element {
    return (
        <div className={styles['header']}>
            <div className="container">
                <div className={styles['header__content']}>
                    <Link to={paths[Page.HOME]}>
                        <div className={styles['header__logo']}>Eyelish</div>
                    </Link>
                    <Link to={paths[Page.LOGIN]}>
                        <div className={styles['header__login-btn']}>Войти</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default memo(Header);