export class HTMLStrategy {
    async minify(code, options = {}) {
        const { minify: htmlmin } = await import('html-minifier');

        if(!code.trim().startsWith('<')) {
            throw new Error('Code must contain HTML tags');
        }
        
        const defaultOptions = {
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            ...options
        };

        try {
            return htmlmin(code, defaultOptions);
        } catch (error) {
            throw new Error(`HTML minification failed: ${error.message}`);
        }
    }
}