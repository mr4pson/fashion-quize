import { getImageUrl } from "common/helpers/common-helpers";
import { TLook } from "components/pages/AdminPage/CompilationsPage/types";
import { memo } from "react";
import { getLookIndexClassNames } from "./constants";
import styles from "./Look.module.scss";

type Props = {
  look: TLook;
  index: number;
};

const Look: React.FC<Props> = ({ look, index }) => {
  return (
    <div className={styles["look"]} key={`look-${look.id}`}>
      <div className={getLookIndexClassNames(look.selected, styles)}>
        {index}
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
