// 实现这个项目的构建任务
const { src, dest, parallel,series, watch } = require('gulp');
const loadPlugins = require('gulp-load-plugins');

const plugins = loadPlugins();
const browserSync = require('browser-sync');
const bs = browserSync.create()


const del = require('del');


const data = {
    menus : [],
    pkg : require('./package.json'),
    date : new Date()
}


const clean = () => {
    return del(['dist'])
}

const style = () => {
    return src('src/assets/styles/*.scss', { base : 'src' })
            .pipe(plugins.sass({outputStyle : 'expanded'}))
            .pipe(dest('dist'))
            .pipe(bs.reload({ stream : true }))
}


const script = () => {
    return src('src/assets/scripts/*.js', { base : 'src' })
            .pipe(plugins.babel({ presets : ['@babel/preset-env']}))
            .pipe(dest('dist'))
            .pipe(bs.reload({ stream : true }))
}

const page = () => {
    return src('src/*.html', { base : 'src' })
            .pipe(plugins.swig({data}))
            .pipe(dest('dist'))
            .pipe(bs.reload({ stream : true }))
}

const image = () => {
    return src('src/assets/images/**', { base : 'src' })
            .pipe(plugins.imagemin())
            .pipe(dest('dist'))
}
const font = () => {
    return src('src/assets/fonts/**', { base : 'src' })
            .pipe(plugins.imagemin())
            .pipe(dest('dist'))
}

const extra = () => {
    return src('public/**', { base : 'public' })
            .pipe(dest('dist'))
}

const serve = () => {
    watch('src/assets/styles/*.scss', style)
    watch('src/assets/scripts/*.js', script)
    watch('src/*.html', page)
    watch([
        'src/assets/images/**',
        'src/assets/fonts/**',
        'public/**'
    ], bs.reload)
    bs.init({
        server : {
            notify : false,
            files : 'dist/**',
            baseDir : 'dist',
            routes : {
                '/node_modules' : 'node_modules'
            }
        }
    })
}


const compile = parallel(style, script, page)
const build = series(clean, parallel(compile,extra))  

module.exports = {
    style,
    script,
    page,
    compile,
    image,
    font,
    build,
    serve
}