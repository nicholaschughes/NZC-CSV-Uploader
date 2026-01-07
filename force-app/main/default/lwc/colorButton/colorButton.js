import { LightningElement, api, track } from 'lwc';

export default class ColorButton extends LightningElement {
    // Public API to allow admins to configure colors and labels in App Builder
    @api label = 'Color Button';
    @api buttonText = 'Click me';
    @api colors = 'var(--lwc-colorBrand, #1b96ff), #2e8540, #d32f2f, #6a1b9a'; // comma-separated list
    // Boolean public properties should default to false for correct coercion
    @api rounded = false;

    @track currentIndex = 0;

    get colorList() {
        // Normalize and filter out empty values
        return this.colors
            .split(',')
            .map((c) => c.trim())
            .filter((c) => !!c);
    }

    get currentColor() {
        const list = this.colorList;
        if (!list.length) return '#1b96ff';
        return list[this.currentIndex % list.length];
    }

    get buttonStyle() {
        // Use inline style to show color directly on the button
        return `--btn-color:${this.currentColor}; background-color: var(--btn-color); border-color: var(--btn-color); color: white;`;
    }

    get swatchStyle() {
        return `background-color:${this.currentColor};`;
    }

    get ariaPressed() {
        // Toggles true/false for accessibility feel, though behavior cycles colors
        return this.currentIndex % 2 === 1 ? 'true' : 'false';
    }

    handleClick() {
        // advance the index and re-render
        this.currentIndex = (this.currentIndex + 1) % Math.max(1, this.colorList.length);
    }
}
