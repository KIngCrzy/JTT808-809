import request from '@/utils/request';

export async function Login(params) {
    return request('/api/login', {
        method: 'POST',
        data: params
    });
}

export async function Business(params) {
    return request('/api/business', {
        method: 'POST',
        data: params
    });
}

export async function Generate(params) {
    return request('/api/generate', {
        method: 'POST',
        data: params
    });
}

export async function Send(params) {
    return request('/api/send', {
        method: 'POST',
        data: params
    });
}

export async function Close() {
    return request('/api/close', {
    });
}