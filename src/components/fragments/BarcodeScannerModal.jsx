// BarcodeScannerModal.jsx
import { useEffect, useState, useRef, useCallback } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import beepSound from '../../beep.mp3';

const BarcodeScannerModal = ({ isOpen, onClose, onScan }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const codeReader = useRef(new BrowserMultiFormatReader());
  const videoRef = useRef(null);
  const audioRef = useRef(new Audio(beepSound));
  const retryCountRef = useRef(0);
  const MAX_RETRIES = 3;

  const scanOptions = {
    tryHarder: true,
    formats: ['QR_CODE', 'EAN_13', 'CODE_128', 'DATA_MATRIX'],
    characterSet: 'UTF-8'
  };

  const validateBarcode = (result) => {
    if (!result || result.length < 5) return false;
    if (!/^[A-Za-z0-9]+$/.test(result)) return false;
    return true;
  };

  const enhanceVideo = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.style.filter = 'contrast(1.2) brightness(1.1)';
    }
  }, []);

  const playBeep = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.error('Error playing audio:', err));
      
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
    }
  }, []);

  const initializeDevices = async () => {
    try {
      setIsLoading(true);
      const videoInputDevices = await codeReader.current.listVideoInputDevices();
      
      // Filter back cameras
      const backCameras = videoInputDevices.filter(device => 
        device.label.toLowerCase().includes('back') || 
        device.label.toLowerCase().includes('environment')
      );
      
      setDevices(backCameras);
      
      // Select the first back camera if available, otherwise use the first available camera
      if (backCameras.length > 0) {
        setSelectedDeviceId(backCameras[0].deviceId);
      } else if (videoInputDevices.length > 0) {
        setSelectedDeviceId(videoInputDevices[0].deviceId);
      }

      await startCamera();
    } catch (err) {
      console.error('Failed to initialize devices:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined,
          facingMode: selectedDeviceId ? undefined : "environment",
          focusMode: "continuous",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 30 }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        const videoTrack = stream.getVideoTracks()[0];
        
        const capabilities = videoTrack.getCapabilities();
        if (capabilities) {
          await videoTrack.applyConstraints({
            advanced: [{
              width: capabilities.width.max,
              height: capabilities.height.max,
              frameRate: 30
            }]
          });
        }
      }
      
      enhanceVideo();
    } catch (err) {
      console.error('Camera error:', err);
    }
  };

  const handleScan = async () => {
    while (retryCountRef.current < MAX_RETRIES) {
      try {
        await codeReader.current.decodeFromVideoDevice(
          selectedDeviceId,
          'video',
          (result, err) => {
            if (result && validateBarcode(result.text)) {
              playBeep();
              onScan(result.text);
              onClose();
              retryCountRef.current = 0;
            }
            if (err && !(err instanceof NotFoundException)) {
              console.error(err);
              retryCountRef.current++;
            }
          },
          scanOptions
        );
        break;
      } catch (err) {
        retryCountRef.current++;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    if (retryCountRef.current >= MAX_RETRIES) {
      retryCountRef.current = 0;
    }
  };

  useEffect(() => {
    if (isOpen) {
      initializeDevices();
    }
    
    return () => {
      codeReader.current.reset();
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      retryCountRef.current = 0;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && selectedDeviceId) {
      handleScan();
    }
  }, [isOpen, selectedDeviceId]);

  if (!isOpen) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Barcode Skan</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body text-center">
            {isLoading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <>
                <div className="scanner-container">
                  <video
                    id="video"
                    ref={videoRef}
                    width="100%"
                    height="300"
                    style={{ 
                      border: '1px solid gray',
                      borderRadius: '8px'
                    }}
                  />
                  <div className="scan-region-highlight"></div>
                </div>
                {devices.length > 1 && (
                  <div className="mt-3">
                    <select
                      className="form-select"
                      value={selectedDeviceId}
                      onChange={(e) => setSelectedDeviceId(e.target.value)}
                    >
                      {devices.map((device) => (
                        <option key={device.deviceId} value={device.deviceId}>
                          {device.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Ýap
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .scanner-container {
          position: relative;
          width: 100%;
          height: 300px;
        }
        
        .scan-region-highlight {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          height: 150px;
          border: 2px solid #FF0000;
          border-radius: 4px;
        }

        .spinner-border {
          width: 3rem;
          height: 3rem;
        }
      `}</style>
    </div>
  );
};

export default BarcodeScannerModal;