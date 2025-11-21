import { useState, useRef } from "react";
import { Message } from "../types";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

interface MainAreaProps {
  messages: Message[];
  onMessagesChange: (messages: Message[]) => void;
}

interface UploadedFile {
  file: File;
  preview?: string;
}

export default function MainArea({ messages, onMessagesChange }: MainAreaProps) {
  const [inputValue, setInputValue] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      // Revoke the preview URL to free memory
      if (newFiles[index].preview) {
        URL.revokeObjectURL(newFiles[index].preview!);
      }
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    setInputValue(textarea.value);

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

  const handleSubmit = () => {
    if (!inputValue.trim()) return;

    // Reset textarea height after submit
    if (textareaRef.current) {
      textareaRef.current.style.height = '84px';
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
    };

    onMessagesChange([...messages, newMessage]);
    setInputValue("");

    // Clear uploaded files after submit
    uploadedFiles.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    setUploadedFiles([]);

    // Add hardcoded assistant response
    setTimeout(() => {
      const userInput = inputValue.toLowerCase().trim();

      // Check if user typed "card" to show car card
      if (userInput === "card") {
        const allCars = [
          {
            name: "Toyota Corolla Axio",
            oldPrice: 1450,
            newPrice: 1150,
            rating: 4,
            reviewCount: 12,
            description: "The Toyota Corolla Axio is a sophisticated compact sedan that exemplifies Toyota's commitment to quality, reliability, and fuel efficiency. This 4-door sedan measures 4360×1695×1485mm, offering a perfect balance of compact maneuverability and spacious comfort for up to 5 passengers.",
            images: [
              "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=200&h=150&fit=crop",
              "https://images.unsplash.com/photo-1619976215249-2b0b0f0b99e3?w=200&h=150&fit=crop",
              "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200&h=150&fit=crop",
              "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=200&h=150&fit=crop"
            ]
          },
          {
            name: "Honda Civic",
            oldPrice: 1800,
            newPrice: 1500,
            rating: 5,
            reviewCount: 24,
            description: "The Honda Civic is a reliable and fuel-efficient compact car known for its sporty design and advanced technology features. Perfect for daily commuting with excellent handling and a comfortable interior that seats up to 5 passengers.",
            images: [
              "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=200&h=150&fit=crop",
              "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=200&h=150&fit=crop",
              "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=200&h=150&fit=crop",
              "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=200&h=150&fit=crop"
            ]
          },
          {
            name: "BMW 3 Series",
            oldPrice: 3500,
            newPrice: 3200,
            rating: 5,
            reviewCount: 45,
            description: "The BMW 3 Series combines luxury with performance, offering a premium driving experience. This sports sedan features cutting-edge technology, elegant design, and powerful engine options that deliver an exhilarating ride.",
            images: [
              "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=200&h=150&fit=crop",
              "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=200&h=150&fit=crop",
              "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=200&h=150&fit=crop",
              "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=200&h=150&fit=crop"
            ]
          }
        ];

        const carCardMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "",
          type: "card",
          allCards: allCars,
          currentCardIndex: 0,
          cardData: allCars[0]
        };

        onMessagesChange([...messages, newMessage, carCardMessage]);
      } else if (userInput === "shipping" || userInput.includes("ship") || userInput.includes("location") || userInput.includes("deliver")) {
        // Show shipping location map
        const mapMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "",
          type: "map",
          locationData: {
            name: "Main Distribution Center",
            address: "1234 Harbor Boulevard",
            city: "Los Angeles",
            country: "United States",
            latitude: 34.0522,
            longitude: -118.2437,
            shippingInfo: "We ship from our Los Angeles distribution center to all 50 states. Standard shipping takes 5-7 business days. Express shipping (2-3 days) is available for an additional fee. Free shipping on orders over $50."
          }
        };

        onMessagesChange([...messages, newMessage, mapMessage]);
      } else if (userInput === "image" || userInput.includes("image")) {
        // Show vehicle images
        const imageMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "",
          type: "image",
          imageData: {
            images: [
              "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop"
            ],
            vehicleName: "Premium Sports Car Collection",
            aspectRatio: "16:9"
          }
        };

        onMessagesChange([...messages, newMessage, imageMessage]);
      } else {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Hello! I'm Claude, your AI assistant. I received your message and I'm here to help. This is a hardcoded response for demonstration purposes.",
        };

        onMessagesChange([...messages, newMessage, assistantMessage]);
      }
    }, 500);

    console.log("Message sent:", inputValue);
  };

  // Check if we have any messages (conversation started)
  const hasMessages = messages.length > 0;

  return (
    <main className="flex-1 flex flex-col bg-transparent h-screen overflow-hidden">
      {/* Content area */}
      {!hasMessages ? (
        /* Empty state - input stays centered while typing */
        <>
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <div className="max-w-2xl lg:max-w-2xl xl:max-w-3xl w-full flex flex-col items-center gap-8">
              {/* Greeting */}
              <div className="flex items-center justify-center gap-3 flex-shrink-0 self-center">
                <svg className="w-8 h-8 text-accent-main-100" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L12.7 4.5L15 3.2L14.3 5.7L17 5.7L15 7.5L17 9.3L14.3 9.3L15 11.8L12.7 10.5L12 13L11.3 10.5L9 11.8L9.7 9.3L7 9.3L9 7.5L7 5.7L9.7 5.7L9 3.2L11.3 4.5L12 2Z"/>
                  <circle cx="12" cy="17" r="2" />
                  <circle cx="6" cy="12" r="1.5" />
                  <circle cx="18" cy="12" r="1.5" />
                </svg>
                <h1 className="text-[32px] text-text-100 tracking-tight">
                  <span className="text-[#c6613f] font-bold">KAVEEN</span>Agent - Your Personal Assistant
                </h1>
              </div>

              {/* Centered input */}
              <div className="w-full flex-grow-0">
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

                  {/* Textarea */}
                  <textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={handleTextareaChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit();
                      }
                    }}
                    placeholder="How can I help you today?"
                    className="flex-1 bg-transparent text-text-100 text-sm placeholder:text-text-400 -ml-8 resize-none outline-none min-h-[84px] max-h-[384px] leading-6 overflow-y-auto"
                    rows={1}
                    style={{ height: '84px' }}
                  />

                  {/* Right side buttons */}
                  <div className="flex items-center gap-2 flex-shrink-0 self-end">

                    {/* Send button */}
                    <button
                      onClick={handleSubmit}
                      disabled={!inputValue.trim()}
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
              </div>
            </div>
          </div>

          {/* Disclaimer at bottom */}
          <div className="pb-4">
            <p className="text-xs text-text-400 text-center">
              <span className="text-[#c6613f] font-bold">KAVEEN</span>Agent can make mistakes. Please double-check responses.
            </p>
          </div>
        </>
      ) : (
        /* Conversation started - input moves to bottom */
        <>
          {/* Messages */}
          <MessageList messages={messages} />

          {/* Input at bottom */}
          <ChatInput value={inputValue} onChange={setInputValue} onSubmit={handleSubmit} />
        </>
      )}
    </main>
  );
}
