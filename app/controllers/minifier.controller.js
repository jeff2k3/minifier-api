import { MinifierService } from "../services/minifier/MinifierService.js";

export class MinifierController {

    static async _minify(req, res, fn) {
        try {
            const { code, options } = req.body;
            if(!code) throw new Error('Code is required.');
            
            const minified = await fn(code, options || {});

            res.json({ result: minified });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async minify_js(req, res) {
        await MinifierController._minify(req, res, MinifierService.javascript);
    }

    static async minify_css(req, res) {
        await MinifierController._minify(req, res, MinifierService.css);
    }

    static async minify_html(req, res) {
        await MinifierController._minify(req, res, MinifierService.html);
    }
}