import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode, X, Users, CheckCircle } from "lucide-react";

interface NameRecognitionDialogProps {
  qrCodeValue: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}

interface RecognizedStudent {
  name: string;
  studentId: string;
  timestamp: string;
}

export default function NameRecognitionDialog({
  qrCodeValue,
  isOpen,
  onOpenChange,
  trigger,
}: NameRecognitionDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [recognizedStudents, setRecognizedStudents] = useState<
    RecognizedStudent[]
  >([]);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  const open = isOpen !== undefined ? isOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  // Parse QR code data
  const qrData = React.useMemo(() => {
    try {
      return JSON.parse(qrCodeValue);
    } catch (error) {
      console.error("Error parsing QR code data:", error);
      return null;
    }
  }, [qrCodeValue]);

  useEffect(() => {
    let client: Client | null = null;

    if (open) {
      // Use classSessionID from QR data or fallback to default
      const classSessionId = qrData?.classSessionID || "abc123";

      // Create SockJS connection
      const socket = new SockJS("http://localhost:8080/ws");

      client = new Client({
        webSocketFactory: () => socket,
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      client.onConnect = function (frame) {
        console.log("Connected:", frame);

        if (client) {
          console.log(
            "Subscribing to topic:",
            `/topic/name-recognition/class-session/${classSessionId}`
          );

          client.subscribe(
            `/topic/name-recognition/class-session/${classSessionId}`,
            function (message) {
              console.log("Received message:", message);

              try {
                const data = JSON.parse(message.body);
                console.log("New student recognized:", data.name);

                const newStudent: RecognizedStudent = {
                  name: data.name,
                  studentId: data.studentID,
                  timestamp: new Date().toLocaleTimeString(),
                };

                setRecognizedStudents((prev) => {
                  return [...prev, newStudent];
                });
              } catch (error) {
                console.error("Error parsing message:", error);
              }
            }
          );
        }
      };

      client.onStompError = function (frame) {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      };

      client.onWebSocketError = function (error) {
        console.error("WebSocket error:", error);
      };

      client.onWebSocketClose = function () {
        console.log("WebSocket connection closed");
      };

      client.activate();
      setStompClient(client);
    }

    return () => {
      if (client && client.connected) {
        client.deactivate();
        console.log("Disconnected from WebSocket");
      }
    };
  }, [open, qrData]);

  const handleDialogClose = (newOpen: boolean) => {
    if (!newOpen) {
      // Clear students list when closing dialog
      setRecognizedStudents([]);
    }
    setOpen(newOpen);
  };

  const defaultTrigger = (
    <Button variant='outline' className='gap-2'>
      <QrCode className='h-4 w-4' />
      Show QR Code
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className='sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <QrCode className='h-5 w-5' />
            Name Recognition QR Code
          </DialogTitle>
          <DialogDescription>
            Scan this QR code for name recognition attendance
            {qrData?.name && (
              <span className='block mt-1 font-medium'>
                Class: {qrData.name}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col lg:flex-row gap-6 py-4'>
          {/* QR Code Section */}
          <div className='flex flex-col items-center space-y-4 flex-shrink-0'>
            <div className='p-4 bg-white rounded-lg border'>
              <QRCode
                value={qrCodeValue}
                size={200}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
            </div>
            <p className='text-sm text-muted-foreground text-center'>
              Students can scan this code to mark their attendance
            </p>
          </div>

          {/* Students List Section */}
          <div className='flex-1 min-w-0'>
            <div className='flex items-center gap-2 mb-4'>
              <Users className='h-5 w-5 text-primary' />
              <h3 className='font-semibold'>Recognized Students</h3>
              <span className='text-sm text-muted-foreground'>
                ({recognizedStudents.length})
              </span>
            </div>

            <div className='max-h-64 overflow-y-auto space-y-2 border rounded-lg p-3'>
              {recognizedStudents.length === 0 ? (
                <div className='text-center text-muted-foreground py-8'>
                  <Users className='h-8 w-8 mx-auto mb-2 opacity-50' />
                  <p className='text-sm'>No students recognized yet</p>
                  <p className='text-xs'>
                    Students will appear here as they scan the QR code
                  </p>
                </div>
              ) : (
                recognizedStudents.map((student, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg animate-in slide-in-from-right duration-300'>
                    <div className='flex items-center gap-2'>
                      <CheckCircle className='h-4 w-4 text-green-600' />
                      <div className='flex flex-col'>
                        <span className='text-xs text-green-600 font-bold'>
                          ID: {student.studentId}
                        </span>
                      </div>
                    </div>
                    <span className='text-xs text-green-600'>
                      {student.timestamp}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
