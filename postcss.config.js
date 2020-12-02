module.exports = {
    plugins: [
        require('autoprefixer'),
        require('cssnano')({
            preset: 'default',
        })
    ]
}
// 65 еслпи писать browser:last 10 version