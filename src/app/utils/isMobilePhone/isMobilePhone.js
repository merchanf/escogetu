const isMobilePhone = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isTouchDevice = window.matchMedia('(pointer:coarse)').matches;
  const isMobileScreen = window.matchMedia('only screen and (max-width: 760px)').matches;
  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) return true;
  if (/android/i.test(userAgent)) return true;
  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return true;
  if (isTouchDevice && isMobileScreen) return true;
  return false;
};

export { isMobilePhone };
