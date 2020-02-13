const MAX_MOBILE_WIDTH = 480;

export const isMobile =
    window.innerWidth < MAX_MOBILE_WIDTH ||
    window.innerHeight < MAX_MOBILE_WIDTH;
