export class CleanCssStrategy {
    async minify(code, options = {}) {
        const { default: CleanCSS } = await import('clean-css');
        const result = new CleanCSS({
            level: 2,
            ...options
        }).minify(code);
        
        if(result.errors.length > 0) {
            throw new Error(result.errors.join('\n'));
        }
        return result.styles;
    }
}