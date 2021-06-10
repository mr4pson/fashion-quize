import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance, Input, Select } from "antd";
import { getImageUrl, openNotification } from "common/heplers/common-helpers";
import { useUploadFile } from "hooks/useUploadFile";
import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { thunks as blockThunks } from "redux/reducers/blocksPageReducer";
import { thunks } from "redux/reducers/questionsPageReducer";
import { TypeAppState } from "redux/ReduxStore";
import { axiosInstance } from "../constants";
import { AdmPage, paths } from "../routes/constants";
import { PageMetods } from "../types";
import { QuestionTypeOptions } from "./constants";
import { getPageTitle } from "./helpers";
import styles from "./QuestionDetail.module.scss";
import { ChangeQuestionDto } from "./types";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} не может быть пустым!",
  string: {
    max: "${label} не может быть длиннее ${max} символов",
  },
};
/* eslint-enable no-template-curly-in-string */

type Props = {
  method: PageMetods;
};

const QuestionDetail: React.FC<Props> = (props) => {
  const formRef = useRef<FormInstance>(null);
  const { id } = useParams() as any;
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();
  const state = useSelector((state: TypeAppState) => ({
    question: state.questionsPage.question,
    blocks: state.blocksPage.blocks,
  }));

  const [isChoosenFileChecked, setIsChoosenFileChecked] =
    useState<boolean>(false);
  const { mediaFile, uploadMediaFile } = useUploadFile(
    formRef,
    setIsChoosenFileChecked
  );
  
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
    };
    setLoading(true);
    if (id) {
      await axiosInstance.put(`/api/questions/${id}`, payload);
      setLoading(false);
      setIsChoosenFileChecked(false);
      history.push(paths[AdmPage.QUESTIONS]);
      return;
    }
    await axiosInstance.post("/api/questions", payload);
    setLoading(false);
    history.push(paths[AdmPage.QUESTIONS]);
  };

  useEffect(() => {
    if (id) {
      dispatch(thunks.getQuestion(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (state.question.options) {
      setAnswerOptions(state.question.options);
    }
  }, [state.question]);

  useEffect(() => {
    dispatch(blockThunks.getBlocks());
    return () => {
      dispatch(thunks.clearQuestion());
    };
  }, []);

  const handleAddAnswerOption = () => {
    setAnswerOptions((prevState) => prevState.concat(''));
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
  }

  return (
    <div className={styles["detail"]}>
      <div className={styles["detail__header"]}>
        <h1>{getPageTitle(id)}</h1>
      </div>
      {(!!id && !!state.question.description) ||
      props.method === PageMetods.CREATE ? (
        <Form
          initialValues={initialValues}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="description"
            label="Вопрос"
            rules={[{ required: true, type: "string", max: 99 }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="image"
            label="Изображение"
          >
            <Input type="file" onChange={uploadMediaFile} />
          </Form.Item>

          {state.question?.image && (
            <div
              style={{
                backgroundImage: `url(${
                  mediaFile
                    ? getImageUrl(mediaFile)
                    : getImageUrl(state.question?.image)
                })`,
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
            <Select>
              {QuestionTypeOptions?.map((option, index) => (
                <Option key={"question-types" + index} value={option.value}>
                  {option.title}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <div className={styles["answer-controls"]}>
            <h2 className={styles["answer-controls__title"]}>
              Варианты ответов
            </h2>
            {answerOptions?.length > 0 &&
              answerOptions.map((answerOption, index) => (
                <div
                  key={"answer-option" + index}
                  className={styles["answer-control"]}
                >
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
              <div className={styles["answer-controls__info"]}>
                Список вариантов ответов пуст
              </div>
            )}
            <div className={styles["answer-controls__add-btn-container"]}>
              <Button type="link" onClick={handleAddAnswerOption}>
                Добавить
              </Button>
            </div>
          </div>

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
