// Import external dependencies

// Import local dependencies
import Router from './util/Router';
import appState from './util/appState';

// Routes
import common from './routes/common';
import home from './routes/home';

// Populate Router instance with DOM routes
const routes = new Router({
  common,
  home
});

// Inits
appState.init();

// Load events
$(document).ready(() => routes.loadEvents());