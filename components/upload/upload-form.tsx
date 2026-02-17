"use client";
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { toast } from "sonner";

const UploadFormSchema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine(
      (file) => file.type === "application/pdf",
      "Only PDF files are allowed"
    ),
});

let toastId: string | number;
export default function UploadForm() {
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onUploadBegin: (fileName) => {
      console.log("upload has begun for", fileName);
      toastId = toast.loading(`Uploading ${fileName}`);
    },
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
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
    const file = formData.get("file") as File;
    // console.log("File:", file);

    //validating the field using zod
    const validatedFields = UploadFormSchema.safeParse({ file });

    if (!validatedFields.success) {
      const { fieldErrors } = z.flattenError(validatedFields.error);

      // console.log(fieldErrors.file?.[0] ?? "Invalid file");

      toast.error(fieldErrors.file?.[0] ?? "Invalid file", {
        description: "Please select a valid PDF file less than 20MB",
      });
      return;
    }

    const resp = await startUpload([file]);
    if (!resp) {
      toast.error("Something went wrong", {
        description: "Please use a different file",
      });
      return;
    }

    toastId = toast.loading("Processing PDF", {
      description: "Hang tight! Our AI is reading through your document! ✨",
    });

    setTimeout(() => {
      toast.dismiss(toastId);
    }, 5000);
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
