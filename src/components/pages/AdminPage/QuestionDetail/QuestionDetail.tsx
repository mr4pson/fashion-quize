import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance, Input, Select } from "antd";
import { getImageUrl } from "common/helpers/common-helpers";
import { QuestionType } from "components/pages/QuizePage/types";
import { useUploadFile } from "hooks/useUploadFile";
import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { TypeRootState } from "redux/ReduxStore";
import { blocksThunks } from "redux/slicers/blocksPageSlice";
import { questionsThunks } from "redux/slicers/questionsPageSlice";
import { axiosInstance } from "../constants";
import { AdmPage, paths } from "../routes/constants";
import { PageMetods } from "../types";
import { layout, QuestionTypeOptions, validateMessages } from "./constants";
import { getPageTitle } from "./helpers";
import styles from "./QuestionDetail.module.scss";
import { ChangeQuestionDto } from "./types";

const { Option } = Select;

type Props = {
  method: PageMetods;
};

const QuestionDetail: React.FC<Props> = (props) => {
  const formRef = useRef<FormInstance>(null);
  const { id, quizeType } = useParams() as any;
  const [loading, setLoading] = useState(false);
  const [questionType, setQuestionType] = useState<QuestionType>("" as QuestionType);
  const history = useHistory();

  const dispatch = useDispatch();
  const state = useSelector((state: TypeRootState) => ({
    question: state.questionsPage.question,
    blocks: state.blocksPage.blocks,
  }));

  const { mediaFile, uploadMediaFile } = useUploadFile(formRef);

  const initialValues = {
    ...state.question,
    block: state.question.block?.id,
    image: "",
  };

  const [answerOptions, setAnswerOptions] = useState<any>([]);

  const onFinish = async (questionData: ChangeQuestionDto) => {
    const payload = {
      ...questionData,
      image: mediaFile ? mediaFile : state.question.image,
      options: JSON.stringify(answerOptions),
      quizeType: quizeType,
    };

    setLoading(true);

    if (id) {
      await axiosInstance.put(`/api/questions/${id}`, payload);
      setLoading(false);
      history.push(`${paths[AdmPage.QUESTIONS]}/${quizeType}`);
      return;
    }

    await axiosInstance.post("/api/questions", payload);
    setLoading(false);
    history.push(`${paths[AdmPage.QUESTIONS]}/${quizeType}`);
  };

  useEffect(() => {
    if (id) {
      dispatch(questionsThunks.getQuestion(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    switch (questionType) {
      case QuestionType.INPUT:
      case QuestionType.TEXT:
        setAnswerOptions("");
        break;

      default:
        break;
    }
  }, [questionType]);

  useEffect(() => {
    if (state.question.options) {
      setAnswerOptions(state.question.options);
    }
    setQuestionType(state.question.type);
  }, [state.question]);

  useEffect(() => {
    dispatch(blocksThunks.getBlocks());
    return () => {
      dispatch(questionsThunks.clearQuestion());
    };
  }, [dispatch]);

  const handleAddAnswerOption = () => {
    setAnswerOptions((prevState) => (Array.isArray(prevState) ? prevState.concat("") : [""]));
  };

  const handleRemoveAnswerOption = (index) => {
    setAnswerOptions((prevState) => {
      const newState = [...prevState];
      newState.splice(index, 1);
      return newState;
    });
  };

  const handleAnswerOptionChange = (e, index) => {
    setAnswerOptions((prevState) => {
      const newState = [...prevState];
      newState[index] = e.target.value;
      return newState;
    });
  };

  const handleTypeChange = (value: QuestionType) => {
    setQuestionType(value);
  };

  return (
    <div className={styles["detail"]}>
      <div className={styles["detail__header"]}>
        <h1>{getPageTitle(id)}</h1>
      </div>
      {(!!id && !!state.question.description) || props.method === PageMetods.CREATE ? (
        <Form
          initialValues={initialValues}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item name="description" label="Вопрос" rules={[{ required: true, type: "string", max: 99 }]}>
            <Input.TextArea />
          </Form.Item>

          <Form.Item name="image" label="Изображение">
            <Input type="file" onChange={uploadMediaFile} />
          </Form.Item>

          {state.question?.image && (
            <div
              style={{
                backgroundImage: `url(${mediaFile ? getImageUrl(mediaFile) : getImageUrl(state.question?.image)})`,
              }}
              className={styles["detail__uploaded-image"]}
            ></div>
          )}

          <Form.Item name="block" label="Блок" rules={[{ required: true }]}>
            <Select>
              {state.blocks
                ?.map((block) => ({
                  value: block.id,
                  title: block.title,
                }))
                .map((option, index) => (
                  <Option key={"question-types" + index} value={option.value}>
                    {option.title}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item name="type" label="Тип" rules={[{ required: true }]}>
            <Select onChange={handleTypeChange}>
              {QuestionTypeOptions?.map((option, index) => (
                <Option key={"question-types" + index} value={option.value}>
                  {option.title}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {[QuestionType.SINGLE_OPTION, QuestionType.MULTIPLE_OPTION].includes(questionType) && (
            <div className={styles["answer-controls"]}>
              <h2 className={styles["answer-controls__title"]}>Варианты ответов</h2>
              {answerOptions?.length > 0 &&
                answerOptions.map((answerOption, index) => (
                  <div key={"answer-option" + index} className={styles["answer-control"]}>
                    <Input
                      value={answerOption}
                      onChange={(e) => handleAnswerOptionChange(e, index)}
                      className={styles["answer-control__body"]}
                      type="text"
                    />
                    <button
                      onClick={() => handleRemoveAnswerOption(index)}
                      type="button"
                      className={styles["answer-control__btn"]}
                    >
                      <CloseOutlined />
                    </button>
                  </div>
                ))}
              {answerOptions?.length === 0 && (
                <div className={styles["answer-controls__info"]}>Список вариантов ответов пуст</div>
              )}
              <div className={styles["answer-controls__add-btn-container"]}>
                <Button type="link" onClick={handleAddAnswerOption}>
                  Добавить
                </Button>
              </div>
            </div>
          )}

          <div className={styles["detail__save-btn"]}>
            <Button loading={loading} type="primary" htmlType="submit">
              Сохранить
            </Button>
          </div>
        </Form>
      ) : (
        ""
      )}
    </div>
  );
};

export default memo(QuestionDetail);
