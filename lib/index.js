const { src, dest, parallel, series, watch } = require("gulp");
const del = require("del");
const browserSync = require("browser-sync");
const loadPlugins = require("gulp-load-plugins");
const plugins = loadPlugins(); // 自动加载插件

const clean = () => {
  return del(["dist", "temp"]);
};

const bs = browserSync.create();
const cwd = process.cwd();

let config = {
  // default config
};

try {
  const loadConfig = require(`${cwd}/pages.config.js`);
  config = Object.assign({}, config, loadConfig);
} catch (e) {}

/**
 * 开发时编译的三大件: HTML/CSS/JS
 * 构建管道:编译完成后重载到浏览器中
 */
const style = () => {
  return src("src/assets/styles/*.scss", { base: "src" })
    .pipe(plugins.sass({ outputStyle: "expanded" }))
    .pipe(dest("temp"))
    .pipe(bs.reload({ stream: true }));
};

const script = () => {
  return src("src/assets/scripts/*.js", { base: "src" })
    .pipe(plugins.babel({ presets: ["@babel/preset-env"] }))
    .pipe("temp")
    .pipe(bs.reload({ stream: true }));
};

const page = () => {
  return src("src/*.html")
    .pipe(plugins.swig({ data: config.data }))
    .pipe(dest("temp"))
    .pipe(bs.reload({ stream: true }));
};
/**
 * --------------------------------------
 */

/**
 * 静态资源开发时无需操作,直接让browser-sync去src目录找
 * 只有上线build才执行以下任务
 */
const image = () => {
  return src("src/assets/images/**", { base: "src" })
    .pipe(plugins.imagemin())
    .pipe(dest("dist"));
};

const font = () => {
  return src("src/assets/fonts/**", { base: "src" })
    .pipe(plugins.imagemin())
    .pipe(dest("dist"));
};

const extra = () => {
  return src("public/**", { base: "public" }).pipe(dest("dist"));
};
/**
 * --------------------------------------
 */

/**
 * 开发服务器定义
 * 监听html/css/js和静态资源的目录
 *
 */
const serve = () => {
  watch("src/assets/styles/*.scss", style);
  watch("src/assets/scripts/*.js", script);
  watch("src/*.html", page);
  watch(
    ["src/assets/images/**", "src/assets/fonts/**", "public/**"],
    bs.reload
  );

  bs.init({
    notify: false,
    port: 2080,
    server: {
      baseDir: ["temp", "src", "public"],
      routes: {
        "/node_modules": "node_modules", // 路由映射
      },
    },
  });
};

/**
 * 构建打包时,根据构建注释和引用对不同的文件类型执行压缩操作
 */
const useref = () => {
  // html js css
  return src("temp/*.html", { base: "temp" })
    .pipe(plugins.useref({ searchPath: ["temp", "."] }))
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(
      plugins.if(
        /\.html$/,
        plugins.htmlmin({
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
        })
      )
    )
    .pipe(dest("dist"));
};

const compile = parallel(page, style, script);

const build = series(
  clean,
  parallel(series(compile, useref), image, font, extra)
);

const develop = series(compile, serve);

module.exports = {
  clean,
  build,
  develop,
};
