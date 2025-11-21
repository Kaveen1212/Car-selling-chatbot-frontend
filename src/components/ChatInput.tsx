import { useRef, useState } from "react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

interface UploadedFile {
  file: File;
  preview?: string;
}

export default function ChatInput({ value, onChange, onSubmit }: ChatInputProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
      // Clear uploaded files after submit
      uploadedFiles.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
      setUploadedFiles([]);
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = '84px';
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      // Create preview URL for images
      if (file.type.startsWith('image/')) {
        const previewUrl = URL.createObjectURL(file);
        setUploadedFiles(prev => [...prev, { file, preview: previewUrl }]);
      } else {
        setUploadedFiles(prev => [...prev, { file }]);
      }
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => {
      const newFiles = [...prev];
      if (newFiles[index].preview) {
        URL.revokeObjectURL(newFiles[index].preview!);
      }
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    onChange(textarea.value);

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';

    // Calculate line height (24px per line)
    const lineHeight = 24;
    const minHeight = 84; // Normal starting height
    const maxLines = 16;
    const maxHeight = lineHeight * maxLines;

    // Set height based on content, but maintain minimum of 84px and cap at max height
    const newHeight = Math.max(minHeight, Math.min(textarea.scrollHeight, maxHeight));
    textarea.style.height = `${newHeight}px`;
  };

  return (
    <div className="mt-auto w-full bg-transparent px-4 pb-4">
      <div className="max-w-2xl lg:max-w-2xl xl:max-w-3xl mx-auto">
        <div className="relative flex items-end gap-2 bg-bg-300 border border-border-300 rounded-xl px-3 py-2.5 shadow-sm">
          {/* Left icons */}
          <div className="flex items-center gap-1 flex-shrink-0 self-end">
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,.xls,.png,.jpg,.jpeg,.gif"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-8 h-8 rounded-md hover:bg-bg-200 flex items-center justify-center text-text-300 hover:text-text-100 transition-colors"
              aria-label="Upload document"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="How can I help you today?"
            className="flex-1 bg-transparent text-text-100 text-sm -ml-8 placeholder:text-text-400 resize-none outline-none min-h-[84px] max-h-[384px] leading-6 overflow-y-auto"
            rows={1}
            style={{ height: '84px' }}
          />

          {/* Right side buttons */}
          <div className="flex items-center gap-2 flex-shrink-0 self-end">
            {/* Send button */}
            <button
              onClick={onSubmit}
              disabled={!value.trim()}
              className="w-8 h-8 rounded-md bg-[#c6613f] hover:bg-[#df5b2f] disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all active:scale-95"
              aria-label="Send message"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Uploaded files preview */}
        {uploadedFiles.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {uploadedFiles.map((uploadedFile, index) => (
              <div
                key={index}
                className="relative group bg-bg-200 border border-border-300 rounded-lg overflow-hidden"
              >
                {uploadedFile.preview ? (
                  // Image preview
                  <div className="relative w-24 h-24">
                    <img
                      src={uploadedFile.preview}
                      alt={uploadedFile.file.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute top-1 right-1 w-5 h-5 bg-bg-100 hover:bg-bg-300 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove file"
                    >
                      <svg className="w-3 h-3 text-text-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  // Document preview
                  <div className="relative w-24 h-24 flex flex-col items-center justify-center p-2">
                    <svg className="w-8 h-8 text-text-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-xs text-text-300 mt-1 text-center truncate w-full">
                      {uploadedFile.file.name}
                    </span>
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute top-1 right-1 w-5 h-5 bg-bg-100 hover:bg-bg-300 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove file"
                    >
                      <svg className="w-3 h-3 text-text-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <p className="mt-2 text-xs text-text-400 text-center">
          <span className="text-[#c6613f] font-bold">Rama</span>DBK can make mistakes. Please double-check responses.
        </p>
      </div>
    </div>
  );
}
