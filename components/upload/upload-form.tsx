"use client";
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { toast } from "sonner";
import {
  generatePdfSummary,
  storePdfSummaryAction,
} from "@/actions/upload-actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "./loading-skeleton";

const UploadFormSchema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 50 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine(
      (file) => file.type === "application/pdf",
      "Only PDF files are allowed"
    ),
});

let toastId: string | number;
export default function UploadForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onUploadBegin: (fileName) => {
      // console.log("upload has begun for", fileName);
      toastId = toast.loading(`Uploading ${fileName}`);
    },
    onClientUploadComplete: () => {
      // console.log("uploaded successfully!");
      toast.dismiss(toastId);
    },
    onUploadError: (err) => {
      console.error("error occurred while uploading", err);
      toast.dismiss(toastId);
      toast.error("Error occurred while uploading", {
        description: err.message,
      });
    },
  });

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    form.reset();

    try {
      setIsLoading(true);
      const file = formData.get("file") as File;

      //validating the field using zod
      const validatedFields = UploadFormSchema.safeParse({ file });

      if (!validatedFields.success) {
        const { fieldErrors } = z.flattenError(validatedFields.error);

        toast.error(fieldErrors.file?.[0] ?? "Invalid file", {
          description: "Please select a valid PDF file less than 20MB",
        });
        setIsLoading(false);
        return;
      }

      const resp = await startUpload([file]);
      if (!resp) {
        toast.error("Something went wrong", {
          description: "Please use a different file",
        });
        setIsLoading(false);
        return;
      }

      toastId = toast.loading("Processing PDF", {
        description: "Hang tight! Our AI is reading through your document! ✨",
      });

      const result = await generatePdfSummary(resp[0]);

      if (result?.success === true) {
        toast.dismiss(toastId);
        toast.success("Summary generated successfully!", {
          description: "Hang tight! we are saving your summary! ✨",
        });
        setIsLoading(false);
        // console.log("result", result);

        const storedResult = await storePdfSummaryAction({
          fileUrl: resp[0].serverData.fileUrl,
          fileName: resp[0].serverData.fileName,
          summary: result.data || "",
          title: result.title || "Untitled Document",
        });
        if (storedResult?.success === true) {
          toast.success("Summary saved successfully!", {
            description:
              "Your PDF has been successfully summarized and saved! ✨",
          });
        }
        // console.log("storedResult", storedResult);
        router.push(`/summaries/${storedResult.savedSummary.id}`);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error in handleSubmit:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200 dark:border-gray-800" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-muted-foreground text-sm">
            Upload PDF
          </span>
        </div>
      </div>
      <UploadFormInput isLoading={isLoading} onSubmit={handleSubmit} />
      {isLoading && (
        <>
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-200 dark:border-gray-800" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-muted-foreground text-sm">
                Processing
              </span>
            </div>
          </div>

          <LoadingSkeleton />
        </>
      )}
    </div>
  );
}
