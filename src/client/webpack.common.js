const path = require('path');

module.exports = {
    entry: './src/client/threeClient.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|envmap|hdr)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                use: [
                  'raw-loader',
                ]
            }
        ],
    },
    resolve: {
        alias: {
            three: path.resolve('./node_modules/three'),
            './SSGIOptions': path.resolve('./node_modules/realism-effects/src/ssgi/SSGIOptions.js'),
            './BackSideDepthPass': path.resolve('./node_modules/realism-effects/src/ssgi/pass/BackSideDepthPass.js'),
            '../ssgi/pass/CopyPass': path.resolve('./node_modules/realism-effects/src/ssgi/pass/CopyPass.js'),
            '../utils/EquirectHdrInfoUniform': path.resolve('./node_modules/realism-effects/src/ssgi/utils/EquirectHdrInfoUniform.js'),
            '../../ssgi/utils/Utils': path.resolve('./node_modules/realism-effects/src/ssgi/utils/Utils.js'),
            '../utils/Utils': path.resolve('./node_modules/realism-effects/src/ssgi/utils/Utils.js'),
            './utils/QuasirandomGenerator': path.resolve('./node_modules/realism-effects/src/temporal-reproject/utils/QuasirandomGenerator.js'),
            '../../temporal-reproject/TemporalReprojectPass': path.resolve('./node_modules/realism-effects/src/temporal-reproject/TemporalReprojectPass.js'),
            './material/TemporalReprojectMaterial': path.resolve('./node_modules/realism-effects/src/temporal-reproject/material/TemporalReprojectMaterial.js'),
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../../dist/client'),
    }
};