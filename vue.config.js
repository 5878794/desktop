const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    css: {
        loaderOptions: {
            css: {
                modules: {
                    localIdentName: '[name]-[local]-[hash:base64:5]'
                }
            }
        }
    }

})
