"use server";

import { getDbConnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSummaryAction({
  summaryId,
}: {
  summaryId: string;
}) {
  try {
    const user = await currentUser();
    const sql = await getDbConnection();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const result = await sql`
            DELETE FROM pdf_summaries
            WHERE id = ${summaryId} AND user_id = ${user?.id}
            RETURNING id;
        `;

    if (result.length > 0) {
      revalidatePath("/dashboard");
      return { success: true };
    }
    return { success: false, message: "Summary Not Deleted!" };
  } catch (error) {
    console.error("Error deleting summary:", error);
    return {
      success: false,
      message: "An error occurred while deleting the summary.",
    };
  }
}
