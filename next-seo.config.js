const title = "Pond – An intimate relationtip with  machines";
const description =
  "A quiet place for listening to modular music and discover artists";

const SEO = {
  title,
  description,
  canonical: "https://pond.rest",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://pond.rest",
    title,
    description,
    images: [
      {
        url: "https://pond.rest/og.png",
        alt: title,
        width: 1280,
        height: 720,
      },
    ],
  },
};

export default SEO;
