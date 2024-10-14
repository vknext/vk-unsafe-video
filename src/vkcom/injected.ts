import initUnsafeCheckbox from '../modules/unsafeCheckbox';
import './injected.scss';
import setUnsafeVideoToggle from '../modules/unsafeVideoToggle';
import initVKNextSearchBanner from '../modules/VKNextSearchBanner';

(window.vknext = window.vknext || {}).vuv_installed = true;

const start = async () => {
	setUnsafeVideoToggle().catch((e) => console.error('[VUV/setUnsafeVideoToggle]', e));

	try {
		initUnsafeCheckbox();
	} catch (e) {
		console.error('[VUV/initUnsafeCheckbox]', e);
	}

	try {
		initVKNextSearchBanner();
	} catch (e) {
		console.error('[VUV/initVKNextSearchBanner]', e);
	}
};

start().catch(console.error);
