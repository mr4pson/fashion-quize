import { Button, Form, FormInstance } from 'antd';
import classNames from 'classnames';
import Header from 'components/modules/Header';
import Question from 'components/modules/Question/Question';
import { memo, useEffect, useRef } from 'react';
import { connect } from "react-redux";
import { useHistory, useParams } from 'react-router';
import { Link } from "react-router-dom";
import { setStateAnswersToState } from 'redux/reducers/QuizePage.reducer';
import { Page, paths } from 'routes/constants';
import { questions } from './constants';
import { getNextQuestionLink, getPrevQuestionLink } from './helper';
import styles from './QuizePage.module.scss';
import { TypeQuizePageState } from './types';

function QuizePage(props: TypeQuizePageState): JSX.Element {
    const { questionNumber } = useParams() as any;
    const questionsNumber = questions.length;
    const questionIndex = questions.findIndex((question) => question.id === +questionNumber);
    const question = questions[questionIndex];
    const formRef = useRef<FormInstance>(null);
    const history = useHistory();

    useEffect(() => {
        formRef.current?.resetFields();
    })

    const onFinish = (values: any) => {
        const formValue = formRef.current?.getFieldsValue();
        const answers = { ...props.answers, [question.id]: formValue.answer };
        props.setStateAnswersToState(answers);

        if (+questionNumber === questionsNumber) {
            history.push(paths[Page.COMPLETE]);
            return;
        }

        history.push(getNextQuestionLink(questionNumber));
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const initialValue = { answer: props.answers[question?.id] };

    return (
        <div className={styles['quize-page']}>
            <Header />
            <Form
                name="basic"
                ref={formRef}
                initialValues={initialValue}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <div className="container">
                    {questionIndex !== -1 ?
                        <Question question={question} />
                        : <div className={styles['quize-page__no-questions']}>Такого вопроса не существует.</div>
                    }
                </div>
                <div className={classNames(styles['quize-page__nav'], styles['navigation'])}>
                    <div className={styles['container']}>
                        <div className={styles['navgation__prev-btn']}>
                            {questionNumber > 1 ? <Link to={getPrevQuestionLink(questionNumber)}>
                                <Button
                                    type="primary"
                                    danger
                                    className={styles['navgation__quize-btn']}
                                >Назад</Button>
                            </Link> : ''}
                        </div>
                        <div className={styles['navgation__questions']}>{questionNumber} / {questionsNumber}</div>
                        <div className={styles['navgation__next-btn']}>
                            <Button
                                htmlType="submit"
                                type="primary"
                                danger
                                className={styles['navgation__quize-btn']}
                            >{questionNumber < questionsNumber ? 'Далее' : 'Сдать'}</Button>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        answers: state.quizePage?.answers,
    }
}

export default connect(mapStateToProps,
    { setStateAnswersToState })(memo(QuizePage))