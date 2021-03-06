import { Button, Form, Input } from "antd";
import { TypeFormField } from "common/types/type";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import { TypeRootState } from "redux/ReduxStore";
import { stylistsThunks } from "redux/slicers/stylistsPageSlice";
import { AdmPage, paths } from "../routes/constants";
import { PageMethods } from "../types";
import { BUTTON, formFields, FULL_NAME, LOGIN } from "./constants";
import styles from "./StylistDetail.module.scss";
import { TypeEditStylistDto } from "./types";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

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

const StylistDetail: React.FC<Props> = (props) => {
  const history = useHistory();
  const { id } = useParams() as any;
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const stylistsState = useSelector((state: TypeRootState) => ({
    stylist: state.stylistsPage.stylist,
  }));

  const onFinish = async (payload: TypeEditStylistDto) => {
    setLoading(true);
    if (id) {
      await dispatch(stylistsThunks.updateStylist(id, payload));
    } else {
      await dispatch(stylistsThunks.createStylist(payload));
    }
    setLoading(false);
    history.push(paths[AdmPage.STYLISTS]);
  };

  useEffect(() => {
    if (id) {
      dispatch(stylistsThunks.getStylist(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(stylistsThunks.clearStylist());
    };
  }, [dispatch]);

  function getPageTitle() {
    return id ? `Редактирование стилиста №${id}` : "Добавить стилиста";
  }

  function getFormField(type: string, field: TypeFormField) {
    switch (type) {
      case FULL_NAME:
      case LOGIN:
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

  const formMethod = (!!id && !!stylistsState.stylist.name) || props.method === PageMethods.CREATE;

  return (
    <div className={styles["detail"]}>
      <div className={styles["detail__header"]}>
        <h1>{getPageTitle()}</h1>
      </div>
      {formMethod && (
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          initialValues={stylistsState.stylist}
        >
          {formFields.map((field) => (
            <div key={field.id} className={styles["detail__field"]}>
              {getFormField(field.type, field)}
            </div>
          ))}
        </Form>
      )}
    </div>
  );
};

export default memo(StylistDetail);
