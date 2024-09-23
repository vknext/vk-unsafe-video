import waitVK from 'src/lib/waitVK';
import onChangeVKPart from 'src/listeners/onChangeVKPart';

const modifyParts = () => {
	window.vk.pe.search_video_adult_web = 1;
};

const setUnsafeVideoToggle = async () => {
	await waitVK();

	try {
		modifyParts();
	} catch (e) {
		console.error('[VUV/modifyParts]', e);
	}

	onChangeVKPart(modifyParts);
};

export default setUnsafeVideoToggle;
