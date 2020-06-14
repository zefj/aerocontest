export interface LoadTrackAction {
    type: 'LOAD_TRACK',
    payload: {
        content: string,
    },
}

export const loadTrack = (content: string): LoadTrackAction => ({
    type: 'LOAD_TRACK',
    payload: { content }
});
