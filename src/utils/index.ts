import Taro from '@tarojs/taro';
import { BASE_URL } from '@/config';
import { LOGIN_TOKEN } from '@/constants';

export function ensureAvatarUrl(url: string) {
  if (/^https?:\/\//.test(url)) {
    return url;
  }
  return `${BASE_URL}/${url}`;
}

//
export async function retryGetToken() {
  return new Promise<string | null>((resolve) => {
    let token = Taro.getStorageSync(LOGIN_TOKEN);
    let retry = 10;
    let timer = setInterval(() => {
      if (token || retry <= 0) {
        resolve(token);
        clearInterval(timer);
        return;
      }
      --retry;
      token = Taro.getStorageSync(LOGIN_TOKEN);
    }, 500);
  });
}
