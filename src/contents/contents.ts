import { RequestData, ResponseData } from '../common/types';

console.log('test');

chrome.runtime.onMessage.addListener(
    (request: RequestData<string>, sender, sendResponse: (response: ResponseData<string>) => void) => {
        const id = request.id;

        let responce: ResponseData<string>;
        const title = document.title;

        switch (id) {
            case 'REQUEST_ID_ACTION1':
                responce = { code: 200, message: 'コンテンツです ACTION1\n タイトル:' + title, data: '' };

                break;
            case 'REQUEST_ID_ACTION2':
                responce = { code: 200, message: 'コンテンツです ACTION2', data: '' };

                break;
            case 'REQUEST_ID_ACTION3':
                responce = { code: 200, message: 'コンテンツです ACTION3', data: '' };

                break;
            case 'REQUEST_ID_ACTION4':
                responce = { code: 200, message: 'コンテンツです ACTION4', data: '' };

                break;
        }

        sendResponse(responce);
    }
);
