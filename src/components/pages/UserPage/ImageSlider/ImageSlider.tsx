import { Radio } from "antd";
import classNames from "classnames";
import { getImageUrl, numberWithSpaces } from "common/helpers/common-helpers";
import { useOnClickOutside } from "common/hooks/useOnClickOutside";
import { TLook } from "components/pages/AdminPage/CompilationsPage/types";
import { TCompilation } from "components/pages/StylistPage/CompilationsPage/types";
import * as React from "react";
import { memo, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "redux/ReduxStore";
import { compilationsThunks } from "redux/slicers/compilationsPageSlice";
import { MAX_LOOK_INDEX, SliderDirectionEnum } from "./constants";
import {
  changeSliderOpacity,
  checkIfAllLooksSelected,
  computeSliderScale,
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

  const [look, setLook] = useState<TLook>(compilation.looks[activeLookIndex]);

  // console.log(compilation);

  const sliderBodyRef = useRef(null);

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
    if (event.keyCode === 27) {
      handleCloseClick(dispatch);
    }
  };

  const handleLookSelectionChange = async (e) => {
    setLook({
      ...compilation.looks[activeLookIndex],
      selected: e.target.value,
    });

    const looks = [...compilation.looks];
    looks[activeLookIndex] = {
      ...looks[activeLookIndex],
      selected: e.target.value,
    };


    const payload = {
      taskId: compilation.task.id,
      looks: JSON.stringify(looks),
    };

    const currentCompilation = { ...compilation, looks: looks };

    await dispatch(compilationsThunks.rateCompilation(payload));
    dispatch(compilationsThunks.getUserCompilations());

    if (activeLookIndex !== MAX_LOOK_INDEX) {
      handleSliderControlClick(
        SliderDirectionEnum.RIGHT,
        currentCompilation,
        activeLookIndex,
        sliderBodyRef,
        sliderImageHeight,
        dispatch
      );
      return;
    }
    if (activeLookIndex === MAX_LOOK_INDEX) {
      handleCloseClick(dispatch);
    }
  };

  useEffect(() => {
    console.log(compilation.looks);
    setLook(compilation.looks[activeLookIndex]);
  }, [activeLookIndex, compilation]);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    document.addEventListener("keydown", escFunction, false);
    setTimeout(() => {
      changeSliderOpacity(sliderStyleFeatures, setSliderStyleFeatures);
      handleImageNavigation(0, sliderBodyRef, sliderImageHeight);
    });
    return () => {
      window.removeEventListener("resize", handleWindowResize);
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  // useOnClickOutside("slider-item", () => handleCloseClick(dispatch));

  return (
    <div
      className={styles["slider"]}
      style={{
        opacity: sliderStyleFeatures,
      }}
    >
      <button
        id="slider-item"
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
          {sliderItems.map((sliderItem, index) => (
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
              <div id="slider-item" className={styles["slider-item__header"]}>
                <div className={styles["slider-item__title"]}>
                  {sliderItem.name}
                </div>
                <div className={styles["slider-item__price"]}>
                  {numberWithSpaces(sliderItem.price)} ₽
                </div>
              </div>
              <div
                id="slider-item"
                className={styles["slider-item__content"]}
                style={{
                  backgroundImage: `url(${getImageUrl(sliderItem.photo)}`,
                }}
              ></div>
            </div>
          ))}
        </div>
        {!checkIfAllLooksSelected(compilation.looks) && (
          <div className={styles["selection"]}>
            <h2 className={styles["selection__title"]}>
              Вам понравился образ?
            </h2>
            <Radio.Group
              value={look.selected}
              className={styles["selection__actions"]}
              size="large"
              onChange={handleLookSelectionChange}
            >
              <Radio.Button
                className={styles["selection__action-item"]}
                value={true}
              >
                Да
              </Radio.Button>
              <Radio.Button
                className={styles["selection__action-item"]}
                value={false}
              >
                Нет
              </Radio.Button>
            </Radio.Group>
          </div>
        )}
      </div>
      <div id="slider-item" className={styles["slider__footer"]}>
        <div id="slider-item" className={styles["slider__controls"]}>
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
              <ArrowLeftSvg id="slider-item" />
            </button>
          )}
          {activeLookIndex !== MAX_LOOK_INDEX && (
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
              <ArrowRightSvg id="slider-item" />
            </button>
          )}
        </div>
        <div id="slider-item" className={styles["collection"]}>
          <div className={getLookIndexClassNames(look.selected, styles)}>
            {activeLookIndex + 1}
          </div>
          {sliderItems.map((slierItem, index) => (
            <div
              key={`collection-item-${index}`}
              className={styles["collection__item-wrapper"]}
            >
              {index === activeItemIndex && (
                <div className={styles["collection__item--active"]}></div>
              )}
              <div
                id="slider-item"
                key={`collection-item-${index}`}
                className={styles["collection__item"]}
                style={{
                  backgroundImage: `url(${getImageUrl(slierItem.photo)}`,
                }}
                onClick={() =>
                  handleImageNavigation(index, sliderBodyRef, sliderImageHeight)
                }
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(ImageSlider);
