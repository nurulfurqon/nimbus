const gulp = require('gulp');
const theo = require('theo')
const gulpTheo = require('gulp-theo');
const cache = require('gulp-cache');
const del = require('del');

// Register type exporting file
theo.registerFormat('web.js', require('./format/web.js'))
theo.registerFormat('common.js', require('./format/web.js'))
theo.registerFormat('ios.json', require('./format/ios.json.js'))
theo.registerFormat('android.xml', require('./format/android.xml.js'))

// Task for compile scss file
gulp.task('color:scss', () =>
  gulp.src('token/color.yml')
  .pipe(gulpTheo({
    transform: {
      type: 'web'
    },
    format: {
      type: 'scss'
    }
  }))
  .pipe(gulp.dest('dist/color/scss'))
);

// Task for compile js file
gulp.task('color:js', () =>
  gulp.src('token/color.yml')
  .pipe(gulpTheo({
    transform: {
      type: 'web'
    },
    format: {
      type: 'web.js'
    }
  }))
  .pipe(gulp.dest('dist/color/web'))
);

// Task for compile ios json file
gulp.task('color:ios', () =>
  gulp.src('token/color.yml')
  .pipe(gulpTheo({
    transform: {
      type: 'web'
    },
    format: {
      type: 'ios.json'
    }
  }))
  .pipe(gulp.dest('dist/color/ios'))
);

// Task for compile android xml file
gulp.task('color:android', () =>
  gulp.src('token/color.yml')
  .pipe(gulpTheo({
    transform: {
      type: 'android'
    },
    format: {
      type: 'android.xml'
    }
  }))
  .pipe(gulp.dest('dist/color/android'))
);

// Task for compile all file
gulp.task('all', () =>
  gulp.src('token/index.yml')
  .pipe(gulpTheo({
    transform: {
      type: 'web'
    },
    format: {
      type: 'common.js'
    }
  }))
  .pipe(gulp.dest('dist'))
)

// Clean directory dist
gulp.task('clean:dist', () => {
  return del('dist');
});

// Clear a cache gulp
gulp.task('cache:clear', (callback) => {
  return cache.clearAll(callback);
})

// Task For Build all task
gulp.task('build', gulp.series('clean:dist', 'color:scss', 'color:js', 'color:ios', 'color:android', 'all'))
