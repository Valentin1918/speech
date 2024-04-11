export const makeRanges = (sentences: Array<string>) =>
  sentences.reduce((acc: Array<{ from: number, to: number }>, v: string, i) => {

    let content = {
      from: 0,
      to: v.length,
    }

    if (i) {
      const spaceLength = 1;
      const from = acc[i - 1].to + spaceLength;
      content = {
        from,
        to: from + v.length
      }
    }

    acc.push(content);
    return acc;
  }, []);