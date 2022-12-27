import { createApp } from 'vue';
import { Button, Toast } from '@nutui/nutui-taro';
import { pinia } from '@/stores';
import '@/services/http';

import App from './App.vue';

const app = createApp(App);

app.use(pinia);
app.use(Button).use(Toast);

export default app;
