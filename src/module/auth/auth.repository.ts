import { db } from "#prisma/db.js";

export type CreateRefreshTokenData = Pick<
  Parameters<typeof db.orm.public.RefreshToken.create>[0],
  "userId" | "tokenHash" | "expiresAt"
>;
const createRefreshToken = (data: CreateRefreshTokenData) => {
  return db.orm.public.RefreshToken.create(data);
};
const findRefreshToken = (tokenHash: string) => {
  return db.orm.public.RefreshToken.where({ tokenHash }).first();
};
const revokeRefreshToken = (tokenHash: string) => {
  return db.orm.public.RefreshToken.where({ tokenHash }).update({
    revokedAt: new Date().toISOString(),
  });
};
export const authRepository = {
  createRefreshToken,
  findRefreshToken,
  revokeRefreshToken,
};
