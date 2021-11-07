import classNames from "classnames";
import { numberWithSpaces } from "common/helpers/common-helpers";
import { TLook } from "components/pages/StylistPage/CompilationsPage/types";

export const getLookParamClassNames = (
  paramName: string,
  isSelected: boolean | undefined,
  styles: { readonly [key: string]: string }
) => {
  return classNames({
    [styles[`look__${paramName}`]]: true,
    [styles[`look__${paramName}--selected`]]: isSelected === true,
    [styles[`look__${paramName}--not-selected`]]: isSelected === false,
  });
};

export const estimateCompilationLooksPrice = (looks: TLook[]): string => {
  let fullPrice = 0;

  looks.forEach((look) => {
    look.items.forEach((item) => {
      fullPrice += item.price;
    });
  });

  return numberWithSpaces(fullPrice);
};
