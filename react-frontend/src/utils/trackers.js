import analyticsService from '@razorpay/universe-utils/analytics';
import { env } from '../config/env';
import { getUserId } from './helper';

const app_env = window.APP_ENV ? window.APP_ENV : 'stage';

export const initLumberjack = () => {
  analyticsService.init({
    lumberjackAppName: 'external_status_page',
    lumberjackApiKey: env[app_env].LUMBERJACK_API_KEY,
    lumberjackApiUrl: env[app_env].LUMBERJACK_API_URL, 
  });
};

export const analyticsTrack = (trackObj) => {
  analyticsService.track({
    ...trackObj,
    properties: {
      ...trackObj.properties,
      userId: getUserId(),
    },
  });
};
