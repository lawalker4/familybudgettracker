const WebpackPwaManifest = require('webpack-pwa-mainifest');
const path = require('path');

const config = {
    entry: {
        app: "public\js\index.js"
    },
    output: {
        path: path.join(__dirname + "/dist"),
        filename: "[name].bundle.js"
    },
    plugins: [
        new WebpackPwaManifest({
            name: 'Family Budget Tracker',
            short_name: 'Budget Tracker',
            description: 'An app that allows you to view upcoming food events.',
            start_url: 'public\index.html',
            background_color: "#dddddd",
            theme_color: "#ffffff",
            fingerprints: false,
            inject: false,
            icons: [
                {
                    src: path.resolve('public\icons\icon-512x512.png'),
                    sizes: [72, 96, 128, 144, 152, 192, 384, 512],
                    destination: path.join('assets', 'icons')
                }
            ]
        })
    ],
    mode: 'development'
};
module.exports = config;