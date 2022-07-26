import { requestBackground, requestContent } from '../common/request';

window.onload = () => {
    console.log('これはactionページです。');
    document.getElementById('send_to_bk_btn')?.addEventListener('click', async () => {
        const responce = await requestBackground('REQUEST_ID_ACTION1', 'Hello background');

        try {
            alert('バックグラウンドからのメッセージ\n' + responce.message);
        } catch {
            alert('バックグラウンドからメッセージを受信できませんでした');
        }
    });

    document.getElementById('send_to_cnt_btn')?.addEventListener('click', async () => {
        const responce = await requestContent('REQUEST_ID_ACTION1', 'Hello content');

        try {
            alert('コンテンツからのメッセージ\n' + responce.message);
        } catch {
            alert('コンテンツからメッセージを受信できませんでした');
        }
    });
};
