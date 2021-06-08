import { TypeBlocksRes } from "components/pages/AdminPage/BlocksPage/type";

export function toBlocksData(array: TypeBlocksRes[]) {
  return array.map((object) => ({
    key: object.id,
    ...object,
  }));
}
