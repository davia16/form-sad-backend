import * as bcrypt from 'bcrypt';

export async function criptPassword(password: string): Promise<string> {
  const saltRounds = await bcrypt.genSalt();
  return bcrypt.hashSync(password, saltRounds);
}

export async function decriptPassword(
  password: string,
  hashPassword: string,
): Promise<boolean> {
  return bcrypt.compareSync(password, hashPassword);
}
