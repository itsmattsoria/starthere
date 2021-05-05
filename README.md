# Start here.

![start here preview image](https://repository-images.githubusercontent.com/14812595/19f5cd00-f7b2-11ea-8ac8-08899a1e5b0c)

## A boilerplate I use for starting new static projects.

The boilerplate runs on the following resources:
* [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
* [SASS (SCSS syntax)](http://sass-lang.com/)
* [Laravel-mix](https://laravel-mix.com/)
* [Webpack](https://webpack.js.org/)
* [JQuery](https://jquery.org/)
* [Fabric](http://www.fabfile.org/)

## Setup
Run `yarn install`.

## Watching
Run `yarn start` to watch assets for changes and to fire up browsersync.

## Deployment
Change the settings in `fabfile.py` to match your server setup and run `fab deploy` to deploy.

## Structure
HTML files in the root and assets saved to `/assets` are working files. Assets in `/assets` will be processed by yarn and compiled to `dist/assets`.
```
├── assets
│   ├── images
│   ├── scripts
│   │   ├── routes
│   │   ├── util
│   │   └── main.js
│   ├── styles
│   │   ├── components
│   │   ├── helpers
│   │   ├── pages
│   │   ├── vendor
│   │   └── main.scss
│   └── svgs
├── dist
├── fabfile.py
├── package.json
├── webpack.mix.js
└── index.html
```

## To-do:
- [x] Convert grid system to use css grid instead of flex
- [ ] Refactor js to remove JQuery