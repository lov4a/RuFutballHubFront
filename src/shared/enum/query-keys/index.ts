export const EQueryKeys = {
    GET_EXPECTED_POINTS: 'get-expected-points',
    GET_CURRENT_TOUR_NUMBER: 'get-current-tour-number',
} as const;

export type EQueryKeys = (typeof EQueryKeys)[keyof typeof EQueryKeys];