import { RequestData, ResponseData, REQUEST_ID } from './types';

/**
 * リクエストをバックグラウンドに送信する
 * @param id
 * @param data
 * @return ResponseDate
 */
export const requestBackground = (id: REQUEST_ID, data: string): Promise<ResponseData<string>> => {
    console.log('Backgroundへリクエストを送信');
    const requestData: RequestData<string> = {
        id: id,
        data: data,
    };

    return new Promise<ResponseData<string>>((resolve) => {
        chrome.runtime.sendMessage(chrome.runtime.id, requestData, (response: ResponseData<string>) => {
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
export const requestContent = (id: REQUEST_ID, data: string): Promise<ResponseData<string>> => {
    console.log('contentへリクエスト送信');
    const requestData: RequestData<string> = {
        id: id,
        data: data,
    };

    return new Promise<ResponseData<string>>((resolve) => {
        chrome.tabs.query({ active: true }, (tabs) => {
            const id = tabs[0].id ? tabs[0].id : undefined;
            console.log('id', id);

            if (id == undefined) {
                resolve({ code: 404, message: '送信先が見つかりませんでした', data: '' });
            } else {
                chrome.tabs.sendMessage(id, requestData, (response: ResponseData<string>) => {
                    console.log('response', response);
                    resolve(response);
                });
            }
        });
    });
};
