const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif|obj)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
};
