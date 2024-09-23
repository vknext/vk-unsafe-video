import waitVK from 'src/lib/waitVK';
import onChangeVKPart from 'src/listeners/onChangeVKPart';

const modifyParts = () => {
	window.vk.pe.mobile_search_video_filter_safe_search = 1;
	window.vk.pe.search_video_adult_mvk = 1;
	delete window.vk.pe.search_communities_hide_safe_search_filter_mvk;
};

const initModifyParts = async () => {
	await waitVK();

	try {
		modifyParts();
	} catch (e) {
		console.error('[VUV/modifyParts]', e);
	}

	onChangeVKPart(modifyParts);
};

initModifyParts().catch((e) => console.error('[VUV/initModifyParts]', e));
