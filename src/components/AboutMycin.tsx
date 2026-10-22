import { Activity, BookOpen, Calculator, CheckCircle2, ShieldCheck, Terminal } from 'lucide-react';

export default function AboutMycin() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-8 max-w-4xl mx-auto">
      {/* Intro */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600 mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Tổng quan lịch sử & Cơ sở khoa học</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Hệ Chuyên Gia MYCIN (Stanford University, 1970s)
        </h2>
        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
          Được phát triển vào đầu thập niên 1970 tại Đại học Stanford bởi bác sĩ và nhà khoa học máy tính Edward Shortliffe, MYCIN là một trong những hệ chuyên gia y tế đầu tiên và nổi tiếng nhất trong lịch sử Trí tuệ Nhân tạo (AI). Hệ thống được thiết kế nhằm chẩn đoán các bệnh nhiễm trùng huyết nặng, viêm màng não do vi khuẩn và đưa ra phác đồ điều trị kháng sinh thích hợp theo cân nặng và tình trạng bệnh nhân.
        </p>
      </div>

      {/* Core Math: Certainty Factor */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Calculator className="w-4 h-4 text-cyan-600" />
          <span>Mô hình toán học: Thừa số tin cậy Certainty Factor (CF)</span>
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Trong chẩn đoán y khoa thực tế, các dấu hiệu lâm sàng hiếm khi tuyệt đối 100%. MYCIN giải quyết sự không chắc chắn này thông qua độ đo niềm tin (Measure of Belief - $MB$) và độ đo ngờ vực (Measure of Disbelief - $MD$):
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3 font-mono text-xs">
          <div className="p-3 bg-white rounded border border-slate-200">
            <span className="text-slate-500 font-sans block mb-1">1. Định nghĩa Certainty Factor:</span>
            <div className="text-slate-900 font-bold">CF(H, E) = MB(H, E) - MD(H, E)  ∈  [-1.0, +1.0]</div>
            <div className="text-2xs text-slate-500 mt-1 font-sans">
              (Trong chẩn đoán ứng dụng này, CF $\in [0, 1]$ tương ứng 0% đến 100% độ chắc chắn)
            </div>
          </div>

          <div className="p-3 bg-white rounded border border-slate-200">
            <span className="text-slate-500 font-sans block mb-1">2. Đánh giá tiền đề hội đồng thời (AND):</span>
            <div className="text-slate-900 font-bold">CF(E1 ∧ E2 ∧ ... ∧ Ek) = min(CF(E1), CF(E2), ..., CF(Ek))</div>
          </div>

          <div className="p-3 bg-white rounded border border-slate-200">
            <span className="text-slate-500 font-sans block mb-1">3. Đóng góp của một luật suy diễn vào giả thiết bệnh:</span>
            <div className="text-slate-900 font-bold">CF_rule(H, E) = CF(Premise) × CF(Rule)</div>
          </div>

          <div className="p-3 bg-white rounded border border-slate-200">
            <span className="text-slate-500 font-sans block mb-1">4. Công thức kết hợp chứng cứ độc lập từ nhiều luật (Combination Rule):</span>
            <div className="text-slate-900 font-bold">
              CF_comb(CF1, CF2) = CF1 + CF2 - (CF1 × CF2)  [khi cả hai ≥ 0]
            </div>
            <div className="text-2xs text-slate-500 mt-1 font-sans">
              Khi có nhiều luật độc lập cùng ủng hộ một bệnh, độ tin cậy tích lũy tăng dần tiệm cận về 1.0 (100%).
            </div>
          </div>
        </div>
      </div>

      {/* Rules Engine Flow */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-600" />
          <span>Quy trình hoạt động của ứng dụng</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-lg border border-slate-200 bg-white space-y-1">
            <span className="text-2xs font-bold text-cyan-700 uppercase font-mono">Bước 1</span>
            <h4 className="text-xs font-bold text-slate-900">Khai báo triệu chứng</h4>
            <p className="text-2xs text-slate-600 leading-relaxed">
              Nhập triệu chứng bằng từ khóa có dấu hoặc không dấu, hệ thống tự động gợi ý đề xuất nhanh và cho phép điều chỉnh hệ số tin cậy CF quan sát được.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-slate-200 bg-white space-y-1">
            <span className="text-2xs font-bold text-cyan-700 uppercase font-mono">Bước 2</span>
            <h4 className="text-xs font-bold text-slate-900">Suy diễn & Kết hợp CF</h4>
            <p className="text-2xs text-slate-600 leading-relaxed">
              Động cơ suy luận duyệt qua toàn bộ tập luật tri thức, kích hoạt các luật thỏa mãn và tính toán thừa số tin cậy theo công thức Shortliffe.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-slate-200 bg-white space-y-1">
            <span className="text-2xs font-bold text-cyan-700 uppercase font-mono">Bước 3</span>
            <h4 className="text-xs font-bold text-slate-900">Kết quả & Kháng sinh</h4>
            <p className="text-2xs text-slate-600 leading-relaxed">
              Hiển thị chẩn đoán xác định, giải trình từng bước suy diễn, đề xuất phác đồ kháng sinh đặc hiệu và gợi ý các triệu chứng thiếu cần tầm soát thêm.
            </p>
          </div>
        </div>
      </div>

      {/* Medical disclaimer */}
      <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
        <div className="flex items-center gap-1.5 font-bold">
          <ShieldCheck className="w-4 h-4 text-amber-700" />
          <span>Lưu ý học thuật & Lâm sàng:</span>
        </div>
        <p className="text-2xs text-amber-800 leading-relaxed">
          Ứng dụng là mô hình mô phỏng khoa học hệ chuyên gia MYCIN phục vụ mục đích nghiên cứu, học tập nguyên lý Trí tuệ Nhân tạo và hỗ trợ tham khảo. Mọi quyết định chẩn đoán và điều trị trên bệnh nhân thực tế bắt buộc phải tuân theo chỉ định trực tiếp của bác sĩ chuyên khoa và hướng dẫn chính thức của Bộ Y tế.
        </p>
      </div>
    </div>
  );
}
