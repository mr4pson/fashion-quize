import { FC, memo } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as ChevronLeft } from "../../../../assets/icons/ic-chevron-left.svg";
import s from "./QuizeHeader.module.scss";
import { TQuizeHeaderConfig } from "./types";

type Props = TQuizeHeaderConfig;

const QuizeHeader: FC<Props> = ({
  title,
  description,
  backUrl,
  currentSectionNumber,
  sectionLength,
}) => {
  const steps: number[] = [];
  for (let i = 1; i <= sectionLength!; i++) steps.push(i);

  const stepClassName = (step) => {
    if (currentSectionNumber) {
      if (step < currentSectionNumber) {
        return s["steps__item_prev"];
      } else {
        return step === currentSectionNumber
          ? s["steps__item_active"]
          : s["steps__item"];
      }
    }
  };

  return (
    <div className={s["quize-header"]}>
      <div className={s["quize-header__top"]}>
        {backUrl && (
          <Link to={backUrl}>
            <ChevronLeft />
          </Link>
        )}
      </div>
      <div className={s["quize-header__body"]}>
        <h4 className={s["quize-header__body__title"]}>
          {currentSectionNumber && <span>{`${currentSectionNumber}.`}</span>}
          <span>{` ${title}`}</span>
        </h4>
        <div className={s["quize-header__body__desc"]}>{description}</div>
        <div className={s["quize-header__body__steps"]}>
          <div className={s["steps"]}>
            {steps.map((val) => (
              <div className={stepClassName(val)} key={val}>
                {val}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(QuizeHeader);
