import {COVER_BASE_URL} from '../constants/env';

export const logOnDev = (message?: any, ...optionalParams: any[]) => {
  if (__DEV__) {
    console.log(message, ...optionalParams);
  }
};

export const coverRenderUrl = (cover_id: string | number) =>
  COVER_BASE_URL + `/id/${cover_id}-M.jpg`;

export const coverRenderUrlHD = (cover_id: string | number) =>
  COVER_BASE_URL + `/id/${cover_id}-L.jpg`;
