import { RequestData, ResponseData } from '../common/types';

console.log('background起動');

/**
 * メッセージを受け取った際に実行する
 */
chrome.runtime.onMessage.addListener(
    (request: RequestData<string>, sender, sendResponse: (response: ResponseData<string>) => void) => {
        const id = request.id;

        let responce: ResponseData<string>;

        switch (id) {
            case 'REQUEST_ID_ACTION1':
                responce = { code: 200, message: 'hello ACTION1', data: '' };

                break;
            case 'REQUEST_ID_ACTION2':
                responce = { code: 200, message: 'hello ACTION2', data: '' };

                break;
            case 'REQUEST_ID_ACTION3':
                responce = { code: 200, message: 'hello ACTION3', data: '' };

                break;
            case 'REQUEST_ID_ACTION4':
                responce = { code: 200, message: 'hello ACTION4', data: '' };

                break;
        }

        sendResponse(responce);
    }
);
