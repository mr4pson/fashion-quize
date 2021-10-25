import classNames from "classnames";
import { getImageUrl } from "common/helpers/common-helpers";
import { TCompilation } from "components/pages/StylistPage/CompilationsPage/types";
import * as React from "react";
import { memo, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "redux/ReduxStore";
import { SliderDirectionEnum } from "./constants";
import {
  changeSliderOpacity,
  computeSliderScale,
  getCollectionItemClassNames,
  getLookIndexClassNames,
  getSliderImageHeight,
  handleCloseClick,
  handleImageNavigation,
  handleSliderControlClick,
} from "./helpers";
import { ReactComponent as ArrowLeftSvg } from "./icons/arrow-left.svg";
import { ReactComponent as ArrowRightSvg } from "./icons/arrow-right.svg";
import { ReactComponent as CloseSvg } from "./icons/close.svg";
import styles from "./ImageSlider.module.scss";

interface Props {
  compilation: TCompilation;
  activeLookIndex: number;
}

export const ImageSlider: React.FC<Props> = ({
  compilation,
  activeLookIndex,
}) => {
  const dispatch = useAppDispatch();

  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [currentScrollY, setCurrentScrollY] = useState(window.scrollY);
  const [sliderStyleFeatures, setSliderStyleFeatures] = useState(0);
  const [sliderImageHeight, setSliderImageHeight] = useState(
    getSliderImageHeight()
  );

  const sliderBodyRef = useRef(null);

  const look = compilation.looks[activeLookIndex];
  const sliderItems = look.items;

  const handleScroll = (e): void => {
    const element = e.target;
    if (
      currentScrollY > element.scrollTop &&
      e.target.scrollTop < activeItemIndex * sliderImageHeight
    ) {
      setActiveItemIndex((prevState) => prevState - 1);
    }
    if (
      currentScrollY < element.scrollTop &&
      e.target.scrollTop > (activeItemIndex + 1) * sliderImageHeight - 1
    ) {
      setActiveItemIndex((prevState) => prevState + 1);
    }
    setCurrentScrollY(element.scrollTop);
  };

  const handleWindowResize = (): void => {
    setSliderImageHeight(getSliderImageHeight());
  };

  const escFunction = (event): void => {
    if(event.keyCode === 27) {
      handleCloseClick(dispatch);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    document.addEventListener("keydown", escFunction, false);
    setTimeout(() => {
      changeSliderOpacity(sliderStyleFeatures, setSliderStyleFeatures);
    });
    return () => {
      window.removeEventListener("resize", handleWindowResize);
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  return (
    <div
      className={styles["slider"]}
      style={{
        opacity: sliderStyleFeatures,
      }}
    >
      <button
        className={styles["slider__close"]}
        onClick={() => handleCloseClick(dispatch)}
      >
        <CloseSvg />
      </button>
      <div
        className={styles["slider__body"]}
        ref={sliderBodyRef}
        onScroll={handleScroll}
      >
        <div
          className={styles["slider__content"]}
          style={{ transform: `scale(${sliderStyleFeatures})` }}
        >
          {sliderItems.map((slierItem, index) => (
            <div
              key={`slider-item-${index}`}
              className={styles["slider-item"]}
              style={{
                transform: computeSliderScale(
                  index,
                  currentScrollY,
                  activeItemIndex,
                  sliderImageHeight
                ),
              }}
            >
              <div className={styles["slider-item__header"]}>
                <div className={styles["slider-item__title"]}>
                  {slierItem.name}
                </div>
                <div className={styles["slider-item__price"]}>15 000 ₽</div>
              </div>
              <div
                className={styles["slider-item__content"]}
                style={{
                  backgroundImage: `url(${getImageUrl(slierItem.photo)}`,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles["slider__footer"]}>
        <div className={styles["slider__controls"]}>
          {activeLookIndex !== 0 && (
            <button
              className={classNames(
                styles["slider__control-btn"],
                styles["slider__control-btn--left"]
              )}
              onClick={() =>
                handleSliderControlClick(
                  SliderDirectionEnum.LEFT,
                  compilation,
                  activeLookIndex,
                  sliderBodyRef,
                  sliderImageHeight,
                  dispatch
                )
              }
            >
              <ArrowLeftSvg />
            </button>
          )}
          {activeLookIndex !== 2 && (
            <button
              className={classNames(
                styles["slider__control-btn"],
                styles["slider__control-btn--right"]
              )}
              onClick={() =>
                handleSliderControlClick(
                  SliderDirectionEnum.RIGHT,
                  compilation,
                  activeLookIndex,
                  sliderBodyRef,
                  sliderImageHeight,
                  dispatch
                )
              }
            >
              <ArrowRightSvg />
            </button>
          )}
        </div>
        <div className={styles["collection"]}>
          <div className={getLookIndexClassNames(look.selected, styles)}>
            {activeLookIndex + 1}
          </div>
          {sliderItems.map((slierItem, index) => (
            <div
              key={`collection-item-${index}`}
              onClick={() =>
                handleImageNavigation(index, sliderBodyRef, sliderImageHeight)
              }
              style={{ backgroundImage: `url(${getImageUrl(slierItem.photo)}` }}
              className={getCollectionItemClassNames(
                index === activeItemIndex,
                styles
              )}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(ImageSlider);
