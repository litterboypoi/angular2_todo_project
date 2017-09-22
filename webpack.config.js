/**
 * Created by shigure on 2017/5/16.
 */
module.exports = {

    //devtool: 'eval-source-map',
    entry: __dirname + "/app/main.ts",
    output: {
        path: __dirname + "/app/dist",
        filename: "bundle.js"
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'] // note if using webpack 1 you'd also need a '' in the array as well
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: [
                    'ts-loader',
                    'angular-router-loader'
                ]
            }
        ]
    }
};