import Taro, { Chain } from '@tarojs/taro';
import { LOGIN_TOKEN } from '@/constants';

export default function headersInterceptor(chain: Chain) {
  const requestParams = chain.requestParams;
  const { header = {} } = requestParams;
  header['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';

  const token = Taro.getStorageSync(LOGIN_TOKEN);
  if (token) header[LOGIN_TOKEN] = token;

  return chain.proceed(Object.assign(requestParams, { header }));
}
