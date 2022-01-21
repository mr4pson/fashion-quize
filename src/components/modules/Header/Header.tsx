import { memo } from 'react';
import { Link } from "react-router-dom";
import { Page, paths } from 'routes/constants';
import Button, { ButtonTypes } from '../Button';
import { ReactComponent as Logo } from './../../../assets/icons/logo.svg';
import { ReactComponent as FbIcon } from './../../../assets/icons/ic-fb.svg';
import { ReactComponent as InstIcon} from './../../../assets/icons/ic-inst.svg';
import styles from './Header.module.scss';

function Header(): JSX.Element {
    return (
        <div className={styles['header']}>
            <div className="container">
                <div className={styles['header__content']}>
                    <Link to={paths[Page.HOME]}>
                        <Logo className={styles['header__logo']} />
                    </Link>
                    <div className={styles['header__actions']}>
                        <div className={styles['header__links']}>
                            <InstIcon />
                            <FbIcon />
                        </div>
                        <Link to={paths[Page.LOGIN]}>
                            <Button type={ButtonTypes.SECONDARY} className={styles['header__login-btn']}>Войти</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Header);