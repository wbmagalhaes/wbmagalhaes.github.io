export const COVER_INTRO_DURATION = 1.5;

const SOCIAL_LEAD = 0.6;
const SOCIAL_STAGGER = 0.2;

export function socialItemDelay(index: number) {
  return COVER_INTRO_DURATION + SOCIAL_LEAD + index * SOCIAL_STAGGER;
}

export function emailBannerDelay(socialCount: number) {
  return socialItemDelay(socialCount);
}
