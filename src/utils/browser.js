const shimKeyboardEventKey = () => {
	const event = window.KeyboardEvent.prototype;
	const desc = Object.getOwnPropertyDescriptor(event, 'key');
	if (!desc) return;

	const keys = {
		Win: 'Meta',
		Scroll: 'ScrollLock',
		Spacebar: ' ',

		Down: 'ArrowDown',
		Left: 'ArrowLeft',
		Right: 'ArrowRight',
		Up: 'ArrowUp',

		Del: 'Delete',
		Apps: 'ContextMenu',
		Esc: 'Escape',

		Multiply: '*',
		Add: '+',
		Subtract: '-',
		Decimal: '.',
		Divide: '/',
	};

	Object.defineProperty(event, 'key', {
		get() {
			const key = desc.get.call(this);

			// eslint-disable-next-line no-prototype-builtins
			return keys.hasOwnProperty(key) ? keys[key] : key;
		},
	});
};

export function prepareBrowser() {
	shimKeyboardEventKey();
}
