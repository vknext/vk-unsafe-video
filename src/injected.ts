import initUnsafeCheckbox from './modules/unsafeCheckbox';
import './injected.scss';

(window.vknext = window.vknext || {}).vuv_installed = true;

const start = async () => {
	try {
		initUnsafeCheckbox();
	} catch (e) {
		console.error('[VUV/initUnsafeCheckbox]', e);
	}
};

start().catch(console.error);
