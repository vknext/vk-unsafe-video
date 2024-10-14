const addInjectedScript = (src: string) => {
	if (!(document.documentElement instanceof HTMLHtmlElement)) {
		return false;
	}

	const script = document.createElement('script');
	script.src = src;
	script.onload = () => {
		script.remove();
	};

	(document.body || document.documentElement).appendChild(script);

	return script;
};

export default addInjectedScript;
