import { RequestDate, ResponseDate, REQUEST_ID } from './types';

/**
 * リクエストをバックグラウンドに送信する
 * @param id
 * @param data
 * @return ResponseDate
 */
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

/**
 * リクエストをコンテンツへ送信する
 * @param id
 * @param data
 * @returns
 */
export const requestContent = (id: REQUEST_ID, data: string): Promise<ResponseDate> => {
    console.log('contentへリクエスト送信');
    const requestData: RequestDate = {
        id: id,
        data: data,
    };

    return new Promise<ResponseDate>((resolve) => {
        chrome.tabs.query({}, (tabs) => {
            const id = tabs[0].id;

            if (!id) {
                resolve({ code: 404, data: '送信先が見つかりませんでした' });
            } else {
                chrome.tabs.sendMessage(id, requestData, (response: ResponseDate) => {
                    resolve(response);
                });
            }
        });
    });
};
