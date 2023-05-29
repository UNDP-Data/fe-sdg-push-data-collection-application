export const GenerateRandomString = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomString = '[GOV]';

  for (let i = 0; i < 3; i += 1) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }

  randomString += '_';

  for (let i = 0; i < 3; i += 1) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }

  randomString += '_';
  for (let i = 0; i < 4; i += 1) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }
  return randomString;
};
