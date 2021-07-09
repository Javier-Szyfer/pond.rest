const title = "Pond – An intimate relationship with machines";
const description =
  "A quiet place for listening to modular synth music and discover artists";

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
        url: "https://pond.rest/og2.png",
        alt: title,
        width: 1280,
        height: 720,
      },
    ],
  },
};

export default SEO;
