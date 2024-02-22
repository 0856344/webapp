export const PACKAGES_SHORT_FORMS = {
  employee: 'MITARBEITER',
  smart_garage: 'SG',
  smart_garage_corporate: 'SG_CORP',
  digi: 'SG+DT',
  digi_corporate: 'SG+DT_CORP',
  grand: 'SG+ALL',
  grand_corporate: 'SG+ALL_CORP',
  grand_education: 'SG+ALL_EDU',
  grand_club: 'SG+ALL_VEREIN',
  metal: 'SG+MW',
  discount: 'DISCOUNT',
  credits_500: '500_CREDITS',
  credits_500_discounted: '500_CREDITS_DISCOUNTED',
};

export const FABMAN_BOOKING_STATE = {
  pending: 'pending',
  cancelled: 'cancelled',
  confirmed: 'confirmed',
};

export const FABMAN_DEFAULT_SPACE = {
  earliestHour: 9,
  latestHour: 24,
  hiddenWeekdays: [1,7], // Monday and Sunday
  bookingExclusiveMinutes: 15,
  bookingLockInHours: 24,
  bookingMaxMinutesPerMemberDay: 60,
  bookingMaxMinutesPerMemberWeek: 180,
  bookingRefundable: true,
  bookingSlotsPerHour: 1, // 1 = 60min, 2 = 30min, 3 = 20min, 4 = 15min
  bookingTermsOfService: null,
  bookingWindowMaxDays: 30,
  bookingWindowMinHours: 2
};
