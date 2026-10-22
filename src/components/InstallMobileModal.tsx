import { useState } from 'react';
import {
  Apple,
  Check,
  Copy,
  Download,
  ExternalLink,
  Laptop,
  Layers,
  Package,
  QrCode,
  Share2,
  Smartphone,
  Sparkles,
  X,
} from 'lucide-react';

interface InstallMobileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InstallMobileModal({ isOpen, onClose }: InstallMobileModalProps) {
  const [activeDevice, setActiveDevice] = useState<'ios' | 'android' | 'apk'>('ios');
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const appUrl =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://ais-pre-t5j5quk7knqlqhzvphioth-748140496335.asia-northeast1.run.app';

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${encodeURIComponent(
    appUrl
  )}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(appUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center shadow-xs">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Cài đặt & Xuất ứng dụng trên Điện Thoại
              </h3>
              <p className="text-xs text-slate-500">
                Chạy toàn màn hình như ứng dụng gốc, lưu trữ offline trên iOS và Android
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          {/* QR Code Quick Scan Banner */}
          <div className="bg-gradient-to-br from-cyan-50 via-white to-blue-50 border border-cyan-200/80 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-5">
            <div className="p-2 bg-white rounded-xl shadow-xs border border-slate-200 shrink-0">
              <img
                src={qrCodeUrl}
                alt="QR Code ứng dụng MYCIN"
                className="w-36 h-36 rounded-lg object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-2 text-center sm:text-left flex-1">
              <div className="inline-flex items-center gap-1.5 text-2xs font-bold text-cyan-800 bg-cyan-100 px-2.5 py-0.5 rounded-full">
                <QrCode className="w-3 h-3" />
                <span>Quét mã QR bằng Camera điện thoại</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                Mở ứng dụng ngay trên iPhone hoặc Android
              </h4>
              <p className="text-slate-600 leading-relaxed text-2xs">
                Mở ứng dụng <strong>Camera</strong> trên điện thoại và quét mã QR bên cạnh để truy cập ngay vào link ứng dụng MYCIN, sau đó làm theo hướng dẫn cài đặt bên dưới.
              </p>
              <div className="flex items-center gap-2 pt-1 justify-center sm:justify-start">
                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold transition-all shadow-2xs"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Đã chép link!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao chép liên kết</span>
                    </>
                  )}
                </button>
                <a
                  href={appUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-slate-500 hover:text-cyan-700 px-2 py-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Mở tab mới</span>
                </a>
              </div>
            </div>
          </div>

          {/* Device Tabs */}
          <div>
            <div className="flex border-b border-slate-200 gap-2 mb-4">
              <button
                onClick={() => setActiveDevice('ios')}
                className={`flex items-center gap-2 px-4 py-2 border-b-2 font-semibold transition-colors ${
                  activeDevice === 'ios'
                    ? 'border-cyan-600 text-cyan-700'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Apple className="w-4 h-4" />
                <span>iPhone / iPad (iOS)</span>
              </button>

              <button
                onClick={() => setActiveDevice('android')}
                className={`flex items-center gap-2 px-4 py-2 border-b-2 font-semibold transition-colors ${
                  activeDevice === 'android'
                    ? 'border-cyan-600 text-cyan-700'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Điện thoại Android (Chrome)</span>
              </button>

              <button
                onClick={() => setActiveDevice('apk')}
                className={`flex items-center gap-2 px-4 py-2 border-b-2 font-semibold transition-colors ${
                  activeDevice === 'apk'
                    ? 'border-cyan-600 text-cyan-700'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Đóng gói File APK / Native</span>
              </button>
            </div>

            {/* iOS Guide */}
            {activeDevice === 'ios' && (
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h5 className="font-bold text-slate-900 text-xs">
                  Cách cài đặt lên màn hình chính iPhone (Không cần qua App Store):
                </h5>
                <ol className="space-y-2.5 list-decimal list-inside text-slate-700 leading-relaxed">
                  <li className="pl-1">
                    Mở trình duyệt <strong>Safari</strong> trên iPhone/iPad và truy cập vào đường link ứng dụng.
                  </li>
                  <li className="pl-1">
                    Nhấn vào nút <strong>Chia sẻ (Share)</strong> ở thanh công cụ dưới đáy màn hình (biểu tượng hình vuông có mũi tên trỏ lên <Share2 className="w-3.5 h-3.5 inline mx-1" />).
                  </li>
                  <li className="pl-1">
                    Cuộn xuống danh sách hành động và chọn <strong>&ldquo;Thêm vào Màn hình chính&rdquo; (Add to Home Screen)</strong>.
                  </li>
                  <li className="pl-1">
                    Nhấn nút <strong>Thêm (Add)</strong> ở góc trên bên phải.
                  </li>
                </ol>
                <div className="mt-2 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-2xs">
                  ✓ Biểu tượng <strong>MYCIN Dx</strong> sẽ xuất hiện trên màn hình chính như một ứng dụng cài đặt thực thụ, hoạt động mượt mà và không có thanh địa chỉ web rườm rà.
                </div>
              </div>
            )}

            {/* Android Guide */}
            {activeDevice === 'android' && (
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h5 className="font-bold text-slate-900 text-xs">
                  Cách cài đặt lên điện thoại Android (Google Chrome, Cốc Cốc, Samsung Internet):
                </h5>
                <ol className="space-y-2.5 list-decimal list-inside text-slate-700 leading-relaxed">
                  <li className="pl-1">
                    Mở <strong>Google Chrome</strong> trên điện thoại Android và mở liên kết ứng dụng.
                  </li>
                  <li className="pl-1">
                    Nếu có thông báo pop-up <em>&ldquo;Thêm MYCIN Dx vào Màn hình chính&rdquo;</em>, nhấn <strong>Cài đặt (Install)</strong>.
                  </li>
                  <li className="pl-1">
                    Hoặc nhấn vào biểu tượng <strong>3 dấu chấm</strong> ở góc trên cùng bên phải trình duyệt.
                  </li>
                  <li className="pl-1">
                    Chọn <strong>&ldquo;Cài đặt ứng dụng&rdquo; (Install app)</strong> hoặc <strong>&ldquo;Thêm vào màn hình chính&rdquo;</strong>.
                  </li>
                </ol>
                <div className="mt-2 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-2xs">
                  ✓ Ứng dụng sẽ được cài vào kho ứng dụng điện thoại, có icon riêng, hỗ trợ lưu dữ liệu cục bộ và chạy độc lập.
                </div>
              </div>
            )}

            {/* APK Packaging Guide */}
            {activeDevice === 'apk' && (
              <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <h5 className="font-bold text-slate-900 text-xs mb-1">
                    Cách 1: Xuất file APK trực tuyến miễn phí bằng PWABuilder (Khuyên dùng - Không cần code)
                  </h5>
                  <p className="text-slate-600 leading-relaxed text-2xs">
                    Do ứng dụng đã được tích hợp đầy đủ chuẩn PWA (Manifest + Service Worker), bạn có thể đóng gói thành file APK cho Android trong vòng 2 phút:
                  </p>
                  <ol className="mt-2 space-y-1 list-decimal list-inside text-slate-700 text-2xs">
                    <li>Truy cập trang web: <a href="https://www.pwabuilder.com" target="_blank" rel="noreferrer" className="text-cyan-700 font-bold underline">https://www.pwabuilder.com</a></li>
                    <li>Dán đường link ứng dụng hiện tại vào ô kiểm tra và nhấn <strong>Start</strong>.</li>
                    <li>Chọn <strong>Package for Stores</strong> &rarr; chọn <strong>Android</strong> &rarr; nhấn <strong>Download Package</strong> để nhận file APK cài trực tiếp vào điện thoại!</li>
                  </ol>
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <h5 className="font-bold text-slate-900 text-xs mb-1">
                    Cách 2: Đóng gói Native App bằng Capacitor (Dành cho lập trình viên)
                  </h5>
                  <p className="text-slate-600 leading-relaxed text-2xs mb-2">
                    Nếu bạn tải mã nguồn dự án về máy tính, chạy 3 lệnh sau trong thư mục để tạo dự án Android Studio:
                  </p>
                  <pre className="bg-slate-900 text-cyan-300 p-3 rounded-lg font-mono text-2xs overflow-x-auto">
{`# 1. Cài đặt Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android

# 2. Khởi tạo và build
npx cap init "MYCIN Dx" "com.mycin.expert"
npm run build
npx cap add android

# 3. Mở Android Studio để xuất file .apk
npx cap open android`}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-2xs text-slate-500">
            Ứng dụng tương thích 100% với iOS Safari, Chrome Android và Edge Mobile
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
}
