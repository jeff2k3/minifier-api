export class TerserStrategy {
    async minify(code, options = {}) {
        const { minify } = await import('terser');
        const result = await minify(code, {
            compress: true,
            mangle: true,
            ...options
        });
        return result.code || '';
    }
}