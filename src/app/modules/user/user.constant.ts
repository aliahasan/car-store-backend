export const user_role = {
  admin: 'admin',
  user: 'user',
} as const;

export type TUserRole = keyof typeof user_role;
