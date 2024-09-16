if (document.documentElement instanceof HTMLHtmlElement) {
	try {
		window.sessionStorage.setItem('vuv_public_path', chrome.runtime.getURL(''));
	} catch (e) {
		document.documentElement.dataset['vuv_public_path'] = chrome.runtime.getURL('');
	}

	const script = document.createElement('script');
	script.src = chrome.runtime.getURL('injected.vuv.js');
	script.onload = () => {
		script.remove();
	};

	(document.body || document.documentElement).appendChild(script);
}
