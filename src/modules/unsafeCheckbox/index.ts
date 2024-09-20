import onVkVideoPageLoaded from 'src/interactions/onVkVideoPageLoaded';

interface FilterPaneElement extends HTMLElement {
	_vuv_injected?: boolean;
}

const enableUnsafeCheckbox = (filterPane: FilterPaneElement) => {
	if (filterPane._vuv_injected) return;

	filterPane._vuv_injected = true;

	const hqCheckbox = filterPane.querySelector<HTMLInputElement>('#video_fltr_hd')!;
	const unsafeCheckbox = hqCheckbox.cloneNode(true) as HTMLElement;
	unsafeCheckbox.id = 'video_fltr_notsafe';

	const localeString = window.cur.lang['video_filter_no_safe'];
	unsafeCheckbox.lastChild!.nodeValue = localeString;

	hqCheckbox.insertAdjacentElement('afterend', unsafeCheckbox);

	window.cur.videoFilter_notsafe = window.ge('video_fltr_notsafe');
	window.removeEvent(window.cur.videoFilter_notsafe, 'click');
	window.addEvent(window.cur.videoFilter_notsafe, 'click', window.Video._onFiltersChanged);
	window.data(window.cur.videoFilter_notsafe, 'title', localeString);

	if (!window.vknext.webpack) {
		const vknextPromoLink = document.createElement('a');

		vknextPromoLink.href = 'https://vknext.net/?utm_source=vuv';
		vknextPromoLink.textContent = 'Больше возможностей доступно в расширении VK Next. Нажмите, чтобы ознакомиться.';
		vknextPromoLink.target = '_blank';
		vknextPromoLink.classList.add('VkNextPromoLink');

		unsafeCheckbox.parentElement!.append(vknextPromoLink);
	}

	const loc = window.Video.getLoc();
	if (loc.q) {
		window.Video._prepareSearchFilters(loc);
		window.cur.searchText = loc.q;
		window.Video.inputVal(cur.searchInputEl, cur.searchText);
		window.Video.doSearch(loc.q);
	}

	if (window.Video.getLoc().notsafe) {
		// Смешной костыль, чтобы затриггерить ре-рендер компонента поиска при перезагрузке страницы
		unsafeCheckbox.click();
		unsafeCheckbox.click();
	}
};

const initUnsafeCheckbox = () => {
	onVkVideoPageLoaded(enableUnsafeCheckbox);
};

export default initUnsafeCheckbox;
