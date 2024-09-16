import DOMContentLoaded from "src/lib/DOMContentLoaded";
import waitNav from "src/lib/waitNav";

type CallbackFunc = (el: HTMLElement) => void;

const state = {
	initialized: false,
};

const handleVkVideoFilterPane = (callback: CallbackFunc) => {
	const filterPane = document.querySelector<HTMLElement>('.video_search_filters_wrap');

	if (!filterPane) {
		return;
	}

	callback(filterPane);
};

const onVkVideoPageLoaded = (callback: CallbackFunc) => {
	if (state.initialized) {
		return;
	}

	state.initialized = true;

	DOMContentLoaded(() => handleVkVideoFilterPane(callback));

    waitNav().then(() => {
		window.nav.onLocationChange((locStr) => {
			if (locStr.startsWith('video')) {
				handleVkVideoFilterPane(callback);
			}
		});
	});
};

export default onVkVideoPageLoaded;
