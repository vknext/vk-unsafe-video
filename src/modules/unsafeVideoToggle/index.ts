import waitNav from 'src/lib/waitNav';
import waitVK from 'src/lib/waitVK';

const setUnsafeVideoToggle = async () => {
	await waitVK();
	window.vk.pe.search_video_adult_web = true;

	await waitNav();
	window.nav.onLocationChange(() => {
		window.vk.pe.search_video_adult_web = true;
	});
};

export default setUnsafeVideoToggle;
