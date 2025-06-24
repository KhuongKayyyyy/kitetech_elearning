import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  Upload,
  X,
  File,
  Image,
  Video,
  Music,
  BookOpen,
  Link,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AddDocumentMaterialProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (materialData: {
    title: string;
    description?: string;
    file?: File;
    link?: string;
    deadline?: string;
    type: "document" | "announcement" | "submission" | "link";
  }) => void;
}

export default function AddMaterialItem({
  open,
  onOpenChange,
  onSave,
}: AddDocumentMaterialProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [deadline, setDeadline] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [materialType, setMaterialType] = useState<
    "document" | "announcement" | "submission" | "link"
  >("document");
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const getFileIcon = (file: File) => {
    const type = file.type;
    if (type.startsWith("image/")) return <Image className='h-5 w-5' />;
    if (type.startsWith("video/")) return <Video className='h-5 w-5' />;
    if (type.startsWith("audio/")) return <Music className='h-5 w-5' />;
    return <File className='h-5 w-5' />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleSave = () => {
    if (!title.trim()) return;
    if (materialType === "link" && !link.trim()) return;

    onSave({
      title: title.trim(),
      description: description.trim() || undefined,
      file: selectedFile || undefined,
      link: materialType === "link" ? link.trim() : undefined,
      deadline:
        materialType === "submission" && deadline ? deadline : undefined,
      type: materialType,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setLink("");
    setDeadline("");
    setSelectedFile(null);
    setMaterialType("document");
    onOpenChange(false);
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setLink("");
    setDeadline("");
    setSelectedFile(null);
    setMaterialType("document");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <FileText className='h-5 w-5' />
            Add Material
          </DialogTitle>
          <DialogDescription>
            Create a new material for this section. You can add documents,
            announcements, assignments or links.
          </DialogDescription>
        </DialogHeader>

        <div className='grid gap-6 py-4'>
          {/* Material Type Selection */}
          <div className='space-y-3'>
            <Label className='text-sm font-medium'>Material Type</Label>
            <div className='grid grid-cols-2 gap-2'>
              <Button
                type='button'
                variant={materialType === "document" ? "default" : "outline"}
                size='sm'
                onClick={() => setMaterialType("document")}
                className='justify-start'>
                <FileText className='h-4 w-4 mr-2' />
                Document
              </Button>
              <Button
                type='button'
                variant={
                  materialType === "announcement" ? "default" : "outline"
                }
                size='sm'
                onClick={() => setMaterialType("announcement")}
                className='justify-start'>
                <FileText className='h-4 w-4 mr-2' />
                Announcement
              </Button>
              <Button
                type='button'
                variant={materialType === "submission" ? "default" : "outline"}
                size='sm'
                onClick={() => setMaterialType("submission")}
                className='justify-start'>
                <BookOpen className='h-4 w-4 mr-2' />
                Assignment
              </Button>
              <Button
                type='button'
                variant={materialType === "link" ? "default" : "outline"}
                size='sm'
                onClick={() => setMaterialType("link")}
                className='justify-start'>
                <Link className='h-4 w-4 mr-2' />
                Link
              </Button>
            </div>
          </div>

          {/* Title Input */}
          <div className='space-y-2'>
            <Label htmlFor='title' className='text-sm font-medium'>
              Title *
            </Label>
            <Input
              id='title'
              placeholder='Enter material title...'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full'
            />
          </div>

          {/* Link Input - Only for link type */}
          {materialType === "link" && (
            <div className='space-y-2'>
              <Label htmlFor='link' className='text-sm font-medium'>
                Link *
              </Label>
              <Input
                id='link'
                placeholder='Enter URL (e.g., https://example.com)...'
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className='w-full'
                type='url'
              />
            </div>
          )}

          {/* Deadline Input - Only for submission type */}
          {materialType === "submission" && (
            <div className='space-y-2'>
              <Label htmlFor='deadline' className='text-sm font-medium'>
                Deadline
              </Label>
              <div className='relative'>
                <Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400' />
                <Input
                  id='deadline'
                  type='datetime-local'
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className='w-full pl-10'
                />
              </div>
            </div>
          )}

          {/* Description Input - Not for link type */}
          {materialType !== "link" && (
            <div className='space-y-2'>
              <Label htmlFor='description' className='text-sm font-medium'>
                Description
              </Label>
              <Textarea
                id='description'
                placeholder='Provide additional details about this material...'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='w-full min-h-[100px] resize-none'
              />
            </div>
          )}

          {/* File Upload Area - Not for link type */}
          {materialType !== "link" && (
            <div className='space-y-2'>
              <Label className='text-sm font-medium'>
                Attachment (Optional)
              </Label>
              <div
                className={cn(
                  "relative border-2 border-dashed rounded-lg p-6 transition-colors",
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-neutral-300 dark:border-neutral-600 hover:border-primary"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}>
                <input
                  type='file'
                  className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                  onChange={handleFileInputChange}
                  accept='.pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.mp4,.mp3'
                />

                {selectedFile ? (
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <div className='p-2 bg-primary/10 rounded-lg text-primary'>
                        {getFileIcon(selectedFile)}
                      </div>
                      <div>
                        <p className='text-sm font-medium text-neutral-900 dark:text-neutral-100'>
                          {selectedFile.name}
                        </p>
                        <p className='text-xs text-neutral-500 dark:text-neutral-400'>
                          {formatFileSize(selectedFile.size)}
                        </p>
                      </div>
                    </div>
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                      }}
                      className='text-neutral-500 hover:text-red-500'>
                      <X className='h-4 w-4' />
                    </Button>
                  </div>
                ) : (
                  <div className='text-center'>
                    <Upload className='mx-auto h-8 w-8 text-neutral-400 mb-2' />
                    <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                      <span className='font-medium text-primary cursor-pointer hover:underline'>
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className='text-xs text-neutral-500 dark:text-neutral-500 mt-1'>
                      PDF, DOC, TXT, images, videos, audio files
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className='gap-2'>
          <Button type='button' variant='outline' onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type='button'
            onClick={handleSave}
            disabled={
              !title.trim() ||
              (materialType === "link" && !link.trim()) ||
              (materialType === "submission" && !deadline.trim()) ||
              (materialType === "document" && !selectedFile) ||
              (materialType === "announcement" && !description.trim()) ||
              (materialType === "submission" && !deadline.trim()) ||
              (materialType === "document" && !selectedFile)
            }>
            Add Material
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
