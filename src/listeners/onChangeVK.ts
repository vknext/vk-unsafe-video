import type { VK } from 'src/global';
import InteractionListener from 'src/interactions/utils/InteractionListener';
import waitVK from 'src/lib/waitVK';

type CallbackFunc = (vk: VK) => void;
const interaction = new InteractionListener<CallbackFunc>();

const hookVK = async () => {
	await waitVK();

	let vkValue: VK = window.vk;

	Object.defineProperty(window, 'vk', {
		get: () => vkValue,
		set: (newVk: VK) => {
			vkValue = newVk;

			for (const callback of interaction.listeners) {
				try {
					callback(vkValue);
				} catch (e) {
					console.error(e);
				}
			}

			return true;
		},
		configurable: true,
	});
};

let inited = false;
const onAddNewCallback = async (callback: CallbackFunc) => {
	if (inited) {
		await waitVK();
	} else {
		inited = true;

		await hookVK();
	}

	callback(window.vk);
};

const onChangeVK = (callback: CallbackFunc) => {
	const listener = interaction.addListener(callback);

	onAddNewCallback(callback);

	return listener;
};

export default onChangeVK;
