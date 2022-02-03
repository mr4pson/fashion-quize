import { getImageUrl } from "common/helpers/common-helpers";
import {
  TCompilation,
  TLook,
} from "components/pages/AdminPage/CompilationsPage/types";
import { memo } from "react";
import { useAppDispatch } from "redux/ReduxStore";
import { compilationsThunks } from "redux/slicers/compilationsPageSlice";
import {
  estimateCompilationLooksPrice,
  getLookParamClassNames,
} from "./helpers";
import styles from "./Look.module.scss";

type Props = {
  compilation: TCompilation;
  look: TLook;
  index: number;
};

const Look: React.FC<Props> = ({ look, index, compilation }) => {
  const dispatch = useAppDispatch();

  const handleLookClick = (): void => {
    dispatch(
      compilationsThunks.setActiveCompilationAndLookIndex(compilation, index)
    );
  };

  return (
    <div
      className={styles["look"]}
      key={`look-${look.id}`}
      onClick={handleLookClick}
    >
      <div className={getLookParamClassNames("index", look.selected, styles)}>
        Лук №{index + 1}
      </div>
      <div className={getLookParamClassNames("price", look.selected, styles)}>
        {estimateCompilationLooksPrice(compilation.looks)} ₽
      </div>
      {look.items.map((item) => (
        <div className={styles["look-item"]} key={`look-item-${item.id}`}>
          <div
            className={styles["look-item__photo"]}
            style={{ backgroundImage: `url(${getImageUrl(item.photo)})` }}
          ></div>
          {/* <div className={styles["look-item__name"]}>{item.name}</div> */}
        </div>
      ))}
    </div>
  );
};

export default memo(Look);
