export interface TarotCardDetails {
  keywords: string[];
  full: string;
}

export interface Tarot {
  name: string;
  upright: TarotCardDetails;
  reversed: TarotCardDetails;
}

export class TarotDB {
  // Stores tarot cards -> explanations.
  static tarotDatabase: Record<string, Tarot> = {};

  // Stores tarot cards -> blob urls.
  static tarotImages: Record<string, string> = {};

  static cards() {
    return Object.keys(TarotDB.tarotDatabase);
  }

  static async downloadDB() {
    const jsonURL = "/tarot_database_cn.json";
    await fetch(jsonURL)
      .then((response) => response.json())
      .then((data) => {
        TarotDB.tarotDatabase = data as Record<
          string,
          Tarot
        >;
      });
  }

  static downloadImage = async (card: string) => {
    if (TarotDB.tarotImages[card]) {
      return;
    }

    const urlPrefix = "/img/";
    const urlSuffix = ".webp";

    const imageUrl = urlPrefix + card + urlSuffix;
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    TarotDB.tarotImages[card] = blobUrl;
  };

  static async downloadImages() {
    await Promise.all(
      TarotDB.cards().map(TarotDB.downloadImage)
    );
  }

  static image(card: string) {
    return TarotDB.tarotImages[card];
  }

  static query(key: string) {
    const result = TarotDB.tarotDatabase[key];
    if (!result) {
      return {
        name: "Not found",
        upright: { keywords: [], full: "Not found" },
        reversed: { keywords: [], full: "Not found" },
      };
    }

    return result;
  }
}
