import { RequestDate, ResponseDate } from '../common/types';

console.log('background起動');

/**
 * メッセージを受け取った場合に実行
 */
chrome.runtime.onMessage.addListener(
    (request: RequestDate, sender, sendResponse: (response: ResponseDate) => void) => {
        const id = request.id;

        let responce: ResponseDate;

        switch (id) {
            case 'REQUEST_ID_ACTION1':
                responce = { code: 200, data: 'hello ACTION1' };

                break;
            case 'REQUEST_ID_ACTION2':
                responce = { code: 200, data: 'hello ACTION2' };

                break;
            case 'REQUEST_ID_ACTION3':
                responce = { code: 200, data: 'hello ACTION3' };

                break;
            case 'REQUEST_ID_ACTION4':
                responce = { code: 200, data: 'hello ACTION4' };

                break;
        }

        sendResponse(responce);
    }
);
