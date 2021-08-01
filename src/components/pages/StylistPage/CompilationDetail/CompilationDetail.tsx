import { MinusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { getImageUrl } from "common/helpers/common-helpers";
import Loader from "components/modules/Loader";
import { useUploadFile } from "hooks/useUploadFile";
import { FC, memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";

import { TypeRootState, useAppDispatch } from "redux/ReduxStore";
import { compilationsThunks, setCompilation } from "redux/slicers/compilationsPageSlice";
import { tasksThunks } from "redux/slicers/tasksPageSlice";
import { TLook, TLookItem } from "../CompilationsPage/types";
import { paths, StlPage } from "../routes/consts";
import { PageMethods } from "../types";
import styles from "./CompilationDetail.module.scss";
import { formFields, layout } from "./consts";
import { getFormField, handleAddItem, handleDelItem, handleEditItemName } from "./helpers";
import { TStatus } from "./types";

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} не может быть пустым!",
  string: {
    max: "${label} не может быть длиннее ${max} символов!",
  },
};
/* eslint-enable no-template-curly-in-string */

type Props = {
  method: PageMethods;
};

const CompilationDetail: FC<Props> = (props) => {
  const history = useHistory();
  const { id, taskId } = useParams() as any;
  const inputFileRef = useRef<any>();
  const formRef = useRef<any>();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [currentLookIndex, setCurrentLookIndex] = useState<number>();

  const { uploadFiles } = useUploadFile(formRef);

  const dispatch = useAppDispatch();
  const { compilation, statuses, task } = useSelector((state: TypeRootState) => ({
    compilation: state.compilationsPage.compilation,
    statuses: state.tasksPage.statuses,
    task: state.tasksPage.task,
  }));

  
  const curTask = compilation.task ? compilation.task : task;
  const compilationIsNotEmpty = !!statuses && !!curTask;

  useEffect(() => {
    (async () => {
      await dispatch(tasksThunks.getTaskStatuses());
      if (id) {
        await dispatch(compilationsThunks.getCompilation(id));
      }
      if (taskId) {
        await dispatch(tasksThunks.getTask(taskId));
        const newCompilation = {
          ...compilation,
          looks: [
            {
              items: [],
            },
            {
              items: [],
            },
            {
              items: [],
            },
          ],
        };

        dispatch(compilationsThunks.setCompilation(newCompilation));
      }
    })();

    return () => dispatch(compilationsThunks.clearCompilation());
  }, [dispatch, id, taskId]);

  const handleFileLoad = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLooks = JSON.parse(JSON.stringify(compilation.looks));
    const look = newLooks[currentLookIndex!];
    console.log(look, currentLookIndex);
    const response = await uploadFiles(e.currentTarget.files as FileList);

    look?.items.push({
      name: 'Новая',
      photo: response.data[0].fileName,
    });
  
    const newCompilation = {
      ...compilation,
      looks: newLooks,
    };

    dispatch(compilationsThunks.setCompilation(newCompilation));
    form.resetFields();
  }

  const onFinish = async (status: TStatus) => {
    const payloadForUpdate: any = { status: status.status, looks: JSON.stringify(compilation.looks) };
  
    setLoading(true);
    if (id) {
      await dispatch(compilationsThunks.updateCompilation(id, payloadForUpdate));
    }
    if (taskId) {
      payloadForUpdate.taskId = taskId;
      await dispatch(compilationsThunks.createCompilation(payloadForUpdate));
    }
    setLoading(false);
    history.push(paths[StlPage.COMPILATIONS]);
  };

  let initialValues;
  if (curTask?.status && compilationIsNotEmpty) {
    initialValues = {
      status: curTask.status.id,
    };
  }

  return (
    <div className={styles["detail"]}>
      <div className={styles["detail__header"]}>
        <h1>{id ? `Редактирование подборки №${id}` : 'Создание подборки'}</h1>
      </div>
      {compilationIsNotEmpty && (
        <>
          <div className={styles["link-rows"]}>
            <div className={styles["link-row"]}>
              <span>Задача:</span>
              <Link to={`${paths[StlPage.TASKS]}/${curTask.id}`}>Задача №{curTask.id}</Link>
            </div>
            <div className={styles["link-row"]}>
              <span>Пользователь:</span>
              <Link to={"#"}>{curTask.user?.name}</Link>
            </div>
          </div>
          <div className={styles["looks"]}>
            <h1 className={styles["looks__header"]}>Луки</h1>
            <div className={styles["looks__body"]}>
              <Form form={form} ref={formRef}>
                <Form.Item name="uploadFile">
                  <Input type="file" multiple={true} onChange={handleFileLoad} ref={inputFileRef} style={{ display: 'none' }} />
                </Form.Item>
              </Form>

              {compilation.looks?.map((look, lookIndex) => (
                <div className={styles["look"]} key={'look'+lookIndex}>
                  {look.items.map((lookItem: TLookItem, lookItemIndex: number) => (
                    <div className={styles["look-item"]} key={'look-item' + lookItemIndex}>
                      <div
                        style={{ backgroundImage: `url(${getImageUrl(lookItem.photo)})` }}
                        className={styles["look-item__photo"]}
                        onClick={() => handleDelItem(compilation, lookIndex!, lookItemIndex, dispatch, setCompilation)}
                      >
                        <MinusOutlined className={styles["look-item__backdrop"]} />
                      </div>
                      <div className={styles["look-item__name"]}>
                        <Input
                          bordered={false}
                          value={lookItem.name}
                          onChange={(e) => handleEditItemName(e, compilation, lookIndex, lookItemIndex, dispatch, setCompilation)}
                        />
                      </div>
                    </div>
                  ))}
                  {look.items.length < 5 && (
                    <Button className={styles["look-add-btn"]} onClick={() => handleAddItem(lookIndex, inputFileRef, setCurrentLookIndex)}>
                      +
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={(status: TStatus) => onFinish(status)}
            validateMessages={validateMessages}
            initialValues={initialValues}
          >
            {formFields.map((field) => (
              <div className={styles["detail__field"]} key={field.id}>
                {getFormField(field.type, field, statuses, loading)}
              </div>
            ))}
          </Form>
        </>
      )}
      {!compilationIsNotEmpty && <Loader />}
    </div>
  );
};

export default memo(CompilationDetail);
