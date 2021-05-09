import Header from 'components/modules/Header';
import { memo, useEffect } from 'react';
import { connect } from "react-redux";
import { setStateAnswersToState } from 'redux/reducers/QuizePage.reducer';
import { TypeQuizePageState } from '../QuizePage/types';
import styles from './CompletePage.module.scss';

function CompletePage(props: TypeQuizePageState): JSX.Element {
    useEffect(() => {
        console.log(props.answers);
        props.setStateAnswersToState({});
    }, [])
    return (
        <div className={styles['complete-page']}>
            <Header />
            <div className="container">
                <div className={styles['complete-page__body']}>
                    <h1 className={styles['complete-page__title']}>Поздравляем, вы успешно прошли опрос.</h1>
                    <div className={styles['complete-page__desc']}>Предоставленная вами информация строго конфиденциальна, не подлежит передаче третьим лицам и используется только для работы над вашим стилем.</div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        answers: state.quizePage?.answers,
    }
}

export default connect(mapStateToProps,
    { setStateAnswersToState })(memo(CompletePage))