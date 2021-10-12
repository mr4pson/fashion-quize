import { Skeleton } from "antd";
import { memo } from "react";
import styles from "./CompilationCardSkeleton.module.scss";
import { COMPILATION_LOOKS_NUMBER, COMPILATION_SKELETON_NUMBER } from "./constants";

const CompilationCardSkeleton: React.FC = () => {
  return (
    <div className={styles["compilation-card-skeleton"]}>
      <div className={styles["compilation-card-skeleton__header"]}>
        <div className={styles["compilation-card-skeleton__info"]}>
          <Skeleton.Input
            active
            size={"small"}
            className={styles["skeleton"]}
          />
        </div>
        <Skeleton.Button
          active
          size={"small"}
          shape={"round"}
          className={styles["compilation-card-skeleton__status"]}
        />
      </div>
      <div className={styles["compilation-card-skeleton__body"]}>
        <div className={styles["compilation-card-skeleton__looks"]}>
          {[...Array(COMPILATION_SKELETON_NUMBER)].map(
            (num, lookIndex) => (
              <div
                key={`look-${lookIndex}`}
                className={styles["compilation-card-skeleton__look"]}
              >
                {[...Array(COMPILATION_LOOKS_NUMBER)].map(
                  (num, lookItemIndex) => (
                    <Skeleton.Input
                      key={`look-${lookItemIndex}`}
                      active
                      size={"small"}
                      className={styles["skeleton-look-item"]}
                    />
                  )
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(CompilationCardSkeleton);
