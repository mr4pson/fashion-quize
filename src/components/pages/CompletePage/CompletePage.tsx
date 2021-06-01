import axios from 'axios';
import Header from 'components/modules/Header';
import { memo, useEffect } from 'react';
import { connect } from "react-redux";
import { setStateAnswersToState } from 'redux/reducers/QuizePage.reducer';
import { TypeQuizePageState } from '../QuizePage/types';
import styles from './CompletePage.module.scss';

function CompletePage(props: TypeQuizePageState): JSX.Element {
    useEffect(() => {
        const payload = {
            name: props.answers[1],
            email: props.answers[4],
            data: JSON.stringify(props.answers),
        };
        console.log(payload);
        
        axios.post('/api/answers', payload)
        props.setStateAnswersToState({});
    }, [])
    return (
        <div className={styles['complete-page']}>
            {/* <Header /> */}
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