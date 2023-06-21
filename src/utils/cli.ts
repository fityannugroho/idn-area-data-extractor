import readline from 'readline';

/**
 * Get input from command line.
 * @param question The question to ask.
 * @returns The answer.
 */
export const input = async (question: string) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const result = await new Promise<string>((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });

  rl.close();
  return result;
};

/**
 * Check if the answer is yes ('y', 'yes', or with upper case version).
 * @param answer The input answer
 * @returns
 */
export const isYes = (answer: string) => {
  const yes = ['y', 'yes'];

  if (yes.includes(answer.toLowerCase())) {
    return true;
  }

  return false;
};
