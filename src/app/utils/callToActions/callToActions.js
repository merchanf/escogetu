import { isIos, isMobilePhone } from '../utils';

export const ctas = {
  PHONE_NUMBER: 'Phone number',
  WHATSAPP: 'WhatsApp',
  EMAIL: 'Email',
  FACEBOOK: 'facebook',
  INSTAGRAM: 'Instagram',
  TWITTER: 'twitter',
  LINKEDIN: 'linkedin',
  YOUTUBE: 'youtube',
  WEBSITE: 'Website',
  DIRECTIONS: 'directions',
  DISTANCE: 'distance',
};

const {
  PHONE_NUMBER,
  WHATSAPP,
  EMAIL,
  FACEBOOK,
  INSTAGRAM,
  TWITTER,
  LINKEDIN,
  YOUTUBE,
  WEBSITE,
  DIRECTIONS,
  DISTANCE,
} = ctas;

const ctaFunctions = {
  [PHONE_NUMBER]: (phoneNumber) => {
    window.open(`tel:${phoneNumber}`);
  },
  [WHATSAPP]: (phoneNumber) => {
    window.open(`https://wa.me/${phoneNumber}`);
  },
  [EMAIL]: (email) => {
    window.open(`mailto:${email}`);
  },
  [FACEBOOK]: (facebook) => {
    window.open(`https://www.facebook.com/${facebook}`);
  },
  [INSTAGRAM]: (instagram) => {
    window.open(`https://www.instagram.com/${instagram}`);
  },
  [TWITTER]: (twitter) => {
    window.open(`https://twitter.com/${twitter}`);
  },
  [LINKEDIN]: (linkedin) => {
    window.open(`https://www.linkedin.com/in/${linkedin}`);
  },
  [YOUTUBE]: (youtube) => {
    window.open(`https://www.youtube.com/${youtube}`);
  },
  [WEBSITE]: (website) => {
    window.open(website);
  },
  [DIRECTIONS]: (lat, lng) => {
    if (isIos() || !isMobilePhone()) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`);
    } else {
      window.open(`geo:0,0?q=${lat},${lng}`);
    }
  },
  [DISTANCE]: (address) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`);
  },
};

export const getCTA = (cta) => {
  if (ctaFunctions[cta]) {
    return ctaFunctions[cta];
  }
  // eslint-disable-next-line no-console
  return () => console.log('cta', cta);
};
