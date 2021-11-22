import classNames from "classnames";
import { TCompilation, TLook } from "components/pages/StylistPage/CompilationsPage/types";
import { TypeDispatch } from "redux/ReduxStore";
import { compilationsThunks } from "redux/slicers/compilationsPageSlice";
import { DESKTOP_SLIDER_IMAGE_HEIGHT, MOBILE_SLIDER_IMAGE_HEIGHT, SliderDirectionEnum } from "./constants";

export const getLookIndexClassNames = (
  isSelected: boolean | undefined,
  styles: any
) => {
  return classNames({
    [styles["collection__index"]]: true,
    [styles["collection__index--selected"]]: isSelected === true,
    [styles["collection__index--not-selected"]]: isSelected === false,
  });
};

export const getCollectionItemClassNames = (
  isActive: boolean,
  styles: any
) => {
  return classNames({
    [styles["collection__item"]]: true,
    [styles["collection__item--active"]]: isActive,
  });
};

export const handleImageNavigation = (index: number, sliderBodyRef: React.MutableRefObject<any>, sliderImageHeight: number): void => {
  (sliderBodyRef.current as any).scrollTo({
    top: sliderImageHeight * index,
    behavior: "smooth",
  });
};

export const computeSliderScale = (
  index: number,
  currentScrollY: number,
  activeIndex: number,
  sliderImageHeight: number
): string => {
  let offset = sliderImageHeight;

  if (index === activeIndex) {
    offset = currentScrollY - sliderImageHeight * activeIndex;
  }
  if (index === activeIndex + 1) {
    offset = sliderImageHeight * (activeIndex + 1) - currentScrollY;
  }
  const scale = 1 - (offset / sliderImageHeight) * 0.2;

  return `scale(${scale})`;
};

export const handleCloseClick = (dispatch: TypeDispatch): void => {
  dispatch(compilationsThunks.clearActiveCompilation());
};

export const changeSliderOpacity = (sliderStyleFeatures: number, setSliderStyleFeatures): void => {
  if (!sliderStyleFeatures) {
    setSliderStyleFeatures(1);
  }
};

export const getSliderImageHeight = (): number => {
  return window.innerWidth > 769
    ? DESKTOP_SLIDER_IMAGE_HEIGHT
    : MOBILE_SLIDER_IMAGE_HEIGHT;
}

export const handleSliderControlClick = (
  direction: SliderDirectionEnum,
  compilation: TCompilation,
  activeLookIndex: number,
  sliderBodyRef: React.MutableRefObject<any>,
  sliderImageHeight: number,
  dispatch: TypeDispatch
): void => {
  const newLookIndex =
    direction === SliderDirectionEnum.LEFT
      ? activeLookIndex - 1
      : activeLookIndex + 1;
  dispatch(
    compilationsThunks.setActiveCompilationAndLookIndex(
      compilation,
      newLookIndex
    )
  );
  handleImageNavigation(0, sliderBodyRef, sliderImageHeight);
};

export const checkIfAllLooksSelected = (looks: any) => {
  return looks.reduce((accum, currentValue) => {
    return accum && currentValue.selected !== null && currentValue.selected !== undefined;
  }, true);
};
