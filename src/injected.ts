import initUnsafeCheckbox from './modules/unsafeCheckbox';
import './public-path';
import './injected.scss';

(window.vknext = window.vknext || {}).vuv_installed = true;

const start = async () => {
	try {
		initUnsafeCheckbox();
	} catch (e) {
		console.error('[VUV/initUnsafeCheckbox]', e);
	}

	// try {
	// 	if (!('webpack' in window.vknext)) {
	// 		initVKNextBanner();
	// 	}
	// } catch (e) {
	// 	console.error('[VMS/initVKNextBanner]', e);
	// }
};

start().catch(console.error);
