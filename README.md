# Start Here.

## A boilerplate I use for starting new HTML projects. 

The boilerplate runs on the following resources:  
* [SASS (SCSS syntax)](http://sass-lang.com/)
* [Autoprefixer](https://github.com/postcss/autoprefixer)
* [Gulp.js](http://gulpjs.com/)
* [Normalize.css](http://necolas.github.io/normalize.css/)
* [JQuery](https://jquery.org/)
* [Fabric](http://www.fabfile.org/)

## Setup
Just run `bash setup.sh` to install bower and npm dependecies, and run gulp.

## Gulp
Run `gulp watch` to watch assets for changes and to fire up browsersync.

## Deployment
Before deploying make sure to run `fab build` to set up the build directory, and commit those changes. Change the settings in `fabfile.py` to match your server setup and run `fab deploy` to deploy.

## Structure
HTML files in the root and assets saved to `/assets` are working files. Assets in `/assets` will be processed by gulp and compiled to `/assets/dist`. HTML files and compiled assets are copied over to the `/build` direcotry, with assets getting revision hashes and their references in the HTML files automatically replaced. This build directory is what you should be serving up.
```
├── assets
│   ├── bower_components
│   ├── dist
│   │   ├── css
│   │   ├── images
│   │   └── js
│   ├── images
│   ├── js
│   │   ├── libs
│   │   └── no-build
│   ├── scss
│   │   ├── components
│   │   ├── helpers
│   │   ├── pages
│   │   └── vendor
│   └── svgs
│       └── build
├── build
│   └── assets
│       └── dist
│           ├── css
│           ├── images
│           └── js
|   └── index.html
├── mode_modules
└── index.html
```