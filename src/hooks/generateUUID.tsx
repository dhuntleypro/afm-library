// import { v4 as uuidv4 } from 'uuid';
// const uuid = uuidv4(); // Generate the UUID

// generateUUID.ts
export const generateUUID = (idLength: number): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < idLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};