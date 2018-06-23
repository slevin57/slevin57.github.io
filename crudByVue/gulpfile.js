var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('server',function () {
  connect.server({ 
    root:'',
    port: 3001,//不写这个参数的话默认端口是8080；被占用的话会显示“等待localhost响应”；
    livereload:true
  });
});
gulp.task('reload',function () {
  return gulp.src('dist/index.html')
  .pipe(connect.reload())
});

gulp.task('watch',function () {
	gulp.watch('dist/index.html',['reload']); //只监视dist文件夹下面的index.html这一个文件
});

gulp.task('default',['server','watch']);
