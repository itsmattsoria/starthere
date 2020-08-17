// Common js
import appState from '../util/appState';

// Shared vars
let $window = $(window),
    $body = $('body'),
    $document = $(document),
    transitionElements = [],
    resizeTimer;

export default {
  // JavaScript to be fired on all pages
  init() {
    // Transition elements to enable/disable on resize
    transitionElements = [];

    // Init Functions
    _initTesting();

    function _initTesting() {
      console.log('testing, testing...is this thing on?');
    }

    // Disabling transitions on certain elements on resize
    function _disableTransitions() {
      $.each(transitionElements, function() {
        $(this).css('transition', 'none');
      });
    }

    function _enableTransitions() {
      $.each(transitionElements, function() {
        $(this).attr('style', '');
      });
    }

    function _resize() {
      // Disable transitions when resizing
      _disableTransitions();

      // Functions to run on resize end
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        // Re-enable transitions
        _enableTransitions();
      }, 250);
    }
    $(window).resize(_resize);

  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
  },
};
