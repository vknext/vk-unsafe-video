/**
 * требуется для подключения динамических скриптов
 */
const getPublicPath = () => {
	try {
		const item = window.sessionStorage.getItem('vuv_public_path');
		if (item) {
			return item;
		}

		if (document.currentScript instanceof HTMLScriptElement) {
			return new URL(document.currentScript.src).origin;
		}

		if (document.documentElement.dataset['vuv_public_path']) {
			return document.documentElement.dataset['vuv_public_path'];
		}
	} catch (e) {
		console.error('[vuv/public-path]', e);
	}

	return '';
};

// @ts-ignore
__webpack_public_path__ = getPublicPath();
