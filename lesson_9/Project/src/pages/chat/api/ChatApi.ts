import IChatMessage from "../orm/IChatMessage";

export default class ChatApi {
  static getMessages(): Promise<Array<IChatMessage>> {
    return new Promise((resolve, reject) => {
      fetch('chat.sodes.studio/post')
      .then(r => r.json())
      .then(j => {
        j.data.post_at = new Date(j.data.post_at);
        if(j.data.cite_at) {
          j.data.post_at = new Date(j.data.cite_at);
        }
        resolve(j.data);
      })
      .catch(reject);
    });
  }
}