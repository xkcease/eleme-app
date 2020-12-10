const path = require('path');
const mockData = require('./tests/mock/data.json');

module.exports = {
    devServer: {
        before(app) {
            app.get('/api/goods', (req, res) => {
                res.json(mockData.goods);
            });

            app.get('/api/ratings', (req, res) => {
                res.json(mockData.ratings);
            });

            app.get('/api/seller', (req, res) => {
                res.json(mockData.seller);
            });
        },
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [path.resolve(__dirname, './src/assets/scss/index.scss')],
        },
    },
};
