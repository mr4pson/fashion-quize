import { memo } from 'react';
import { Link } from "react-router-dom";
import { Page, paths } from 'routes/constants';
import styles from './Footer.module.scss';
import { ReactComponent as Logo } from './../../../assets/icons/logo.svg';

function Footer(): JSX.Element {
    return (
        <div className={styles['footer']}>
            <div className="container">
                <Link to={paths[Page.HOME]}>
                    <Logo className={styles['footer__logo']} />
                </Link>
            </div>
        </div>
    )
}

export default memo(Footer);