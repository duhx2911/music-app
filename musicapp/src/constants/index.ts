export const LIGHT_DARK = 'dark';

export const ENV_BE = process.env.REACT_APP_URL_BE || 'http://10.0.2.2:8080';
export const ACCESS_TOKEN = 'access-token';
export const REFRESH_TOKEN = 'refresh-token';
export const USER_INFO = 'user-info';
export interface Song {
  id: number;
  genre: string;
  artist: string;
  artwork: string;
  title: string;
  url: string;
  view: number;
  like: number;
}
export interface ILiked {
  id: number;
  id_song: number;
  id_user: number;
  genre: string;
  title: string;
  artwork: string;
  artist: string;
  url: string;
}
export interface Artist {
  id: number;
  name: string;
  avatar_artist: string;
  info: string;
}
