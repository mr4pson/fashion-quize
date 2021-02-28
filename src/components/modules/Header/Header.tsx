import { memo } from 'react';
import { Link } from "react-router-dom";
import { Page, paths } from 'routes/constants';
import styles from './Header.module.scss';

function Header(): JSX.Element {
    return (
        <div className={styles['header']}>
            <div className="container">
                <Link to={paths[Page.HOME]}>
                    <div className={styles['header__logo']}>Fashion quize</div>
                </Link>
            </div>
        </div>
    )
}

export default memo(Header);