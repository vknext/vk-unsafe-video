import packageJson from './package.json';
const { version } = packageJson;

interface GetManifestOptions {
	isFirefox: boolean;
	isDev: boolean;
}

const browser_action = {
	default_title: '__MSG_popup_title__',
	default_popup: 'popup.html',
};

const getManifest = ({ isFirefox, isDev }: GetManifestOptions) => {
	const manifest: Record<string, any> = {
		manifest_version: 3,
		name: '__MSG_ext_name__',
		version,
		short_name: 'vknext-vuv',
		description: '__MSG_ext_description__',
		homepage_url: 'https://vknext.net',
		default_locale: 'ru',
		content_scripts: [
			{
				js: ['vkcom_content.vuv.js'],
				css: ['vkcom_injected.vuv.css'],
				matches: ['https://vk.com/*', 'https://vk.ru/*'],
				run_at: 'document_start',
			},
			{
				js: ['mvk_content.vuv.js'],
				matches: ['https://m.vk.com/*', 'https://m.vk.ru/*'],
				run_at: 'document_start',
			},
		],
		icons: {
			'16': 'assets/icon16.png',
			'24': 'assets/icon24.png',
			'32': 'assets/icon32.png',
			'48': 'assets/icon48.png',
			'128': 'assets/icon128.png',
			'300': 'assets/icon300.png',
		},
		web_accessible_resources: [
			{
				resources: ['*'],
				matches: ['https://vk.com/*', 'https://vk.ru/*', 'https://m.vk.com/*', 'https://m.vk.ru/*'],
			},
		],
		permissions: [],
		host_permissions: ['https://vk.com/*', 'https://vk.ru/*', 'https://m.vk.com/*', 'https://m.vk.ru/*'],
	};

	if (isDev) {
		manifest.web_accessible_resources[0].resources.push('*.map');
	}

	if (isFirefox) {
		manifest.manifest_version = 2;

		manifest.background = {
			scripts: ['background.vuv.js'],
		};

		manifest.browser_specific_settings = {
			gecko: {
				id: process.env.FIREFOX_ID,
				strict_min_version: '113.0',
			},
		};

		manifest.browser_action = browser_action;

		if (manifest.web_accessible_resources) {
			const resources = manifest.web_accessible_resources.map((e: any) => {
				if (typeof e === 'string') {
					return e;
				}

				return e.resources;
			});

			manifest.web_accessible_resources = resources.flat();
		}

		if (manifest.host_permissions) {
			manifest.permissions = Array.from(new Set([...(manifest.permissions || []), ...manifest.host_permissions]));
			delete manifest.host_permissions;
		}
	} else {
		manifest.minimum_chrome_version = '105';
		manifest.key = process.env.CHROME_KEY;
		manifest.incognito = 'split';
		manifest.action = browser_action;

		manifest.background = {
			service_worker: 'background.vuv.js',
		};
	}

	return manifest;
};

export default getManifest;
