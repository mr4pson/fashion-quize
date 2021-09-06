import { memo } from 'react';
import { Link } from "react-router-dom";
import { Page, paths } from 'routes/constants';
import styles from './Footer.module.scss';

function Footer(): JSX.Element {
    return (
        <div className={styles['footer']}>
            <div className="container">
                <Link to={paths[Page.HOME]}>
                    <div className={styles['footer__logo']}>Eyelish</div>
                </Link>
            </div>
        </div>
    )
}

export default memo(Footer);