import jwt from "jsonwebtoken";

export const APP_SECRET = 'GraphQL-is-aw3some';

export function getTokenPayload(token) {
  return jwt.verify(token, APP_SECRET);
}
