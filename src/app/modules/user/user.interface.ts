import { Model } from 'mongoose';

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
  isUserPasswordMatched(id: string): Promise<Tuser>;
  isUserBlocked(id: string): Promise<Tuser>;
}
// export interface TuserModel extends Model<Tuser> {}
