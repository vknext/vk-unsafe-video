/* eslint-disable no-var */

interface VKNext {
	vuv_installed?: boolean;
	webpack?: Record<string, any>;
}

export interface Nav {
	onLocationChange: (handler: (locStr: string) => unknown) => () => void;
}

export interface Cur {
	lang: Record<string, any>;
	videoFilter_notsafe?: HTMLElement;
	searchText?: string;
	searchInputEl?: HTMLElement;
}

export interface VK {
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
	var vk: VK;

	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production';
		}
	}
}
