import mongoose, { Schema } from 'mongoose';
import { UserDocument } from 'src/module/user/entities/user.entity';

const UserSchema = new Schema<UserDocument>();

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;
