if (document.documentElement instanceof HTMLHtmlElement) {
	const script = document.createElement('script');
	script.src = chrome.runtime.getURL('injected.vuv.js');
	script.onload = () => {
		script.remove();
	};

	(document.body || document.documentElement).appendChild(script);
}
