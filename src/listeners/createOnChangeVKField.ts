import type { VK } from 'global';
import InteractionListener from '../interactions/utils/InteractionListener';
import waitVK from 'src/lib/waitVK';
import onChangeVK from './onChangeVK';

type CallbackFunc<T> = (value: T) => void;

const createOnChangeVKField = <Key extends keyof VK, T = VK[Key]>(fieldName: Key) => {
	const interaction = new InteractionListener<CallbackFunc<T>>();

	const hookField = (vkValue: VK) => {
		let fieldValue = vkValue[fieldName];

		Object.defineProperty(vkValue, fieldName, {
			get: () => fieldValue,
			set: (newValue) => {
				fieldValue = newValue;

				for (const callback of interaction.listeners) {
					try {
						callback(fieldValue as T);
					} catch (e) {
						console.error(e);
					}
				}

				return true;
			},
			configurable: true,
			enumerable: true,
		});
	};

	const hookFieldWithVK = async () => {
		await waitVK();

		if (window.vk) {
			hookField(window.vk);
		}

		onChangeVK((newVk) => {
			hookField(newVk);
		});
	};

	let inited = false;
	const onAddNewCallback = async (callback: CallbackFunc<T>) => {
		if (!inited) {
			inited = true;
			await hookFieldWithVK();
		}

		await waitVK();

		callback(window.vk[fieldName] as T);
	};

	const onChangeField = (callback: CallbackFunc<T>) => {
		const listener = interaction.addListener(callback);

		onAddNewCallback(callback);

		return listener;
	};

	return onChangeField;
};

export default createOnChangeVKField;
