"use server";

import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGeminiAI } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function generatePdfSummary(uploadResponse: {
  serverData: {
    userId: string;
    fileUrl: string;
    fileName: string;
  };
}) {
  if (!uploadResponse || !uploadResponse?.serverData?.fileUrl) {
    return {
      success: false,
      message: "File Upload Failed",
      data: null,
    };
  }
  try {
    const pdfText = await fetchAndExtractPdfText(
      uploadResponse.serverData.fileUrl
    );
    // console.log("pdfText", pdfText);
    let summary = "";
    try {
      summary = await generateSummaryFromGeminiAI(pdfText);
    } catch (error) {
      console.log("error in upload-action", error);
    }
    if (!summary) {
      return {
        success: false,
        message: "Summary Generation Failed",
        data: null,
      };
    }

    const formattedFileName = formatFileNameAsTitle(
      uploadResponse.serverData.fileName
    );

    return {
      success: true,
      message: "Summary Generated Successfully",
      data: summary,
      title: formattedFileName,
    };
  } catch (error) {
    return {
      success: false,
      message: "File Upload Failed",
      data: null,
    };
  }
}

async function savePdfSummary({
  userId,
  fileUrl,
  fileName,
  summary,
  title,
}: {
  userId: string;
  fileUrl: string;
  fileName: string;
  summary: string;
  title: string;
}) {
  try {
    const sql = await getDbConnection();

    const result = await sql`
      INSERT INTO pdf_summaries (
        user_id,
        original_file_url,
        summary_text,
        title,
        file_name
      ) VALUES (
        ${userId},
        ${fileUrl},
        ${summary},
        ${title},
        ${fileName}
      )
      RETURNING *;
    `;

    return result[0];
  } catch (error) {
    console.error("Error saving PDF summary:", error);
    throw error;
  }
}

export async function storePdfSummaryAction({
  fileUrl,
  fileName,
  summary,
  title,
}: {
  fileUrl: string;
  fileName: string;
  summary: string;
  title: string;
}) {
  let savedSummary: any;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }
    savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!savedSummary) {
      return {
        success: false,
        message: "Failed to save PDF summary",
      };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error saving PDF summary",
    };
  }

  revalidatePath(`/summaries/${savedSummary.id}`);
  return {
    success: true,
    message: "PDF summary saved successfully",
    savedSummary,
  };
}
