import Taro from '@tarojs/taro';
import { BASE_URL } from '@/config';
import { LOGIN_TOKEN } from '@/constants';

interface LoginParams {
  code: string;
}

interface LoginResponse {
  token: string;
}

// 开发者服务器登录接口
export async function login(data: LoginParams) {
  return Taro.request<HttpStandardResponse<LoginResponse>, LoginParams>({
    url: `${BASE_URL}/mp/mini/login`,
    data,
  });
}

// 确认登录
export async function loginConfirm(data: { sc: string }) {
  return Taro.request<HttpStandardResponse<null>, { sc: string }>({
    url: `${BASE_URL}/mp/mini/scan/confirm`,
    data,
  });
}

// 登录
async function loginTruth() {
  const { code } = await Taro.login();
  const {
    data: { data, msg },
  } = await login({ code });
  if (!data) {
    Taro.showToast({
      title: msg,
      icon: 'none',
      duration: 2000,
    });
    return Promise.reject(null);
  }
  //
  const token = data;
  Taro.setStorageSync(LOGIN_TOKEN, token);

  Taro.showToast({
    title: `登录成功`,
    icon: 'success',
    duration: 2000,
  });
  return token;
}

// 小程序登录
export async function TaroLogin(forceLogin = false) {
  if (forceLogin) return loginTruth();
  try {
    await Taro.checkSession();
    const token = Taro.getStorageSync(LOGIN_TOKEN);
    return token ? token : await Promise.reject(null);
  } catch (err) {
    return loginTruth();
  }
}
