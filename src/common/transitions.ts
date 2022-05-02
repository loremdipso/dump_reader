import type { TransitionConfig } from 'svelte/transition';
import { cubicInOut } from 'svelte/easing';

export function fadeScale(
	node: Element, { delay = 0, duration = 200, baseScale = 0 }
): TransitionConfig {
	const o = +getComputedStyle(node).opacity;
	const m = getComputedStyle(node).transform.match(/scale\(([0-9.]+)\)/);
	const s = m ? +m[1] : 1;
	const is = 1 - baseScale;

	return {
		delay,
		duration,
		css: t => {
			const eased = cubicInOut(t);
			return `opacity: ${eased * o}; transform: scale(${(eased * s * is) + baseScale})`;
		}
	};
}
