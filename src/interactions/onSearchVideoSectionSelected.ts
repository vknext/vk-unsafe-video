import DOMContentLoaded from 'src/lib/DOMContentLoaded';
import waitNav from 'src/lib/waitNav';

type CallbackFunc = (el: HTMLElement) => void;
type State = {
	initialized: boolean;
	observer: MutationObserver | null;
};

const state: State = {
	initialized: false,
	observer: null,
};

const spaRootSelector = '#spa_root';
const filtersNodeSelector = '.SearchGlobalApp .vkuiPanel section form';

const findFilters = (callback: CallbackFunc) => {
	if (state.observer) {
		state.observer.disconnect();
		state.observer = null;
	}

	state.observer = new MutationObserver((mutations) => {
		for (const { target } of mutations) {
			const _target = target as HTMLElement;

			const element: HTMLElement | null = _target?.matches(filtersNodeSelector)
				? _target
				: _target?.querySelector(filtersNodeSelector);

			if (element) {
				clearTimeout(timeout);
				state.observer?.disconnect();
				callback(element);
				break;
			}
		}
	});

	const timeout = setTimeout(() => {
		state.observer?.disconnect();
		state.observer = null;
	}, 10_000);

	state.observer.observe(document.querySelector(spaRootSelector) as HTMLElement, {
		childList: true,
		subtree: true,
	});
};

const onSearchVideoSectionSelected = (callback: CallbackFunc) => {
	if (state.initialized) {
		return;
	}

	state.initialized = true;

	DOMContentLoaded(() => findFilters(callback));

	waitNav().then(() => {
		window.nav.onLocationChange((locStr) => {
			if (locStr.startsWith('search/video')) {
				findFilters(callback);
			} else {
				state.observer?.disconnect();
				state.observer = null;
			}
		});
	});
};

export default onSearchVideoSectionSelected;
