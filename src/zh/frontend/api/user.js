import { requestWithoutLoading } from '../utils/index.js'

export const getUserDetail = (uid) => requestWithoutLoading.get("/user/detail", { params: { uid } })

const PLAYLIST_LIMIT = 1000
export const getUserPlaylist = (uid) => requestWithoutLoading.get("/user/playlist", { params: { uid, limit: PLAYLIST_LIMIT } })
