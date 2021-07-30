/* global WebKitCSSMatrix */

import React from 'react';
import PropTypes from 'prop-types';

const sleep = require('p-sleep');

const LEFT = 'left';
const RIGHT = 'right';
const UP = 'up';
const DOWN = 'down';
const POWER = 3500;

const settings = {
  snapBackDuration: 300,
  maxTilt: 5,
  bouncePower: 0.2,
  swipeThreshold: 300, // px/s
};

const translationString = (x, y) => {
  const translation = `translate(${x}px, ${y}px)`;
  return translation;
};

const getTranslate = (element) => {
  const style = window.getComputedStyle(element);
  const matrix = new WebKitCSSMatrix(style.webkitTransform);
  const ans = { x: matrix.m41, y: matrix.m42 };
  return ans;
};

const rotationString = (rot) => {
  const rotation = `rotate(${rot}deg)`;
  return rotation;
};

const getRotation = (element) => {
  const style = window.getComputedStyle(element);
  const matrix = new WebKitCSSMatrix(style.webkitTransform);
  const ans = (-Math.asin(matrix.m21) / (2 * Math.PI)) * 360;
  return ans;
};

const getElementSize = (element) => {
  const elementStyles = window.getComputedStyle(element);
  const widthString = elementStyles.getPropertyValue('width');
  const width = Number(widthString.split('px')[0]);
  const heightString = elementStyles.getPropertyValue('height');
  const height = Number(heightString.split('px')[0]);
  return { x: width, y: height };
};

const pythagoras = (x, y) => {
  return Math.sqrt(x ** 2 + y ** 2);
};

const animateOut = async (element, speed, easeIn = false, direction, fromButton = false) => {
  const startPos = getTranslate(element);
  const bodySize = getElementSize(document.body);
  const diagonal = pythagoras(bodySize.x, bodySize.y);

  const velocity = pythagoras(speed.x, speed.y);
  const time = diagonal / velocity;
  const translateString = translationString(
    speed.x * time + startPos.x,
    -speed.y * time + startPos.y,
  );
  let rotateString = '';

  if (easeIn) {
    element.style.transition = `ease ${time}s`;
  } else {
    element.style.transition = `ease-out ${time}s`;
  }

  if (direction === RIGHT) {
    rotateString = rotationString('15');
  } else if (direction === LEFT) {
    rotateString = rotationString('-15');
  } else {
    rotateString = '0';
  }

  element.style.transform = translateString + rotateString;

  await sleep(time * (fromButton ? 300 : 25));
};

const animateBack = (element) => {
  element.style.transition = `${settings.snapBackDuration}ms`;
  const startingPoint = getTranslate(element);
  const translation = translationString(
    startingPoint.x * -settings.bouncePower,
    startingPoint.y * -settings.bouncePower,
  );
  const rotation = rotationString(getRotation(element) * -settings.bouncePower);
  element.style.transform = translation + rotation;

  setTimeout(() => {
    element.style.transform = 'none';
  }, settings.snapBackDuration * 0.75);

  setTimeout(() => {
    element.style.transition = '10ms';
  }, settings.snapBackDuration);
};

const getSwipeDirection = (speed) => {
  if (Math.abs(speed.x) > Math.abs(speed.y)) {
    return speed.x > 0 ? 'right' : 'left';
  }
  return speed.y > 0 ? 'up' : 'down';
};

const calcSpeed = (oldLocation, newLocation) => {
  const dx = newLocation.x - oldLocation.x;
  const dy = oldLocation.y - newLocation.y;
  const dt = (newLocation.time - oldLocation.time) / 1000;
  return { x: dx / dt, y: dy / dt };
};

const dragableTouchmove = (coordinates, element, offset, lastLocation) => {
  const pos = { x: coordinates.x + offset.x, y: coordinates.y + offset.y };
  const newLocation = { x: pos.x, y: pos.y, time: new Date().getTime() };
  const translation = translationString(pos.x, pos.y);
  const rotCalc = calcSpeed(lastLocation, newLocation).x / 1000;
  const rotation = rotationString(rotCalc * settings.maxTilt);
  element.style.transform = translation + rotation;
  return newLocation;
};

const touchCoordinatesFromEvent = (e) => {
  const touchLocation = e.targetTouches[0];
  return { x: touchLocation.clientX, y: touchLocation.clientY };
};

const mouseCoordinatesFromEvent = (e) => {
  return { x: e.clientX, y: e.clientY };
};

const TinderCard = React.forwardRef(
  (
    { flickOnSwipe = true, children, onSwipe, onCardLeftScreen, className, preventSwipe = [] },
    ref,
  ) => {
    const swipeAlreadyReleased = React.useRef(false);

    const element = React.useRef();

    React.useImperativeHandle(ref, () => ({
      async swipe(dir = 'right') {
        if (onSwipe) onSwipe(dir);
        const disturbance = (Math.random() - 0.5) * 100;
        if (dir === RIGHT) {
          await animateOut(element.current, { x: POWER, y: disturbance }, true, dir, true);
        } else if (dir === LEFT) {
          await animateOut(element.current, { x: -POWER, y: disturbance }, true, dir, true);
        } else if (dir === UP) {
          await animateOut(element.current, { x: disturbance, y: POWER }, true, dir, true);
        } else if (dir === DOWN) {
          await animateOut(element.current, { x: disturbance, y: -POWER }, true, dir, true);
        }
        if (element && element.current && element.current?.style?.display)
          element.current.style.display = 'none';
        if (onCardLeftScreen) onCardLeftScreen(dir);
      },
    }));

    const handleSwipeReleased = React.useCallback(
      async (element, speed) => {
        if (swipeAlreadyReleased.current) {
          return;
        }
        swipeAlreadyReleased.current = true;

        // Check if this is a swipe
        if (
          Math.abs(speed.x) > settings.swipeThreshold ||
          Math.abs(speed.y) > settings.swipeThreshold
        ) {
          const dir = getSwipeDirection(speed);

          if (onSwipe) onSwipe(dir);

          if (flickOnSwipe) {
            if (!preventSwipe.includes(dir)) {
              await animateOut(element, speed);
              if (element?.style?.display) element.style.display = 'none';
              if (onCardLeftScreen) onCardLeftScreen(dir);
              return;
            }
          }
        }

        // Card was not flicked away, animate back to start
        animateBack(element);
      },
      [swipeAlreadyReleased, flickOnSwipe, onSwipe, onCardLeftScreen, preventSwipe],
    );

    const handleSwipeStart = React.useCallback(() => {
      swipeAlreadyReleased.current = false;
    }, [swipeAlreadyReleased]);

    React.useLayoutEffect(() => {
      let offset = { x: null, y: null };
      let speed = { x: 0, y: 0 };
      let lastLocation = { x: 0, y: 0, time: new Date().getTime() };
      let mouseIsClicked = false;

      element.current.addEventListener('touchstart', (ev) => {
        ev.preventDefault();
        handleSwipeStart();
        offset = { x: -touchCoordinatesFromEvent(ev).x, y: -touchCoordinatesFromEvent(ev).y };
      });

      element.current.addEventListener('mousedown', (ev) => {
        ev.preventDefault();
        mouseIsClicked = true;
        handleSwipeStart();
        offset = { x: -mouseCoordinatesFromEvent(ev).x, y: -mouseCoordinatesFromEvent(ev).y };
      });

      element.current.addEventListener('touchmove', (ev) => {
        ev.preventDefault();
        const newLocation = dragableTouchmove(
          touchCoordinatesFromEvent(ev),
          element.current,
          offset,
          lastLocation,
        );
        speed = calcSpeed(lastLocation, newLocation);
        lastLocation = newLocation;
      });

      element.current.addEventListener('mousemove', (ev) => {
        ev.preventDefault();
        if (mouseIsClicked) {
          const newLocation = dragableTouchmove(
            mouseCoordinatesFromEvent(ev),
            element.current,
            offset,
            lastLocation,
          );
          speed = calcSpeed(lastLocation, newLocation);
          lastLocation = newLocation;
        }
      });

      element.current.addEventListener('touchend', (ev) => {
        ev.preventDefault();
        handleSwipeReleased(element.current, speed);
      });

      element.current.addEventListener('mouseup', (ev) => {
        if (mouseIsClicked) {
          ev.preventDefault();
          mouseIsClicked = false;
          handleSwipeReleased(element.current, speed);
        }
      });

      element.current.addEventListener('mouseleave', (ev) => {
        if (mouseIsClicked) {
          ev.preventDefault();
          mouseIsClicked = false;
          handleSwipeReleased(element.current, speed);
        }
      });
    }, [handleSwipeReleased, handleSwipeStart]);

    return React.createElement('div', { ref: element, className }, children);
  },
);

TinderCard.defaultProps = {
  flickOnSwipe: true,
  onSwipe: () => {},
  onCardLeftScreen: () => {},
  className: '',
  preventSwipe: [],
};

TinderCard.propTypes = {
  flickOnSwipe: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  onSwipe: PropTypes.func,
  onCardLeftScreen: PropTypes.func,
  className: PropTypes.string,
  preventSwipe: PropTypes.arrayOf(PropTypes.string),
};

export default TinderCard;
