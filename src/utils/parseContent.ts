export const parseContent = (content: string) =>
  content.replace('</speak>', '').replace('<speak>', '').split('</s>').reduce((acc: Array<string>, v: string) => {
    if (v.match('^<s>[\\s\\S]+')) {
      acc.push(v.replace('<s>', ''));
    } else if (v.includes('<s>')) {
      const placement = v.indexOf('<s>');
      acc.push(v.slice(placement).replace('<s>', ''));
    }
    return acc;
  }, []);