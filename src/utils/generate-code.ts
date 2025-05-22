function getRandom(min = 0, max = 9): number {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function generateCode(): string {
  const list: number[] = [];

  while (list.length < 4) {
    const n: number = getRandom();
    if (!list.includes(n)) list.push(n);
  }

  const generatedCode: string = `${list[0]}${list[1]}${list[2]}${list[3]}`;

  return generatedCode;
}
