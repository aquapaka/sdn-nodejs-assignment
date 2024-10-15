import bcrypt from "bcrypt";

const saltRounds = 10;

export async function encrypt(string) {
  return await bcrypt.hash(string, saltRounds);
}

export async function check(string, encrypt) {
  return await bcrypt.compare(string, encrypt);
}
