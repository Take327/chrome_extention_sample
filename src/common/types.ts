export type REQUEST_ID = 'REQUEST_ID_ACTION1' | 'REQUEST_ID_ACTION2' | 'REQUEST_ID_ACTION3' | 'REQUEST_ID_ACTION4';

export type RESPONSE_CODE = 200 | 404;

export type RequestData<T> = {
    id: REQUEST_ID;
    data: T;
};

export type ResponseData<T> = {
    code: RESPONSE_CODE;
    message: string;
    data: T;
};
