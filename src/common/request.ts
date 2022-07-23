import { RequestDate, ResponseDate, REQUEST_ID } from './types';

export const requestBackground = (id: REQUEST_ID, data: string): Promise<ResponseDate> => {
  console.log('Backgroundへリクエストを送信');
  const requestData: RequestDate = {
    id: id,
    data: data,
  };

  return new Promise<ResponseDate>((resolve) => {
    chrome.runtime.sendMessage(chrome.runtime.id, requestData, (response: ResponseDate) => {
      resolve(response);
    });
  });
};
