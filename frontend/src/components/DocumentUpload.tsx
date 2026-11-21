
import { useRef, useState } from "react";
import { Camera, FileVideo, Image, X } from "lucide-react";
import { Alert } from "@/components/ui";

const MAX_FILE_SIZE = 25 * 1024 * 1024;

const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/webm",
];

interface DocumentUploadProps {
  files: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
}

export default function DocumentUpload({
  files,
  onChange,
  maxFiles = 5,
}: DocumentUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    setError("");

    const newFiles = Array.from(selectedFiles);

    for (const file of newFiles) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError(`${file.name}: Unsupported file format.`);
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setError(`${file.name}: File size must not exceed 25 MB.`);
        return;
      }
    }

    if (files.length + newFiles.length > maxFiles) {
      setError(`You can upload a maximum of ${maxFiles} files.`);
      return;
    }

    onChange([...files, ...newFiles]);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
    setError("");
  };

  return (
    <div className="space-y-4">
      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
      >
        <Camera className="h-9 w-9 mx-auto mb-3 text-muted" />

        <p className="font-medium text-sm">
          Click to upload photos or videos
        </p>

        <p className="text-xs text-muted mt-2">
          JPG, PNG, WebP, MP4, WebM · Maximum 25 MB per file
        </p>

        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.mp4,.webm"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">
            Selected files ({files.length}/{maxFiles})
          </p>

          {files.map((file, index) => (
            <div
              key={`${file.name}-${file.lastModified}-${index}`}
              className="flex items-center justify-between rounded-md border border-border p-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                {file.type.startsWith("video/") ? (
                  <FileVideo className="h-5 w-5 text-primary shrink-0" />
                ) : (
                  <Image className="h-5 w-5 text-primary shrink-0" />
                )}

                <div className="min-w-0">
                  <p className="text-sm truncate">
                    {file.name}
                  </p>

                  <p className="text-xs text-muted">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeFile(index)}
                className="p-2 text-danger hover:bg-danger/10 rounded-md"
                aria-label={`Remove ${file.name}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
