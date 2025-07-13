import request from 'supertest';
import app from '../app/app.js';

describe('Minifier API', () => {
    describe('POST /api/minify/js', () => {
        it('should minify JavaScript code', async () => {
            const response = await request(app)
                .post('/api/minify/js')
                .send({ code: 'function hello() { console.log("Hello, world!"); }' })
                .set('Accept', 'application/json');

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('result');
            expect(typeof response.body.result).toBe('string');
            expect(response.body.result).toContain('console.log');
        });

        it('should return 400 if code is missing', async () => {
            const response = await request(app)
                .post('/api/minify/js')
                .send({})
                .set('Accept', 'application/json');

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });
    });

   describe('POST /api/minify/css', () => {
        it('should minify CSS code', async () => {
            const cssCode = `html { padding: 0; margin: 0; box-sizing: border-box; }`;

            const response = await request(app)
                .post('/api/minify/css')
                .send({ code: cssCode })
                .set('Accept', 'application/json');

            expect(response.status).toBe(200);
            expect(response.body.result).toMatch(/html{padding:0;margin:0;box-sizing:border-box}/);
        });

        it('should return 400 if code is missing', async () => {
            const response = await request(app)
                .post('/api/minify/css')
                .send({})
                .set('Accept', 'application/json');

            expect(response.status).toBe(400);
            expect(response.body.error).toBeDefined();
        });
    });

    describe('POST /api/minify/html', () => {
        it('should minify HTML code', async () => {
            const htmlCode = `<html><body><h1> Hello World </h1></body></html>`;

            const response = await request(app)
                .post('/api/minify/html')
                .send({ code: htmlCode })
                .set('Accept', 'application/json');

            expect(response.status).toBe(200);
            expect(response.body.result).toContain('<h1>Hello World</h1>');
            expect(response.body.result).not.toMatch(/\s{2,}/);
        });

        it('should return 400 if code is missing', async () => {
            const response = await request(app)
                .post('/api/minify/html')
                .send({})
                .set('Accept', 'application/json');

            expect(response.status).toBe(400);
            expect(response.body.error).toBeDefined();
        });
    });
});