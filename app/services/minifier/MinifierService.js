const STRATEGY_MAP = {
    js: {
        path: './strategies/terser.strategy.js',
        className: 'TerserStrategy'
    },
    css: {
        path: './strategies/cleancss.strategy.js',
        className: 'CleanCssStrategy'
    },
    html: {
        path: './strategies/html.strategy.js',
        className: 'HTMLStrategy'
    }
};

export class MinifierService {

    static strategies = new Map();

    static async #loadStrategy(type) {
        if(!this.strategies) {
            this.strategies = new Map();
        }
        if(this.strategies.has(type)) {
            return this.strategies.get(type);
        }
        const config = STRATEGY_MAP[type];

        if(!config) {
            throw new Error(`Unsupported minification type: ${type}`);
        }
        try {
            const module = await import(config.path);
            
            if(!module[config.className]) {
                throw new Error(`Class ${config.className} not found in module`);
            }
            const StrategyClass = module[config.className];
            const instance = new StrategyClass();

            this.strategies.set(type, instance);

            return instance;
        } catch(error) {
            throw new Error(`Failed to load strategy ${type}: ${error.message}`);
        }
    }

    static async minify(type, code, options = {}) {
        try {
            const strategy = await MinifierService.#loadStrategy(type);
            return await strategy.minify(code, options);
        } catch(error) {
            console.error(`Error while minifying ${type}:`, error);
            throw error;
        }
    }

    static async javascript(code, options = {}) {
        return MinifierService.minify('js', code, options);
    }

    static async css(code, options = {}) {
        return MinifierService.minify('css', code, options);
    }

    static async html(code, options = {}) {
        return MinifierService.minify('html', code, options);
    }
}