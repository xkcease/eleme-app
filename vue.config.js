const mockData = require('./src/util/mock/data.json');

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
        }
    }
}