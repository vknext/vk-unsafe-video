import onSearchVideoSectionSelected from 'src/interactions/onSearchVideoSectionSelected';

const appendVkNextBanner = (element: HTMLElement) => {
	if (window.vknext.webpack) return;

	const banner = document.createElement('a');

	banner.href = 'https://vknext.net/?utm_source=vuv';
	banner.textContent = 'Больше возможностей доступно в расширении VK Next. Нажмите, чтобы ознакомиться.';
	banner.target = '_blank';
	banner.classList.add('vkuiFormItem');
	banner.classList.add('vkuiFormItem--withPadding');

	element.append(banner);
};

const initVKNextSearchBanner = () => {
	onSearchVideoSectionSelected(appendVkNextBanner);
};

export default initVKNextSearchBanner;
