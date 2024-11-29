import { request } from '../utils/index.js'

export const getListDetail = params =>
  request.get('/playlist/detail', { params })
