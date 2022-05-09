import errorService from '@razorpay/universe-utils/errorService';
import { getCurrentBrowser, isMobile, titleCase } from './helper';

export const sendToLumberjack = ({ eventName, properties = {} }) => {
	const body = {
		mode: 'live',
		key: window.LUMBERJACK_API_KEY,
		events: [
			{
				event_type: 'website',
				event: eventName,
				event_version: 'v1',
				timestamp: new Date().getTime(),
				properties: {
					...properties,
				},
			},
		],
	};

	fetch(window.LUMBERJACK_API_URL, {
		method: 'post',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
		},
	}).catch((error) => {
		throwAnalyticsException(error);
	});
};

const throwAnalyticsException = (errorMessage) => {
	const error = new Error(errorMessage);
	errorService.captureError(error);
};

export const analyticsTrack = ({
	objectName,
	actionName,
	screen,
	properties = {},
	toLumberjack = true,
}) => {
	if (!objectName) {
		const errorMessage = '[analytics]: objectName cannot be empty';
		throwAnalyticsException(errorMessage);
	}

	if (!actionName) {
		const errorMessage = '[analytics]: actionName cannot be empty';
		throwAnalyticsException(errorMessage);
	}

	if (!screen) {
		const errorMessage = '[analytics]: screen cannot be empty';
		throwAnalyticsException(errorMessage);
	}

	if (/_/g.test(objectName)) {
		const errorMessage = `[analytics]: expected objectName: ${objectName} to not have '_'`;
		throwAnalyticsException(errorMessage);
		return;
	}

	if (/_/g.test(actionName)) {
		const errorMessage = `[analytics]: expected actionName: ${actionName} to not have '_'`;
		throwAnalyticsException(errorMessage);
		return;
	}

	const eventTimestamp = new Date().toISOString();
	const eventName = titleCase(`${objectName} ${actionName}`);
	const browser = getCurrentBrowser();

	if (toLumberjack) {
		sendToLumberjack({
			eventName,
			properties: {
				...properties,
				screen,
				eventTimestamp,
				browser,
				mobile: isMobile(),
			},
		});
	}
};
