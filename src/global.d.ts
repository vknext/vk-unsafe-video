/* eslint-disable no-var */

interface VKNext {
	vuv_installed?: boolean;
}

export interface Nav {
	onLocationChange: (handler: (locStr: string) => unknown) => () => void;
}

export interface Cur {
	lang: Record<string, any>;
	videoFilter_notsafe?: HTMLElement;
}

export interface Vk {
	pe: Record<string, any>;
}

declare global {
	var vknext: VKNext;
	var nav: Nav;
	var cur: Cur;
	var ge: (id: string) => HTMLElement;
	var data: (elem: HTMLElement, prop: string, value: string) => void;
	var addEvent: (elem: HTMLElement, event: string, handler: EventListenerOrEventListenerObject) => void;
	var removeEvent: (elem: HTMLElement, event: string) => void;
	var Video: Record<string, any>;
	var vk: Vk;

	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production';
		}
	}
}
