/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface Tuser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}
export interface TuserModel extends Model<Tuser> {
  isUserExistsByCustomId(id: string): Promise<Tuser>;
  isUserDeletedByCustomId(id: string): Promise<Tuser>;
  isUserPasswordMatched(password: string, id: string): Promise<boolean>;
  isUserBlocked(id: string): Promise<boolean>;
}
// export interface TuserModel extends Model<Tuser> {}
export type TuserRole = keyof typeof USER_ROLE;
