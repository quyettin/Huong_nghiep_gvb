import { useEffect, useRef, useState } from 'react';
import {
  ArrowUp,
  Bot,
  HelpCircle,
  Lightbulb,
  Send,
  Sparkles,
  Trash2,
  User,
} from 'lucide-react';
import { ChatMessage } from '../types/unipath';

const QUICK_PROMPTS = [
  'IELTS 6.5 quy đổi được bao nhiêu điểm ở BKA và NEU?',
  'Em thích vẽ và giỏi toán thì nên học ngành gì?',
  'So sánh học phí và cơ hội việc làm giữa CNTT Bách Khoa và FPT?',
  'Chiến thuật xếp thứ tự nguyện vọng 2026 tránh trượt oan?',
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg_init',
    sender: 'assistant',
    content:
      'Chào bạn! Mình là Trợ lý Tuyển sinh AI UniPath 24/7 🎓.\n\nMình có thể hỗ trợ bạn:\n1. Quy đổi điểm IELTS/SAT sang điểm thi THPT\n2. Gợi ý ngành nghề theo nhóm tính cách Holland & sở trường\n3. Tra cứu điểm chuẩn, học phí và chính sách học bổng các trường ĐH\n4. Lên chiến lược xếp thứ tự nguyện vọng an toàn nhất.\n\nBạn đang băn khoăn về vấn đề gì, hãy hỏi mình nhé!',
    timestamp: 'Vừa xong',
  },
];

export default function AIAssistantTab() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputPrompt).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsTyping(true);

    // AI Response simulation tailored to Vietnamese admissions
    setTimeout(() => {
      let aiResponse = '';
      const lower = text.toLowerCase();

      if (lower.includes('ielts') && (lower.includes('bka') || lower.includes('bách khoa') || lower.includes('neu'))) {
        aiResponse =
          '📌 **Quy chế quy đổi IELTS tại các trường ĐH Top đầu:**\n\n' +
          '• **Đại học Bách Khoa Hà Nội (BKA):**\n' +
          '  - IELTS 5.5 = 8.5 điểm\n' +
          '  - IELTS 6.0 = 9.0 điểm\n' +
          '  - IELTS 6.5 = 9.5 điểm\n' +
          '  - IELTS ≥ 7.0 = 10.0 điểm môn Tiếng Anh (trong tổ hợp A01, D01, D07).\n\n' +
          '• **Đại học Kinh tế Quốc dân (NEU):**\n' +
          '  - IELTS 5.5 = 8.0 điểm\n' +
          '  - IELTS 6.5 = 9.5 điểm\n' +
          '  - IELTS ≥ 7.5 = 10.0 điểm.\n\n' +
          '💡 *Lưu ý:* Bằng IELTS còn hạn ít nhất 2 năm tính đến ngày nộp hồ sơ xét tuyển bạn nhé!';
      } else if (lower.includes('vẽ') && lower.includes('toán')) {
        aiResponse =
          '🎨 Nếu bạn vừa **có óc thẩm mỹ hội họa** vừa **tư duy logic toán tốt**, đây là những ngành nghề thuộc hàng "viên ngọc quý" đang rất thiếu nhân lực chất lượng cao:\n\n' +
          '1. **Thiết kế Trải nghiệm Người dùng (UI/UX Design):** Cần tư duy logic cấu trúc app + mắt thẩm mỹ giao diện số.\n' +
          '2. **Thiết kế Mỹ thuật số & Game 3D (Digital Art / CGI):** Đồ họa không gian 3 chiều đòi hỏi tính toán tọa độ ánh sáng và kỹ năng vẽ tay.\n' +
          '3. **Kiến trúc & Quy hoạch đô thị:** Kết hợp toán học kết cấu chịu lực và nghệ thuật không gian sống.\n\n' +
          '🏫 *Các trường phù hợp nhất:* ĐH Mỹ Thuật Công Nghiệp, ĐH Kiến Trúc, ĐH FPT, RMIT Vietnam.';
      } else if (lower.includes('bách khoa') && lower.includes('fpt')) {
        aiResponse =
          '⚖️ **So sánh ngành Công nghệ thông tin giữa Bách Khoa và FPT:**\n\n' +
          '• **ĐH Bách Khoa (BKA / HCMUT):**\n' +
          '  - Học phí: 28 - 45 tr/năm (Rẻ hơn)\n' +
          '  - Điểm chuẩn: Rất cao (28 - 29.4 điểm)\n' +
          '  - Thế mạnh: Kiến thức nền tảng toán & giải thuật sâu, phù hợp nghiên cứu AI lõi, hệ thống nhúng, bán dẫn.\n\n' +
          '• **Đại học FPT:**\n' +
          '  - Học phí: 85 - 98 tr/năm\n' +
          '  - Điểm chuẩn: Xét SchoolRank Top 40% học bạ hoặc điểm THPT vừa sức\n' +
          '  - Thế mạnh: 100% sinh viên thực tập OJT tại doanh nghiệp, giáo trình tiếng Anh, thực chiến kỹ năng phần mềm nhanh.\n\n' +
          '👉 *Lời khuyên:* Nếu điểm thi khối A00/A01 đạt trên 28 điểm, Bách Khoa là số 1. Nếu kinh tế gia đình tốt và bạn muốn môi trường năng động, sớm đi làm, FPT là lựa chọn tuyệt vời!';
      } else if (lower.includes('nguyện vọng') || lower.includes('trượt')) {
        aiResponse =
          '🎯 **Chiến lược xếp nguyện vọng "Bất khả bại" 3 tầng:**\n\n' +
          '1. **Tầng 1 - Nguyện vọng Mơ ước (NV 1, 2):** Chọn ngành trường bạn thực sự yêu thích nhất dù điểm chuẩn năm ngoái có cao hơn điểm bạn 0.5 - 1.0 điểm.\n' +
          '2. **Tầng 2 - Nguyện vọng Vừa sức (NV 3, 4, 5):** Chọn các ngành có điểm chuẩn bằng hoặc thấp hơn điểm thi thử của bạn 0.5 điểm. Đây là tầng có xác suất đỗ cao nhất!\n' +
          '3. **Tầng 3 - Nguyện vọng An toàn lót đường (NV 6, 7):** Đặt các trường chắc chắn đỗ (thấp hơn 2 - 3 điểm) để đảm bảo 100% không bị trượt đại học.\n\n' +
          '⚠️ *Quy chế Bộ GD&ĐT:* Hệ thống chỉ xét trúng tuyển vào nguyện vọng cao nhất đầu tiên mà bạn đủ điểm, vì vậy hãy xếp ngành yêu thích nhất lên đầu!';
      } else {
        aiResponse =
          `Cảm ơn câu hỏi của bạn về: "${text}".\n\n` +
          'Theo dữ liệu tuyển sinh 2026-2027, các trường đại học đang tăng mạnh chỉ tiêu cho phương thức xét tuyển kết hợp chứng chỉ ngoại ngữ và thi Đánh giá năng lực (ĐGNL).\n\n' +
          'Bạn có thể vào tab **"Tính điểm"** trên thanh dưới cùng để nhập điểm thử và nhận phân tích tỷ lệ đỗ tự động theo công thức mới nhất!';
      }

      const aiMsg: ChatMessage = {
        id: 'ai_' + Date.now(),
        sender: 'assistant',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-[75vh] max-h-[640px] bg-slate-50 -mx-4 -mt-4 rounded-3xl overflow-hidden border border-slate-200">
      {/* Top Header */}
      <div className="bg-indigo-600 text-white px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg">
            🤖
          </div>
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Trợ lý Tuyển sinh AI 24/7</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h3>
            <p className="text-3xs text-indigo-200">Sẵn sàng giải đáp mọi thắc mắc của bạn</p>
          </div>
        </div>

        <button
          onClick={() => setMessages(INITIAL_MESSAGES)}
          className="p-1.5 rounded-lg bg-indigo-500/50 hover:bg-indigo-500 text-white text-3xs flex items-center gap-1"
          title="Xóa đoạn chat"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
        {messages.map((msg) => {
          const isAi = msg.sender === 'assistant';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2 ${isAi ? 'justify-start' : 'justify-end'}`}
            >
              {isAi && (
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs shrink-0 mt-0.5">
                  🤖
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed space-y-1 shadow-2xs ${
                  isAi
                    ? 'bg-white text-slate-800 border border-slate-200/90 whitespace-pre-wrap'
                    : 'bg-indigo-600 text-white font-medium'
                }`}
              >
                <div>{msg.content}</div>
                <span
                  className={`text-3xs block ${
                    isAi ? 'text-slate-400' : 'text-indigo-200 text-right'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs">
              🤖
            </div>
            <span className="italic text-3xs">AI đang soạn câu trả lời...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts strip */}
      <div className="bg-white border-t border-slate-200/80 px-3 py-2 overflow-x-auto no-scrollbar flex items-center gap-1.5">
        <span className="text-3xs font-bold text-slate-400 uppercase tracking-wider pl-1 shrink-0">
          Gợi ý:
        </span>
        {QUICK_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="text-3xs bg-slate-100 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input row */}
      <div className="bg-white p-3 border-t border-slate-200 flex items-center gap-2">
        <input
          type="text"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Nhập câu hỏi (ví dụ: tư vấn ngành, điểm chuẩn, IELTS...)"
          className="flex-1 text-xs py-2 px-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={() => handleSend()}
          disabled={!inputPrompt.trim()}
          className="w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white flex items-center justify-center transition-colors shrink-0"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
