const path = require('path');
const htmlStandards = require('reshape-standard');
const cssStandards = require('spike-css-standards');
const jsStandards = require('spike-js-standards');
const pageId = require('spike-page-id');
const webpack = require('webpack');
const env = process.env.SPIKE_ENV;

module.exports = {
    devtool: 'source-map',
    ignore: ['**/layout.html', '**/_*', '**/.*', 'readme.md', 'yarn.lock'],
    reshape: htmlStandards({
        locals: (ctx) => {
            return {
                pageId: pageId(ctx),
                foo: 'bar'
            }
        },
        minify: env === 'production'
    }),
    plugins: [
		new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Popper: ['popper.js', 'default'],
        }),
	],
    postcss: cssStandards({
        minify: env === 'production',
        warnForDuplicates: env !== 'production'
    }),
    resolve: {
        alias: {
            jquery: 'jquery/src/jquery',
        },
    },
    babel: jsStandards()
}
