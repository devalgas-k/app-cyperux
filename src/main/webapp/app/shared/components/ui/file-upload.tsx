"use client"

import * as React from "react"
import { cn } from "@/shared/utils"
import { Upload, X, File, Image, FileText, FileSpreadsheet, FileCode } from "lucide-react"
import { Button } from "./button"

interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  onFilesSelected?: (files: File[]) => void
  accept?: string
  multiple?: boolean
  maxSize?: number // in MB
  maxFiles?: number
  disabled?: boolean
}

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      className,
      onFilesSelected,
      accept = "*",
      multiple = false,
      maxSize = 10,
      maxFiles = 5,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [files, setFiles] = React.useState<File[]>([])
    const [isDragging, setIsDragging] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const getFileIcon = (file: File) => {
      const type = file.type
      if (type.startsWith("image/")) return <Image className="h-4 w-4" />
      if (type.includes("spreadsheet") || type.includes("excel"))
        return <FileSpreadsheet className="h-4 w-4" />
      if (type.includes("pdf") || type.includes("document"))
        return <FileText className="h-4 w-4" />
      if (type.includes("code") || type.includes("javascript") || type.includes("json"))
        return <FileCode className="h-4 w-4" />
      return <File className="h-4 w-4" />
    }

    const formatSize = (bytes: number) => {
      if (bytes < 1024) return bytes + " B"
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
      return (bytes / (1024 * 1024)).toFixed(1) + " MB"
    }

    const handleFiles = (newFiles: FileList | null) => {
      if (!newFiles || disabled) return

      const validFiles = Array.from(newFiles).filter((file) => {
        if (file.size > maxSize * 1024 * 1024) {
          console.warn(`File ${file.name} exceeds ${maxSize}MB limit`)
          return false
        }
        return true
      })

      const updatedFiles = multiple
        ? [...files, ...validFiles].slice(0, maxFiles)
        : validFiles.slice(0, 1)

      setFiles(updatedFiles)
      onFilesSelected?.(updatedFiles)
    }

    const removeFile = (index: number) => {
      const updatedFiles = files.filter((_, i) => i !== index)
      setFiles(updatedFiles)
      onFilesSelected?.(updatedFiles)
    }

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault()
      if (!disabled) setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      handleFiles(e.dataTransfer.files)
    }

    return (
      <div ref={ref} className={cn("space-y-3", className)} {...props}>
        <div
          onClick={() => !disabled && inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 transition-colors cursor-pointer",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
            disabled={disabled}
          />
          <Upload
            className={cn(
              "h-8 w-8",
              isDragging ? "text-primary" : "text-muted-foreground"
            )}
          />
          <div className="text-center">
            <p className="text-sm font-medium">
              Glissez vos fichiers ici ou cliquez pour parcourir
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Max {maxSize}MB par fichier
              {multiple && ` - ${maxFiles} fichiers maximum`}
            </p>
          </div>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg border bg-muted/30 p-2"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded bg-muted">
                  {getFileIcon(file)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatSize(file.size)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 shrink-0"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
)
FileUpload.displayName = "FileUpload"

export { FileUpload }
