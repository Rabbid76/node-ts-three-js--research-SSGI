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
                test: /\.(png|svg|jpg|jpeg|gif|envmap)$/i,
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
            '../temporal-reproject/TemporalReprojectPass': path.resolve('./node_modules/realism-effects/src/temporal-reproject/TemporalReprojectPass.js'),
            './material/TemporalReprojectMaterial': path.resolve('./node_modules/realism-effects/src/temporal-reproject/material/TemporalReprojectMaterial.js'),
            '../temporal-reproject/pass/VelocityDepthNormalPass': path.resolve('./node_modules/realism-effects/src/temporal-reproject/pass/VelocityDepthNormalPass.js'),
            '../../utils/BlueNoiseUtils': path.resolve('./node_modules/realism-effects/src/utils/BlueNoiseUtils.js'),
            './pass/DenoiserComposePass': path.resolve('./node_modules/realism-effects/src/denoise/pass/DenoiserComposePass.js'),
            './pass/PoissionDenoisePass': path.resolve('./node_modules/realism-effects/src/denoise/pass/PoissionDenoisePass.js'),
            '../../gbuffer/GBufferPass': path.resolve('./node_modules/realism-effects/src/gbuffer/GBufferPass.js'),
            '../utils/PoissonUtils': path.resolve('./node_modules/realism-effects/src/denoise/utils/PoissonUtils.js'),
            '../taa/TAAUtils': path.resolve('./node_modules/realism-effects/src/taa/TAAUtils.js'),
            '../temporal-reproject/utils/QuasirandomGenerator': path.resolve('./node_modules/realism-effects/src/temporal-reproject/utils/QuasirandomGenerator.js'),
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../../dist/client'),
    }
};