import React, { useState, useEffect } from "react";
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
import { ClassAssignmentEnum } from "@/app/data/enum/ClassAssignmentEnum";

interface AddDocumentMaterialProps {
  type?: ClassAssignmentEnum;
  open: boolean;
  classSectionId: string;
  onOpenChange: (open: boolean) => void;
  onSave: (materialData: {
    title: string;
    description?: string;
    file?: File;
    link?: string;
    deadline?: string;
    type: ClassAssignmentEnum;
    classSectionId: string;
  }) => void;
}

export default function AddMaterialItem({
  type,
  open,
  classSectionId,
  onOpenChange,
  onSave,
}: AddDocumentMaterialProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [deadline, setDeadline] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [materialType, setMaterialType] = useState<ClassAssignmentEnum>(
    ClassAssignmentEnum.DOCUMENT
  );
  const [dragActive, setDragActive] = useState(false);

  // Auto-select the type if provided as prop
  useEffect(() => {
    if (type) {
      setMaterialType(type);
    }
  }, [type]);

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
    if (materialType === ClassAssignmentEnum.LINK && !link.trim()) return;

    const formatToDDMMYYYY = (value: string) => {
      // Expecting input like YYYY-MM-DD from <input type="date">
      const m = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (m) {
        return `${m[3]}/${m[2]}/${m[1]}`;
      }
      // If already DD/MM/YYYY, return as-is
      const dmy = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      if (dmy) return value;
      // Fallback: try Date parse and format
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        const dd = String(d.getDate()).padStart(2, "0");
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const yyyy = d.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
      }
      return value;
    };

    const formattedDeadline = deadline ? formatToDDMMYYYY(deadline) : undefined;

    onSave({
      title: title.trim(),
      description: description.trim() || undefined,
      file: selectedFile || undefined,
      link: materialType === ClassAssignmentEnum.LINK ? link.trim() : undefined,
      deadline: formattedDeadline,
      type: materialType,
      classSectionId: classSectionId,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setLink("");
    setDeadline("");
    setSelectedFile(null);
    setMaterialType(type || ClassAssignmentEnum.DOCUMENT);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setLink("");
    setDeadline("");
    setSelectedFile(null);
    setMaterialType(type || ClassAssignmentEnum.DOCUMENT);
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
          {!type && (
            <div className='space-y-3'>
              <Label className='text-sm font-medium'>Material Type</Label>
              <div className='grid grid-cols-2 gap-2'>
                <Button
                  type='button'
                  variant={
                    materialType === ClassAssignmentEnum.DOCUMENT
                      ? "default"
                      : "outline"
                  }
                  size='sm'
                  onClick={() => setMaterialType(ClassAssignmentEnum.DOCUMENT)}
                  className='justify-start'>
                  <FileText className='h-4 w-4 mr-2' />
                  Document
                </Button>
                <Button
                  type='button'
                  variant={
                    materialType === ClassAssignmentEnum.ANNOUNCEMENT
                      ? "default"
                      : "outline"
                  }
                  size='sm'
                  onClick={() =>
                    setMaterialType(ClassAssignmentEnum.ANNOUNCEMENT)
                  }
                  className='justify-start'>
                  <FileText className='h-4 w-4 mr-2' />
                  Announcement
                </Button>
                <Button
                  type='button'
                  variant={
                    materialType === ClassAssignmentEnum.SUBMISSION
                      ? "default"
                      : "outline"
                  }
                  size='sm'
                  onClick={() =>
                    setMaterialType(ClassAssignmentEnum.SUBMISSION)
                  }
                  className='justify-start'>
                  <BookOpen className='h-4 w-4 mr-2' />
                  Assignment
                </Button>
                <Button
                  type='button'
                  variant={
                    materialType === ClassAssignmentEnum.LINK
                      ? "default"
                      : "outline"
                  }
                  size='sm'
                  onClick={() => setMaterialType(ClassAssignmentEnum.LINK)}
                  className='justify-start'>
                  <Link className='h-4 w-4 mr-2' />
                  Link
                </Button>
              </div>
            </div>
          )}

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
          {materialType === ClassAssignmentEnum.LINK && (
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

          {/* Deadline Input - Show for submission and announcement types */}
          {(materialType === ClassAssignmentEnum.SUBMISSION ||
            materialType === ClassAssignmentEnum.ANNOUNCEMENT) && (
            <div className='space-y-2'>
              <Label htmlFor='deadline' className='text-sm font-medium'>
                Deadline
              </Label>
              <div className='relative'>
                <Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400' />
                <Input
                  id='deadline'
                  type='date'
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className='w-full pl-10'
                />
              </div>
            </div>
          )}

          {/* Description Input - Not for link type */}
          {materialType !== ClassAssignmentEnum.LINK && (
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
          {materialType !== ClassAssignmentEnum.LINK && (
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
              (materialType === ClassAssignmentEnum.LINK && !link.trim()) ||
              (materialType === ClassAssignmentEnum.DOCUMENT &&
                !selectedFile) ||
              (materialType === ClassAssignmentEnum.ANNOUNCEMENT &&
                !description.trim()) ||
              (materialType === ClassAssignmentEnum.DOCUMENT && !selectedFile)
            }>
            Add Material
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
