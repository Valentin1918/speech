import {parseContent} from "../utils/parseContent";

export const fetchSentences = async () => {
  const apiHost = location.href.replace(location.port, '5174');
  const reply= await fetch(`${apiHost}content`);
  const {content} = await reply.json();
  return parseContent(content);
}
