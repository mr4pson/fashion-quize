import { Button, Form, Input } from "antd";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { blocksThunks } from "redux/reducers/blocksPageSlice";
import { TypeRootState } from "redux/ReduxStore";
import { axiosInstance } from "../constants";
import { AdmPage, paths } from "../routes/constants";
import { PageMetods } from "../types";
import styles from "./BlockDetail.module.scss";
import { BUTTON, COLOR, formFields, TITLE } from "./constants";
import { ChangeBlockDto, TypeFormField } from "./type";

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

const BlockDetail: React.FC<Props> = (props) => {
  const { id } = useParams() as any;
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();
  const blocksState = useSelector((state: TypeRootState) => ({
    block: state.blocksPage.block,
  }));

  const onFinish = async (payload: ChangeBlockDto) => {
    setLoading(true);
    if (id) {
      await axiosInstance.put(`/api/blocks/${id}`, payload);
      setLoading(false);
      history.push(paths[AdmPage.BLOCKS]);
      return;
    }
    await axiosInstance.post("/api/blocks", payload);
    setLoading(false);
    history.push(paths[AdmPage.BLOCKS]);
  };

  function getPageTitle() {
    return id ? `Изменение блока №${id}` : "Создание блока";
  }

  function getFormField(type: string, field: TypeFormField) {
    switch (type) {
      case TITLE:
      case COLOR:
        return (
          <Form.Item name={[field.name]} label={field.label} rules={[{ required: true, type: "string", max: 99 }]}>
            <Input />
          </Form.Item>
        );
      case BUTTON:
        return (
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button loading={loading} type="primary" htmlType="submit">
              {field.label}
            </Button>
          </Form.Item>
        );
      default:
        return <></>;
    }
  }

  useEffect(() => {
    if (id) {
      dispatch(blocksThunks.getBlock(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(blocksThunks.clearBlock());
    };
  }, [dispatch]);
  return (
    <div className={styles["detail"]}>
      <div className={styles["detail__header"]}>
        <h1>{getPageTitle()}</h1>
      </div>
      {(!!id && !!blocksState.block.title) || props.method === PageMetods.CREATE ? (
        <Form
          initialValues={blocksState.block}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          {formFields.map((field) => (
            <div key={field.id} className={styles["detail__field"]}>
              {getFormField(field.type, field)}
            </div>
          ))}
        </Form>
      ) : (
        ""
      )}
    </div>
  );
};

export default memo(BlockDetail);
