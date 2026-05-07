import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";

export async function fetchAndExtractPdfText(fileUrl: string) {
  // console.log("Fetching URL:", fileUrl);
  const response = await fetch(fileUrl);
  const blob = await response.blob();

  const loader = new WebPDFLoader(blob);
  const docs = await loader.load();

  return docs.map((doc) => doc.pageContent).join("\n");
}
