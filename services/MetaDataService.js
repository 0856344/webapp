export { getMetaTagsForPage };

/**
 *
 * @param page
 * @returns {{meta: [{hid: string, name: string, content: *}, {hid: string, property: string, content: string}, {hid: string, name: string, content: *}, {hid: string, property: string, content: string}], title: string}}
 */
function getMetaTagsForPage(page) {
  //
  // get image for og:image (preview for sharing page)
  let image = "";
  switch (true) {
    case page.body !== undefined &&
      page.body["0"].slides !== undefined &&
      page.body["0"].slides["0"] !== undefined &&
      page.body["0"].slides["0"].image !== undefined:
      image = "https:" + page.body["0"].slides["0"].image;
      break;
    case page.body !== undefined && page.body["0"].image !== undefined:
      image = "https:" + page.body["0"].image;
      break;
    case page.image !== undefined:
      image = "https:" + page.image;
      break;
    case page.content !== undefined && page.content.Image !== undefined:
      image = "https:" + page.content.Image;
      break;
    case page.content !== undefined && page.content.image !== undefined:
      image = "https:" + page.content.image;
      break;
  }
  // get title for page & og:title
  let metaTitle = "";
  switch (true) {
    case page?.content?.metadata?.title !== undefined &&
      typeof page?.content?.metadata?.title === "string" &&
      page?.content?.metadata?.title !== "":
      metaTitle = page?.content?.metadata?.title;
      break;
    case page?.metadata?.title !== undefined && page?.metadata?.title !== "":
      metaTitle = page.metadata.title;
      break;
    case page.subtitle !== undefined && page.subtitle !== "":
      metaTitle = "GRAND GARAGE - " + page.subtitle;
      break;
    case page.title !== undefined && page.title !== "":
      metaTitle = "GRAND GARAGE - " + page.metadata.title;
      break;
    case page.content !== undefined &&
      page?.content?.Title !== undefined &&
      page?.content?.Title !== "":
      metaTitle = "GRAND GARAGE - " + page.content.Title;
      break;
    case page.name !== undefined && page?.name !== "":
      metaTitle = "GRAND GARAGE - " + page.name;
      break;
    default:
      metaTitle = "GRAND GARAGE";
  }

  // get description for meta description & og:description
  let metaDescription = "";
  switch (true) {
    case page?.content?.metadata?.description !== undefined &&
      typeof page?.content?.metadata?.description === "string" &&
      page?.content?.metadata?.description !== "":
      metaDescription = page?.content?.metadata?.description;
      break;
    case page.metadata !== undefined &&
      typeof page.metadata === "string" &&
      page.metadata !== "":
      metaDescription = page.metadata;
      break;
    case page?.metadata?.description !== undefined &&
      page.metadata?.description !== "":
      metaDescription = page?.metadata?.description;
      break;
    case page.teaser !== undefined && page.teaser !== "":
      metaDescription = page.teaser;
      break;
    case page.content !== undefined &&
      page.content.Teaser !== undefined &&
      page.content.Teaser !== "":
      metaDescription = page.content.Teaser;
      break;
    case page.content !== undefined &&
      page.content.text !== undefined &&
      page.content.text !== "":
      metaDescription = page.content.text;
      break;
    default:
      metaDescription =
        "Ein Makerspace in der Tabakfabrik Linz. Von der Schweißwerkstatt über CNC-Fräsen bis hin zu 3D-Druckern ist alles in unserer Werkstatt vorhanden.";
  }
  return {
    title: metaTitle,
    meta: [
      { hid: "description", name: "description", content: metaDescription },
      { hid: "og:image", property: "og:image", content: image },
      {
        hid: "og:description",
        name: "og:description",
        content: metaDescription,
      },
      { hid: "og:title", property: "og:title", content: metaTitle },
    ],
  };
}
