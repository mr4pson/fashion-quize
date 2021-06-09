import { extractHS256Token } from "jwt-hs256";

export function getUserInfo(): any | null {
  const jwtPair: string | null =
    localStorage.getItem('jwtPair') ? localStorage.getItem('jwtPair') : '';
  const currentJwt: string = jwtPair ? JSON.parse(jwtPair) : '';
  if (!currentJwt) {
    return null;
  }
  const jwtInfo = extractHS256Token(currentJwt, '123');
  const roles = JSON.parse(jwtInfo.roles);
  const userInfo = {
    id: jwtInfo.id,
    name: jwtInfo.name,
    role: roles[0],
  }

  return userInfo;
}