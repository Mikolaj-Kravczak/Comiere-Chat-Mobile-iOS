import { getBundleId, isIOS } from '../methods/helpers/deviceInfo';

const APP_STORE_ID = '1148741252';

export const PLAY_MARKET_LINK = `https://cic.comiere.com/`;
export const FDROID_MARKET_LINK = 'https://cic.comiere.com/';
export const APP_STORE_LINK = `https://cic.comiere.com/`;
export const LICENSE_LINK = 'https://cic.comiere.com/';
export const STORE_REVIEW_LINK = isIOS
	? `https://cic.comiere.com/`
	: `https://cic.comiere.com/`;
