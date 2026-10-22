import { Disease, MycinRule, PresetCase, Symptom } from '../types/mycin';

export const DEFAULT_SYMPTOMS: Symptom[] = [
  // Toàn thân
  {
    id: 's_sot_cao',
    name: 'Sốt cao liên tục (≥ 39°C)',
    category: 'toan_than',
    categoryLabel: 'Toàn thân',
    description: 'Thân nhiệt đo tại nách hoặc miệng trên 39 độ C kéo dài',
    aliases: ['sot', 'sot cao', 'hyperthermia', 'nong sot'],
  },
  {
    id: 's_sot_ret_run',
    name: 'Sốt kèm rét run từng cơn',
    category: 'toan_than',
    categoryLabel: 'Toàn thân',
    description: 'Cơn sốt lạnh run bần bật, nổi gai ốc rồi vã mồ hôi nhiều',
    aliases: ['ret run', 'sot run', 'rigors', 'chills'],
  },
  {
    id: 's_sot_dinh_ky',
    name: 'Sốt có chu kỳ cơn (cách nhật hoặc mỗi ngày)',
    category: 'toan_than',
    categoryLabel: 'Toàn thân',
    description: 'Cơn sốt lặp lại định kỳ 48h hoặc 24h, kèm vã mồ hôi ướt áo',
    aliases: ['sot chu ky', 'sot cach nhat', 'paroxysm'],
  },
  {
    id: 's_met_moi_suy_kiet',
    name: 'Mệt mỏi, suy kiệt toàn thân, chán ăn',
    category: 'toan_than',
    categoryLabel: 'Toàn thân',
    description: 'Cảm giác kiệt sức, không thể thực hiện sinh hoạt bình thường',
    aliases: ['met moi', 'suy nhuoc', 'chan an', 'fatigue'],
  },
  {
    id: 's_dau_moi_co_khop',
    name: 'Đau mỏi cơ khớp dữ dội toàn thân',
    category: 'toan_than',
    categoryLabel: 'Toàn thân',
    description: 'Đau nhức các bắp cơ, khớp xương như bị đánh',
    aliases: ['dau co', 'dau khop', 'nhuc moi', 'myalgia'],
  },

  // Thần kinh
  {
    id: 's_co_cung',
    name: 'Cổ cứng (Dấu hiệu màng não Kernig / Brudzinski (+))',
    category: 'than_kinh',
    categoryLabel: 'Thần kinh',
    description: 'Gập cằm vào ngực khó khăn hoặc đau buốt vùng gáy',
    aliases: ['co cung', 'cung co', 'dau gay', 'kernig', 'brudzinski', 'meningismus'],
  },
  {
    id: 's_dau_dau_du_doi',
    name: 'Đau đầu dữ dội, không đáp ứng thuốc giảm đau',
    category: 'than_kinh',
    categoryLabel: 'Thần kinh',
    description: 'Đau căng buốt vùng chẩm hoặc toàn bộ đầu, nhức nhối',
    aliases: ['dau dau', 'nhuc dau', 'headache'],
  },
  {
    id: 's_so_anh_sang',
    name: 'Sợ ánh sáng, sợ tiếng động mạnh',
    category: 'than_kinh',
    categoryLabel: 'Thần kinh',
    description: 'Khó chịu, đau mắt tăng lên khi tiếp xúc ánh sáng chói',
    aliases: ['so anh sang', 'photophobia'],
  },
  {
    id: 's_roi_loan_y_thuc',
    name: 'Rối loạn ý thức (lơ mơ, mê sảng, li bì hoặc hôn mê)',
    category: 'than_kinh',
    categoryLabel: 'Thần kinh',
    description: 'Không tỉnh táo, trả lời chậm hoặc lú lẫn về không gian/thời gian',
    aliases: ['lo mo', 'hon me', 'me sang', 'li bi', 'altered mental state'],
  },
  {
    id: 's_dau_hoc_mat',
    name: 'Đau nhức hốc mắt sau nhãn cầu',
    category: 'than_kinh',
    categoryLabel: 'Thần kinh',
    description: 'Đau buốt khi liếc mắt hoặc ấn nhẹ vào hốc mắt',
    aliases: ['dau hoc mat', 'retro-orbital pain'],
  },

  // Hô hấp
  {
    id: 's_ho_dom_ri_sat',
    name: 'Ho có đờm đặc màu rỉ sắt hoặc màu vàng/xanh',
    category: 'ho_hap',
    categoryLabel: 'Hô hấp',
    description: 'Đờm màu gỉ sắt đặc trưng viêm phổi thùy hoặc đờm mủ',
    aliases: ['ho', 'ho dom', 'dom ri sat', 'productive cough'],
  },
  {
    id: 's_ho_khan_dau_hong',
    name: 'Ho khan thành cơn kèm đau rát họng',
    category: 'ho_hap',
    categoryLabel: 'Hô hấp',
    description: 'Ho kích ứng, họng đỏ, nuốt đau buốt',
    aliases: ['ho khan', 'dau hong', 'rat hong', 'sore throat'],
  },
  {
    id: 's_kho_tho_tho_nhanh',
    name: 'Khó thở, thở nhanh nông (nhịp thở > 22 lần/phút)',
    category: 'ho_hap',
    categoryLabel: 'Hô hấp',
    description: 'Cảm giác hụt hơi, co kéo cơ hô hấp phụ',
    aliases: ['kho tho', 'tho nhanh', 'dyspnea', 'tachypnea'],
  },
  {
    id: 's_dau_nguc_mang_phoi',
    name: 'Đau ngực kiểu màng phổi (tăng khi hít sâu hoặc ho)',
    category: 'ho_hap',
    categoryLabel: 'Hô hấp',
    description: 'Đau nhói một bên ngực, hạn chế hít thở sâu',
    aliases: ['dau nguc', 'pleuritic chest pain'],
  },
  {
    id: 's_rale_am_no',
    name: 'Ran ẩm, ran nổ khu trú khi nghe phổi',
    category: 'ho_hap',
    categoryLabel: 'Hô hấp',
    description: 'Âm bất thường nghe được qua ống nghe ở vùng đáy hoặc thùy phổi',
    aliases: ['ran no', 'ran am', 'crackles', 'rales'],
  },

  // Tiêu hóa
  {
    id: 's_non_vot',
    name: 'Nôn vọt (không liên quan bữa ăn, không báo trước)',
    category: 'tieu_hoa',
    categoryLabel: 'Tiêu hóa',
    description: 'Nôn bất ngờ với áp lực mạnh, thường gặp trong tăng áp lực nội sọ',
    aliases: ['non vot', 'non mua', 'projectile vomiting'],
  },
  {
    id: 's_dau_bung_ho_chau_phai',
    name: 'Đau bụng khu trú hố chậu phải (điểm McBurney (+))',
    category: 'tieu_hoa',
    categoryLabel: 'Tiêu hóa',
    description: 'Đau âm ỉ bắt đầu từ quanh rốn rồi chuyển dần sang vùng bụng dưới bên phải',
    aliases: ['dau ruot thua', 'ho chau phai', 'mcburney', 'right lower quadrant pain'],
  },
  {
    id: 's_phan_ung_thanh_bung',
    name: 'Phản ứng thành bụng / Cảm ứng phúc mạc',
    category: 'tieu_hoa',
    categoryLabel: 'Tiêu hóa',
    description: 'Bụng co cứng khi bác sĩ ấn nhẹ vào thành bụng',
    aliases: ['co cung bung', 'dekhang', 'peritoneal signs'],
  },
  {
    id: 's_dau_thuong_vi_xuyen_lung',
    name: 'Đau bụng dữ dội thượng vị lan xuyên ra sau lưng',
    category: 'tieu_hoa',
    categoryLabel: 'Tiêu hóa',
    description: 'Cơn đau dữ dội liên tục sau bữa ăn nhiều dầu mỡ hoặc rượu bia',
    aliases: ['dau thuong vi', 'dau tuy', 'epigastric pain'],
  },
  {
    id: 's_vang_da_vang_mat',
    name: 'Vàng da, vàng củng mạc mắt, nước tiểu sẫm màu',
    category: 'tieu_hoa',
    categoryLabel: 'Tiêu hóa',
    description: 'Da và tròng trắng mắt ngả vàng rõ rệt, nước tiểu đặc như nước vối',
    aliases: ['vang da', 'vang mat', 'jaundice', 'icterus'],
  },
  {
    id: 's_buon_non_tieu_chay',
    name: 'Buồn nôn, nôn mửa hoặc tiêu chảy',
    category: 'tieu_hoa',
    categoryLabel: 'Tiêu hóa',
    description: 'Rối loạn tiêu hóa cấp tính kèm mất nước',
    aliases: ['buon non', 'tieu chay', 'diarrhea', 'nausea'],
  },

  // Tiết niệu - Sinh dục
  {
    id: 's_tieu_buot_tieu_rat',
    name: 'Tiểu buốt, tiểu rắt, tiểu gấp nhiều lần',
    category: 'tiet_nieu',
    categoryLabel: 'Tiết niệu',
    description: 'Cảm giác đau xót buốt khi đi tiểu, đi tiểu liên tục nhưng ít nước',
    aliases: ['tieu buot', 'tieu rat', 'dysuria', 'frequency'],
  },
  {
    id: 's_dau_hong_lung_rung_than',
    name: 'Đau âm ỉ vùng hông lưng (Dấu rung thận (+))',
    category: 'tiet_nieu',
    categoryLabel: 'Tiết niệu',
    description: 'Đau góc sườn sống một hoặc hai bên, tăng đau khi gõ nhẹ',
    aliases: ['rung than', 'dau lung', 'flank pain', 'cva tenderness'],
  },
  {
    id: 's_nuoc_tieu_duc_mau',
    name: 'Nước tiểu đục, có cặn mủ hoặc có máu vi thể/đại thể',
    category: 'tiet_nieu',
    categoryLabel: 'Tiết niệu',
    description: 'Nước tiểu đổi màu hồng đỏ hoặc đục lờ lờ như nước vo gạo',
    aliases: ['tieu ra mau', 'nuoc tieu duc', 'pyuria', 'hematuria'],
  },

  // Tim mạch - Tuần hoàn
  {
    id: 's_ha_huyet_ap',
    name: 'Tụt huyết áp (Huyết áp tâm thu < 90 mmHg hoặc MAP < 65)',
    category: 'tuan_hoan',
    categoryLabel: 'Tim mạch - Tuần hoàn',
    description: 'Huyết áp giảm sâu, dấu hiệu giảm tưới máu mô',
    aliases: ['ha huyet ap', 'tut huyet ap', 'hypotension', 'soc'],
  },
  {
    id: 's_mach_nhanh_nho',
    name: 'Mạch nhanh nhỏ (> 100 - 120 nhịp/phút)',
    category: 'tuan_hoan',
    categoryLabel: 'Tim mạch - Tuần hoàn',
    description: 'Tim đập dồn dập, mạch ngoại vi bắt yếu',
    aliases: ['mach nhanh', 'tim dap nhanh', 'tachycardia'],
  },
  {
    id: 's_da_tai_lanh_noi_van',
    name: 'Da tái lạnh, đầu chi ẩm lạnh, nổi vân tím',
    category: 'tuan_hoan',
    categoryLabel: 'Tim mạch - Tuần hoàn',
    description: 'Thời gian đổ đầy mao mạch CRT > 2 giây, tưới máu ngoại vi kém',
    aliases: ['lanh chi', 'noi van tim', 'mottling', 'poor perfusion'],
  },

  // Da - Niêm mạc
  {
    id: 's_xuat_huyet_duoi_da',
    name: 'Chấm xuất huyết / Ban xuất huyết dưới da, chảy máu chân răng',
    category: 'da_niem_mac',
    categoryLabel: 'Da - Niêm mạc',
    description: 'Chấm đỏ li ti dưới da không biến mất khi căng da, chảy máu mũi/răng',
    aliases: ['xuat huyet', 'petechiae', 'purpura', 'chay mau cam'],
  },
  {
    id: 's_mun_mu_toan_than',
    name: 'Mụn mủ, nhọt da, vết loét nhiễm trùng ngoài da',
    category: 'da_niem_mac',
    categoryLabel: 'Da - Niêm mạc',
    description: 'Ổ mủ hoại tử ngoài da, vết thương hở sưng đỏ có mủ',
    aliases: ['mun mu', 'nhot', 'o nhiem trung da', 'skin abscess'],
  },
  {
    id: 's_ban_dinh_vi_meningococcemia',
    name: 'Ban hoại tử hình sao lan nhanh trên da',
    category: 'da_niem_mac',
    categoryLabel: 'Da - Niêm mạc',
    description: 'Dấu hiệu đặc trưng nhiễm não mô cầu Meningococcal',
    aliases: ['ban hinh sao', 'hoai tu da', 'meningococcemia rash'],
  },

  // Cận lâm sàng & Xét nghiệm
  {
    id: 's_bach_cau_tang_cao',
    name: 'Bạch cầu máu tăng cao (> 12.000 /µL) với Neutrophil ưu thế',
    category: 'can_lam_sang',
    categoryLabel: 'Xét nghiệm - Cận lâm sàng',
    description: 'Dấu hiệu phản ứng viêm hoặc nhiễm trùng vi khuẩn cấp',
    aliases: ['bach cau tang', 'leukocytosis', 'neutrophilia'],
  },
  {
    id: 's_giam_tieu_cau',
    name: 'Tiểu cầu máu giảm thấp (< 100.000 /µL) kèm Hematocrit tăng',
    category: 'can_lam_sang',
    categoryLabel: 'Xét nghiệm - Cận lâm sàng',
    description: 'Cô đặc máu và rối loạn đông máu điển hình sốt xuất huyết',
    aliases: ['giam tieu cau', 'thrombocytopenia', 'hematocrit'],
  },
  {
    id: 's_dich_nao_tuy_duc',
    name: 'Dịch não tủy (DNT) đục, áp lực tăng, protein tăng, glucose giảm',
    category: 'can_lam_sang',
    categoryLabel: 'Xét nghiệm - Cận lâm sàng',
    description: 'Kết quả chọc dò tủy sống xác định viêm màng não mủ vi khuẩn',
    aliases: ['choc do tuy song', 'dnt duc', 'csf pleocytosis'],
  },
  {
    id: 's_cay_mau_vi_khuan',
    name: 'Cấy máu hoặc cấy dịch mủ phát hiện vi khuẩn gây bệnh',
    category: 'can_lam_sang',
    categoryLabel: 'Xét nghiệm - Cận lâm sàng',
    description: 'Phân lập vi khuẩn Gram âm (E.coli, Klebsiella) hoặc Gram dương (Staphylococcus)',
    aliases: ['cay mau', 'blood culture', 'gram stain'],
  },
  {
    id: 's_xquang_phoi_dam_dac',
    name: 'X-quang ngực có hình ảnh thâm nhiễm / đông đặc phế nang',
    category: 'can_lam_sang',
    categoryLabel: 'Xét nghiệm - Cận lâm sàng',
    description: 'Đám mờ phế nang hình tam giác hoặc tổn thương thâm nhiễm nhu mô',
    aliases: ['xquang phoi', 'tham nhiem phoi', 'chest x-ray consolidation'],
  },
  {
    id: 's_amylase_lipase_tang',
    name: 'Amylase hoặc Lipase huyết thanh tăng gấp 3 lần giới hạn bình thường',
    category: 'can_lam_sang',
    categoryLabel: 'Xét nghiệm - Cận lâm sàng',
    description: 'Tiêu chuẩn sinh hóa vàng chẩn đoán viêm tụy cấp',
    aliases: ['amylase tang', 'lipase tang', 'men tuy'],
  },
  {
    id: 's_men_gan_tang_cao',
    name: 'Men gan AST/ALT tăng cao đột biến (> 5-10 lần bình thường)',
    category: 'can_lam_sang',
    categoryLabel: 'Xét nghiệm - Cận lâm sàng',
    description: 'Tổn thương tế bào gan cấp do virus hoặc độc chất',
    aliases: ['men gan tang', 'ast alt', 'transaminase'],
  },
  {
    id: 's_soi_tim_ky_sinh_trung',
    name: 'Soi lam máu thấy thể vô tính Ký sinh trùng sốt rét (Plasmodium)',
    category: 'can_lam_sang',
    categoryLabel: 'Xét nghiệm - Cận lâm sàng',
    description: 'Xác định mầm bệnh sốt rét bằng xét nghiệm giọt máu đặc/mỏng',
    aliases: ['ky sinh trung sot ret', 'plasmodium', 'blood smear malaria'],
  },
];

export const DEFAULT_DISEASES: Disease[] = [
  {
    id: 'd_meningitis',
    name: 'Viêm màng não mủ do vi khuẩn (Acute Bacterial Meningitis)',
    icdCode: 'G00.9',
    category: 'Nhiễm trùng thần kinh trung ương',
    severity: 'critical',
    description:
      'Tình trạng nhiễm trùng cấp tính màng não và khoang dưới nhện do vi khuẩn (Phế cầu Streptococcus pneumoniae, Não mô cầu Neisseria meningitidis, hoặc Hib), đe dọa trực tiếp tính mạng nếu không điều trị kháng sinh khẩn cấp.',
    treatment: {
      antimicrobialRegimen: [
        'Ceftriaxone 2g IV mỗi 12 giờ (hoặc Cefotaxime 2g IV mỗi 4-6 giờ)',
        'Phối hợp Vancomycin 15-20 mg/kg IV mỗi 8-12 giờ (đối với phế cầu kháng penicillin)',
        'Bổ sung Ampicillin 2g IV mỗi 4 giờ nếu bệnh nhân > 50 tuổi hoặc suy giảm miễn dịch (phòng Listeria monocytogenes)',
        'Dexamethasone 10 mg IV trước hoặc cùng lúc với liều kháng sinh đầu tiên để giảm biến chứng phù não và điếc',
      ],
      supportiveCare: [
        'Nhập khoa Hồi sức tích cực (ICU), theo dõi dấu hiệu sinh tồn và tri giác thang điểm Glasgow mỗi giờ',
        'Kiểm soát tăng áp lực nội sọ (nâng đầu giường 30 độ, dùng Mannitol 20% khi cần)',
        'Duy trì cân bằng nước điện giải và hạ sốt tích cực (Paracetamol truyền tĩnh mạch)',
      ],
      warnings: [
        'Dấu hiệu tụt kẹt não: Đồng tử giãn không đều, tam chứng Cushing (tăng huyết áp, mạch chậm, thở không đều)',
        'Ban hoại tử da lan nhanh nghi ngờ nhiễm não mô cầu tối cấp (Hội chứng Waterhouse-Friderichsen)',
      ],
    },
    confirmativeTests: [
      'Chọc dò tủy sống thắt lưng xét nghiệm sinh hóa, tế bào, nhuộm Gram và cấy dịch não tủy (DNT)',
      'Cấy máu 2 vị trí trước khi dùng liều kháng sinh đầu tiên',
      'Chụp CT sọ não loại trừ tổn thương choán chỗ trước khi chọc dò nếu có dấu thần kinh khu trú',
    ],
  },
  {
    id: 'd_sepsis_gram_neg',
    name: 'Nhiễm khuẩn huyết Gram âm / Sốc nhiễm khuẩn (Gram-negative Sepsis)',
    icdCode: 'A41.5',
    category: 'Nhiễm trùng huyết & Toàn thân',
    severity: 'critical',
    description:
      'Hội chứng đáp ứng viêm toàn thân đe dọa tính mạng do vi khuẩn Gram âm (E. coli, Klebsiella pneumoniae, Pseudomonas aeruginosa) xâm nhập dòng máu, dẫn đến tụt huyết áp và suy đa tạng.',
    treatment: {
      antimicrobialRegimen: [
        'Meropenem 1g IV mỗi 8 giờ (hoặc Imipenem/Cilastatin 1g IV mỗi 8 giờ) truyền kéo dài trong 3 giờ',
        'Hoặc Piperacillin/Tazobactam 4.5g IV mỗi 6 giờ nếu nghi ngờ nhiễm trùng đường tiêu hóa/tiết niệu',
        'Cân nhắc phối hợp Amikacin 15-20 mg/kg IV liều duy nhất mỗi ngày nếu có dấu hiệu sốc nhiễm khuẩn nặng',
        'Xuống thang kháng sinh theo kết quả kháng sinh đồ sau 48-72 giờ',
      ],
      supportiveCare: [
        'Hồi sức dịch tinh thể tích cực: Tinh thể đẳng trương (NaCl 0.9% hoặc Ringer Lactate) 30 mL/kg trong 3 giờ đầu',
        'Vận mạch Noradrenaline truyền tĩnh mạch duy trì huyết áp động mạch trung bình (MAP) ≥ 65 mmHg nếu huyết áp không đáp ứng đủ dịch',
        'Theo dõi lượng nước tiểu qua sonde bàng quang, đo lactate máu liên tục để đánh giá tưới máu mô',
      ],
      warnings: [
        'Huyết áp tâm thu giảm < 90 mmHg kéo dài, chi lạnh nổi vân tím, vô niệu',
        'Lactate máu tăng > 4 mmol/L là dấu hiệu thiếu oxy tổ chức nghiêm trọng',
      ],
    },
    confirmativeTests: [
      'Cấy máu 2 bộ (cả kỵ khí và ái khí)',
      'Tổng phân tích tế bào máu, định lượng Procalcitonin (PCT), CRP, khí máu động mạch',
      'Tìm và xử lý triệt để ổ nhiễm trùng tiên phát (siêu âm bụng, chụp X-quang, cấy nước tiểu)',
    ],
  },
  {
    id: 'd_sepsis_staph',
    name: 'Nhiễm khuẩn huyết do Tụ cầu vàng (Staphylococcus aureus Bacteremia)',
    icdCode: 'A41.0',
    category: 'Nhiễm trùng huyết & Toàn thân',
    severity: 'critical',
    description:
      'Nhiễm trùng máu xâm lấn do vi khuẩn Staphylococcus aureus (MSSA hoặc MRSA kháng methicillin) thường bắt nguồn từ ổ nhiễm trùng da mô mềm, catheter tĩnh mạch hoặc viêm nội tâm mạc.',
    treatment: {
      antimicrobialRegimen: [
        'Nếu nghi ngờ MRSA: Vancomycin 15-20 mg/kg IV mỗi 8-12 giờ (duy trì nồng độ đáy trough 15-20 mcg/mL) hoặc Daptomycin 6-8 mg/kg IV/ngày',
        'Nếu đã khẳng định MSSA nhạy cảm: Oxacillin 2g IV mỗi 4 giờ hoặc Cefazolin 2g IV mỗi 8 giờ (ưu thế vượt trội hơn Vancomycin)',
        'Thời gian điều trị tối thiểu 2 tuần (không biến chứng) đến 4-6 tuần (nếu có biến chứng viêm nội tâm mạc hoặc viêm xương tủy)',
      ],
      supportiveCare: [
        'Rút bỏ ngay lập tức tất cả các catheter đường truyền tĩnh mạch nghi ngờ nhiễm trùng',
        'Rạch tháo mủ, dẫn lưu triệt để các ổ áp xe mô mềm hoặc khớp',
        'Siêu âm tim qua thành ngực (TTE) hoặc qua thực quản (TEE) bắt buộc để tầm soát sùi van tim',
      ],
      warnings: [
        'Sốt dai dẳng sau 72 giờ dùng kháng sinh trúng đích',
        'Đau lưng mới xuất hiện (nguy cơ áp xe ngoài màng cứng hoặc viêm đĩa đệm cột sống)',
      ],
    },
    confirmativeTests: [
      'Cấy máu lặp lại sau mỗi 48-72 giờ cho đến khi âm tính',
      'Siêu âm tim qua thực quản (TEE)',
      'Nhuộm soi và cấy dịch mủ tại ổ nhiễm trùng da ngoài',
    ],
  },
  {
    id: 'd_cap_pneumonia',
    name: 'Viêm phổi thùy mắc phải cộng đồng (Community-Acquired Pneumonia - CAP)',
    icdCode: 'J18.1',
    category: 'Nhiễm trùng đường hô hấp',
    severity: 'high',
    description:
      'Nhiễm khuẩn cấp tính nhu mô phổi thường do Streptococcus pneumoniae, Mycoplasma hoặc vi khuẩn không điển hình, gây đông đặc phế nang và suy hô hấp.',
    treatment: {
      antimicrobialRegimen: [
        'Bệnh nhân điều trị nội trú thông thường: Amoxicillin/Clavulanate 1g IV mỗi 8 giờ PHỐI HỢP Azithromycin 500mg IV/PO mỗi ngày',
        'Hoặc đơn trị liệu Levofloxacin 750mg IV/PO mỗi 24 giờ (hoặc Moxifloxacin 400mg)',
        'Trường hợp viêm phổi nặng cần nhập ICU: Ceftriaxone 2g IV/ngày + Levofloxacin 750mg IV/ngày',
      ],
      supportiveCare: [
        'Liệu pháp oxy duy trì SpO2 từ 94% - 98% (hoặc 88-92% ở bệnh nhân COPD)',
        'Vỗ rung lồng ngực, hướng dẫn ho khạc đờm và tập thở sâu',
        'Uống đủ nước, dùng thuốc long đờm acetylcysteine',
      ],
      warnings: [
        'SpO2 giảm < 90% khi thở khí phòng, nhịp thở > 30 lần/phút',
        'Đau ngực dữ dội kèm tiếng cọ màng phổi hoặc tràn dịch màng phổi lượng nhiều',
      ],
    },
    confirmativeTests: [
      'Chụp X-quang ngực thẳng hoặc CT ngực độ phân giải cao',
      'Nhuộm Gram và cấy đờm buổi sáng trước khi dùng kháng sinh',
      'Xét nghiệm kháng nguyên phế cầu và Legionella trong nước tiểu',
    ],
  },
  {
    id: 'd_dengue_fever',
    name: 'Sốt xuất huyết Dengue cảnh báo (Dengue Hemorrhagic Fever)',
    icdCode: 'A91',
    category: 'Bệnh truyền nhiễm do virus',
    severity: 'high',
    description:
      'Bệnh truyền nhiễm cấp tính do virus Dengue lây truyền qua muỗi Aedes aegypti, có nguy cơ thoát huyết tương dẫn đến cô đặc máu, giảm tiểu cầu và sốc giảm thể tích vào ngày thứ 3 đến ngày thứ 7 của bệnh.',
    treatment: {
      antimicrobialRegimen: [
        'KHÔNG dùng kháng sinh (bệnh do virus Dengue gây ra, kháng sinh không có tác dụng)',
        'CHỐNG CHỈ ĐỊNH TUYỆT ĐỐI Aspirin, Ibuprofen và các thuốc NSAIDs (nguy cơ xuất huyết tiêu hóa ồ ạt)',
        'Chỉ dùng Paracetamol hạ sốt liều 10-15 mg/kg mỗi 4-6 giờ, tối đa 3g/ngày ở người lớn',
      ],
      supportiveCare: [
        'Bù dịch sớm đường uống: Oresol pha đúng tỉ lệ, nước dừa, nước hoa quả tươi',
        'Khi có dấu hiệu cảnh báo (nôn nhiều, đau bụng vùng gan, Hct tăng cao): Truyền dịch Ringer Lactate theo phác đồ hướng dẫn của Bộ Y tế',
        'Theo dõi sát công thức máu (Hematocrit và Tiểu cầu) mỗi 12-24 giờ',
      ],
      warnings: [
        'Đau bụng nhiều và liên tục vùng gan, nôn ói liên tục',
        'Chảy máu cam, nôn ra máu, đi ngoài phân đen',
        'Chân tay lạnh ẩm, bồn chồn li bì (dấu hiệu bắt đầu sốc Dengue)',
      ],
    },
    confirmativeTests: [
      'Xét nghiệm kháng nguyên NS1 (trong 1-4 ngày đầu) hoặc kháng thể IgM/IgG Dengue (từ ngày thứ 5)',
      'Công thức máu theo dõi chỉ số Hematocrit và số lượng tiểu cầu',
      'Siêu âm ổ bụng tìm dịch màng bụng, dịch màng phổi và dày thành túi mật',
    ],
  },
  {
    id: 'd_acute_pyelonephritis',
    name: 'Viêm đài bể thận cấp tính (Acute Pyelonephritis)',
    icdCode: 'N10',
    category: 'Nhiễm trùng đường tiết niệu',
    severity: 'high',
    description:
      'Nhiễm trùng đường tiết niệu trên cấp tính vi khuẩn ngược dòng từ bàng quang lên thận, thường do vi khuẩn đường ruột E. coli hoặc Proteus mirabilis.',
    treatment: {
      antimicrobialRegimen: [
        'Ciprofloxacin 400mg IV mỗi 12 giờ (hoặc Levofloxacin 750mg IV mỗi 24 giờ)',
        'Hoặc Ceftriaxone 1-2g IV mỗi 24 giờ nếu có tỷ lệ kháng Quinolone cao tại địa phương',
        'Chuyển sang kháng sinh đường uống khi bệnh nhân hết sốt 48 giờ và dung nạp thuốc',
        'Tổng thời gian điều trị thông thường từ 7 đến 14 ngày',
      ],
      supportiveCare: [
        'Truyền bù dịch tĩnh mạch đảm bảo thể tích nước tiểu đạt > 1.5 - 2 lít/ngày',
        'Thuốc giảm đau chống co thắt cơ trơn (Drotaverine hoặc Spasfon)',
        'Hạ sốt và nghỉ ngơi tại giường',
      ],
      warnings: [
        'Sốt cao rét run không dứt sau 72 giờ điều trị đúng kháng sinh (nghi ngờ áp xe thận hoặc sỏi gây tắc nghẽn)',
        'Vô niệu hoặc thiểu niệu kèm creatinine huyết thanh tăng nhanh',
      ],
    },
    confirmativeTests: [
      'Tổng phân tích nước tiểu (bạch cầu niệu, nitrite dương tính, protein niệu nhẹ)',
      'Cấy nước tiểu định lượng vi khuẩn (≥ 10^5 CFU/mL) và làm kháng sinh đồ',
      'Siêu âm hệ tiết niệu loại trừ sỏi gây bế tắc dòng tiểu hoặc áp xe thận',
    ],
  },
  {
    id: 'd_acute_appendicitis',
    name: 'Viêm ruột thừa cấp tính (Acute Appendicitis)',
    icdCode: 'K35.8',
    category: 'Cấp cứu ngoại khoa tiêu hóa',
    severity: 'high',
    description:
      'Tình trạng viêm tắc nghẽn lòng ruột thừa cấp tính, cần được chẩn đoán sớm và can thiệp phẫu thuật cắt bỏ ruột thừa trước khi hoại tử vỡ gây viêm phúc mạc toàn thể.',
    treatment: {
      antimicrobialRegimen: [
        'Kháng sinh phổ rộng dự phòng và điều trị trước phẫu thuật: Cefoxitin 2g IV hoặc Ceftriaxone 1g IV PHỐI HỢP Metronidazole 500mg IV',
        'Kháng sinh không thay thế được phẫu thuật cấp cứu ngoại khoa',
      ],
      supportiveCare: [
        'NHỊN ĂN UỐNG HOÀN TOÀN để chuẩn bị gây mê phẫu thuật',
        'Lập đường truyền tĩnh mạch bù dịch tinh thể Ringer Lactate',
        'Chỉ định phẫu thuật nội soi cắt ruột thừa cấp cứu trong vòng 12-24 giờ đầu',
      ],
      warnings: [
        'Cơn đau đột ngột dịu đi rồi sau đó lan rộng khắp ổ bụng kèm bụng cứng như gỗ (dấu hiệu ruột thừa đã vỡ gây viêm phúc mạc)',
        'Sốt cao vọt, mạch nhanh nhỏ, rét run',
      ],
    },
    confirmativeTests: [
      'Siêu âm ổ bụng hố chậu phải (đường kính ruột thừa > 6mm, thành dày, hình ảnh bia bắn, có sỏi phân)',
      'Chụp CT bụng có cản quang trong các trường hợp không điển hình hoặc người cao tuổi',
      'Bạch cầu máu tăng cao chuyển trái (Neutrophil > 75%)',
    ],
  },
  {
    id: 'd_acute_pancreatitis',
    name: 'Viêm tụy cấp tính (Acute Pancreatitis)',
    icdCode: 'K85.9',
    category: 'Cấp cứu tiêu hóa - Gan mật tụy',
    severity: 'critical',
    description:
      'Quá trình viêm cấp tính của tuyến tụy do tự tiêu hủy men tụy, thường khởi phát sau bữa ăn thịnh soạn nhiều rượu bia hoặc do sỏi đường mật rơi vào ống tụy.',
    treatment: {
      antimicrobialRegimen: [
        'Không dùng kháng sinh thường quy cho viêm tụy cấp thể phù nề',
        'Chỉ dùng kháng sinh thấm tốt mô tụy (Meropenem 1g IV mỗi 8h hoặc Ciprofloxacin + Metronidazole) khi có bằng chứng hoại tử tụy nhiễm trùng',
      ],
      supportiveCare: [
        'Hồi sức dịch tích cực trong 24 giờ đầu: Ringer Lactate 200-500 mL/giờ theo mục tiêu hematocrit và lượng nước tiểu',
        'Giảm đau kiểm soát tốt (dùng thuốc giảm đau opioid như Fentanyl hoặc Tramadol)',
        'Nuôi dưỡng đường tiêu hóa sớm qua ống thông khi bệnh nhân bớt đau bụng và nôn',
      ],
      warnings: [
        'Khó thở, thiếu oxy máu (Hội chứng suy hô hấp cấp tiến triển ARDS)',
        'Dấu hiệu Cullen (bầm tím quanh rốn) hoặc Grey-Turner (bầm tím hai bên mạn sườn) biểu hiện viêm tụy hoại tử xuất huyết nặng',
      ],
    },
    confirmativeTests: [
      'Định lượng Lipase hoặc Amylase huyết thanh tăng trên 3 lần giới hạn trên bình thường',
      'Chụp CT Scanner ổ bụng có tiêm thuốc cản quang (đánh giá chỉ số Balthazar)',
      'Siêu âm ổ bụng tầm soát sỏi túi mật và sỏi ống mật chủ',
    ],
  },
  {
    id: 'd_influenza',
    name: 'Cúm mùa cấp tính (Influenza A/B)',
    icdCode: 'J10.1',
    category: 'Nhiễm trùng đường hô hấp do virus',
    severity: 'medium',
    description:
      'Nhiễm trùng đường hô hấp cấp do virus cúm (Influenza type A hoặc B), lây truyền mạnh qua giọt bắn đường hô hấp với triệu chứng toàn thân rầm rộ.',
    treatment: {
      antimicrobialRegimen: [
        'Thuốc kháng virus ức chế neuraminidase: Oseltamivir (Tamiflu) 75mg uống 2 lần/ngày trong 5 ngày (hiệu quả nhất khi dùng trong vòng 48 giờ đầu khởi phát)',
        'Không dùng kháng sinh trừ khi có bằng chứng bội nhiễm vi khuẩn thứ phát (đờm mủ đục, sốt tái phát trở lại)',
      ],
      supportiveCare: [
        'Nghỉ ngơi cách ly tại phòng thông thoáng, uống nhiều nước ấm',
        'Hạ sốt giảm đau cơ bằng Paracetamol',
        'Xúc họng nước muối sinh lý, nhỏ mũi giảm sung huyết',
      ],
      warnings: [
        'Khó thở tăng dần, đau tức ngực, thở rít',
        'Sốt hạ rồi đột ngột sốt cao trở lại kèm ho đờm mủ (nghi ngờ bội nhiễm viêm phổi do phế cầu hoặc tụ cầu)',
      ],
    },
    confirmativeTests: [
      'Test nhanh kháng nguyên cúm A/B dịch quẹt tỵ hầu',
      'Real-time RT-PCR phát hiện virus cúm nếu bệnh nhân có nguy cơ cao',
    ],
  },
  {
    id: 'd_malaria',
    name: 'Sốt rét lâm sàng / Sốt rét ác tính (Malaria)',
    icdCode: 'B54',
    category: 'Bệnh truyền nhiễm do ký sinh trùng',
    severity: 'critical',
    description:
      'Bệnh truyền nhiễm do ký sinh trùng Plasmodium (đặc biệt Plasmodium falciparum) truyền qua muỗi Anopheles, có thể gây tan máu cấp tính, tắc nghẽn vi mạch và sốt rét thể não đe dọa tính mạng.',
    treatment: {
      antimicrobialRegimen: [
        'Sốt rét thông thường (P. falciparum): Thuốc phối hợp gốc Artemisinin (ACT) như Dihydroartemisinin - Piperaquine trong 3 ngày',
        'Nếu do P. vivax: Điều trị ACT kết hợp bổ sung Primaquine 14 ngày để diệt thể ngủ trong gan chống tái phát (kiểm tra G6PD trước khi dùng)',
        'Sốt rét ác tính: Artesunate tiêm tĩnh mạch 2.4 mg/kg tại các thời điểm 0h, 12h, 24h và sau đó mỗi ngày',
      ],
      supportiveCare: [
        'Hạ sốt, lau mát, kiểm soát co giật bằng Diazepam nếu có sốt cao co giật',
        'Theo dõi sát đường huyết mao mạch (nguy cơ hạ đường huyết nặng do ký sinh trùng và do thuốc Quinine/Artesunate)',
        'Truyền khối hồng cầu nếu thiếu máu nặng (Hemoglobin < 7 g/dL)',
      ],
      warnings: [
        'Bệnh nhân lơ mơ, hôn mê, co giật (Sốt rét thể não)',
        'Tiểu ra nước tiểu đen sẫm như xì dầu (đái huyết cầu tố do tan máu ồ ạt)',
      ],
    },
    confirmativeTests: [
      'Kéo giọt máu đặc và lam mỏng nhuộm Giemsa soi tìm ký sinh trùng sốt rét dưới kính hiển vi',
      'Test nhanh phát hiện kháng nguyên sốt rét (RDT Malaria Ag)',
    ],
  },
  {
    id: 'd_acute_hepatitis',
    name: 'Viêm gan virus cấp tính (Acute Viral Hepatitis)',
    icdCode: 'B17.9',
    category: 'Bệnh lý gan mật',
    severity: 'medium',
    description:
      'Tổn thương hoại tử tế bào gan cấp tính do virus hướng gan (Hepatitis A, B, E), biểu hiện mệt mỏi suy nhược, chán ăn, vàng da vàng mắt và tăng vọt men gan.',
    treatment: {
      antimicrobialRegimen: [
        'Đa số các trường hợp điều trị hỗ trợ, không cần thuốc kháng virus đặc hiệu (đặc biệt viêm gan A và E thường tự khỏi)',
        'Nếu viêm gan B cấp thể bão hòa/nặng có nguy cơ suy gan: Cân nhắc Tenofovir disoproxil hoặc Entecavir',
      ],
      supportiveCare: [
        'Nghỉ ngơi hoàn toàn tại giường trong giai đoạn vàng da cấp',
        'Chế độ ăn giàu đạm dễ tiêu, nhiều đường hoa quả, kiêng tuyệt đối rượu bia và các thuốc độc cho gan',
        'Bổ sung vitamin nhóm B, vitamin C và dung dịch acid amin phân nhánh nếu cần',
      ],
      warnings: [
        'Thời gian Prothrombin (PT/INR) kéo dài INR > 1.5 kèm lú lẫn, run vỗ cánh (dấu hiệu suy gan cấp và bệnh não gan)',
        'Bụng chướng báng bụng xuất hiện nhanh',
      ],
    },
    confirmativeTests: [
      'Bộ xét nghiệm huyết thanh học virus: Anti-HAV IgM, HBsAg, Anti-HBc IgM, Anti-HCV, Anti-HEV IgM',
      'Men gan AST, ALT, Bilirubin toàn phần/trực tiếp, đông máu cơ bản PT/INR',
    ],
  },
];

export const DEFAULT_RULES: MycinRule[] = [
  // Viêm màng não mủ
  {
    id: 'RULE_MENING_01',
    name: 'Tam chứng màng não kinh điển',
    diseaseId: 'd_meningitis',
    premises: ['s_sot_cao', 's_co_cung', 's_dau_dau_du_doi'],
    ruleCf: 0.85,
    rationale: 'Sự hiện diện đồng thời của sốt cao, cổ cứng và đau đầu dữ dội là tam chứng màng não lâm sàng có giá trị chẩn đoán xác định rất cao.',
  },
  {
    id: 'RULE_MENING_02',
    name: 'Hội chứng tăng áp lực nội sọ kèm dấu màng não',
    diseaseId: 'd_meningitis',
    premises: ['s_co_cung', 's_non_vot', 's_so_anh_sang'],
    ruleCf: 0.78,
    rationale: 'Nôn vọt phối hợp sợ ánh sáng và gáy cứng phản ánh tình trạng kích thích màng não và tăng áp lực nội sọ cấp tính.',
  },
  {
    id: 'RULE_MENING_03',
    name: 'Dịch não tủy đục xác nhận viêm màng não vi khuẩn',
    diseaseId: 'd_meningitis',
    premises: ['s_sot_cao', 's_dich_nao_tuy_duc'],
    ruleCf: 0.95,
    rationale: 'Dịch não tủy đục kèm sốt cao là tiêu chuẩn vàng khẳng định nhiễm khuẩn mủ khoang dưới nhện.',
  },
  {
    id: 'RULE_MENING_04',
    name: 'Nhiễm não mô cầu tối cấp',
    diseaseId: 'd_meningitis',
    premises: ['s_sot_cao', 's_ban_dinh_vi_meningococcemia'],
    ruleCf: 0.92,
    rationale: 'Ban hoại tử hình sao lan nhanh xuất hiện cùng cơn sốt cao là dấu hiệu đặc hiệu của nhiễm trùng não mô cầu thể bão hòa.',
  },

  // Nhiễm khuẩn huyết Gram âm
  {
    id: 'RULE_SEPSIS_GN_01',
    name: 'Hội chứng phản ứng viêm toàn thân và suy tuần hoàn',
    diseaseId: 'd_sepsis_gram_neg',
    premises: ['s_sot_ret_run', 's_ha_huyet_ap', 's_mach_nhanh_nho'],
    ruleCf: 0.88,
    rationale: 'Sốt rét run kèm tụt huyết áp và mạch nhanh nhỏ phản ánh tình trạng sốc nhiễm khuẩn đe dọa tính mạng.',
  },
  {
    id: 'RULE_SEPSIS_GN_02',
    name: 'Nhiễm khuẩn huyết từ ổ nhiễm trùng tiết niệu - thận',
    diseaseId: 'd_sepsis_gram_neg',
    premises: ['s_sot_ret_run', 's_tieu_buot_tieu_rat', 's_ha_huyet_ap'],
    ruleCf: 0.84,
    rationale: 'Vi khuẩn Gram âm đường tiết niệu (như E. coli) là nguồn căn nguyên hàng đầu gây nhiễm khuẩn huyết ngược dòng.',
  },
  {
    id: 'RULE_SEPSIS_GN_03',
    name: 'Cấy máu khẳng định nhiễm khuẩn huyết',
    diseaseId: 'd_sepsis_gram_neg',
    premises: ['s_cay_mau_vi_khuan', 's_bach_cau_tang_cao'],
    ruleCf: 0.94,
    rationale: 'Cấy máu phân lập vi khuẩn kèm bạch cầu tăng chuyển trái xác nhận tình trạng du khuẩn huyết và phản ứng viêm toàn thân.',
  },
  {
    id: 'RULE_SEPSIS_GN_04',
    name: 'Dấu hiệu giảm tưới máu tổ chức ngoại vi trong sốc nhiễm trùng',
    diseaseId: 'd_sepsis_gram_neg',
    premises: ['s_ha_huyet_ap', 's_da_tai_lanh_noi_van'],
    ruleCf: 0.82,
    rationale: 'Hạ huyết áp phối hợp nổi vân tím đầu chi là bằng chứng của suy giảm tưới máu vi tuần hoàn nghiêm trọng.',
  },

  // Nhiễm khuẩn huyết Tụ cầu vàng
  {
    id: 'RULE_SEPSIS_SA_01',
    name: 'Nhiễm trùng huyết tụ cầu từ ổ áp xe ngoài da',
    diseaseId: 'd_sepsis_staph',
    premises: ['s_sot_cao', 's_mun_mu_toan_than', 's_bach_cau_tang_cao'],
    ruleCf: 0.86,
    rationale: 'Các mụn nhọt, ổ áp xe mô mềm là ngõ vào kinh điển nhất của tụ cầu vàng (Staphylococcus aureus) vào dòng máu.',
  },
  {
    id: 'RULE_SEPSIS_SA_02',
    name: 'Sốt cao kèm tổn thương da lan tỏa và cấy máu dương tính',
    diseaseId: 'd_sepsis_staph',
    premises: ['s_sot_cao', 's_mun_mu_toan_than', 's_cay_mau_vi_khuan'],
    ruleCf: 0.95,
    rationale: 'Cấy máu dương tính ở bệnh nhân có tổn thương mưng mủ ngoài da khẳng định nhiễm khuẩn huyết tụ cầu.',
  },

  // Viêm phổi mắc phải cộng đồng
  {
    id: 'RULE_CAP_01',
    name: 'Hội chứng đông đặc phế nang và nhiễm trùng hô hấp dưới',
    diseaseId: 'd_cap_pneumonia',
    premises: ['s_sot_cao', 's_ho_dom_ri_sat', 's_dau_nguc_mang_phoi'],
    ruleCf: 0.86,
    rationale: 'Đờm màu rỉ sắt kèm sốt cao và đau ngực kiểu màng phổi là dấu hiệu kinh điển của viêm phổi thùy do phế cầu.',
  },
  {
    id: 'RULE_CAP_02',
    name: 'Ran ẩm nổ kèm khó thở và đờm đặc',
    diseaseId: 'd_cap_pneumonia',
    premises: ['s_rale_am_no', 's_kho_tho_tho_nhanh', 's_ho_dom_ri_sat'],
    ruleCf: 0.84,
    rationale: 'Âm ran phế nang cùng khó thở thở nhanh chỉ điểm tình trạng dịch tiết viêm lấp đầy lòng phế nang.',
  },
  {
    id: 'RULE_CAP_03',
    name: 'X-quang ngực khẳng định đông đặc phổi',
    diseaseId: 'd_cap_pneumonia',
    premises: ['s_sot_cao', 's_xquang_phoi_dam_dac'],
    ruleCf: 0.93,
    rationale: 'Hình ảnh đám mờ thâm nhiễm thùy phổi trên phim X-quang là bằng chứng hình ảnh học quyết định của viêm phổi.',
  },

  // Sốt xuất huyết Dengue
  {
    id: 'RULE_DENGUE_01',
    name: 'Hội chứng sốt xuất huyết kinh điển',
    diseaseId: 'd_dengue_fever',
    premises: ['s_sot_cao', 's_dau_hoc_mat', 's_dau_moi_co_khop'],
    ruleCf: 0.82,
    rationale: 'Sốt cao đột ngột kết hợp đau nhức hai hốc mắt và đau cơ dữ dội là bệnh cảnh lâm sàng điển hình của sốt Dengue.',
  },
  {
    id: 'RULE_DENGUE_02',
    name: 'Dấu hiệu xuất huyết và giảm tiểu cầu',
    diseaseId: 'd_dengue_fever',
    premises: ['s_sot_cao', 's_xuat_huyet_duoi_da', 's_giam_tieu_cau'],
    ruleCf: 0.92,
    rationale: 'Chấm xuất huyết ngoài da kèm số lượng tiểu cầu giảm sâu và Hematocrit tăng là tiêu chuẩn chẩn đoán sốt xuất huyết Dengue thể có cảnh báo.',
  },

  // Viêm đài bể thận cấp
  {
    id: 'RULE_PYELO_01',
    name: 'Hội chứng nhiễm trùng đường tiểu trên',
    diseaseId: 'd_acute_pyelonephritis',
    premises: ['s_sot_ret_run', 's_dau_hong_lung_rung_than', 's_tieu_buot_tieu_rat'],
    ruleCf: 0.90,
    rationale: 'Sốt rét run phối hợp đau vùng hông lưng (rung thận dương tính) và hội chứng bàng quang chỉ điểm viêm đài bể thận cấp.',
  },
  {
    id: 'RULE_PYELO_02',
    name: 'Nước tiểu đục mủ kèm phản ứng hông lưng',
    diseaseId: 'd_acute_pyelonephritis',
    premises: ['s_nuoc_tieu_duc_mau', 's_dau_hong_lung_rung_than'],
    ruleCf: 0.83,
    rationale: 'Nước tiểu có bạch cầu mủ và dấu hiệu kích thích thận là dấu chỉ nhiễm trùng nhu mô thận đài bể thận.',
  },

  // Viêm ruột thừa cấp
  {
    id: 'RULE_APP_01',
    name: 'Đau hố chậu phải kinh điển và phản ứng phúc mạc',
    diseaseId: 'd_acute_appendicitis',
    premises: ['s_dau_bung_ho_chau_phai', 's_phan_ung_thanh_bung'],
    ruleCf: 0.89,
    rationale: 'Đau khu trú tại hố chậu phải kèm phản ứng bảo vệ thành bụng là chỉ định ngoại khoa cấp cứu hàng đầu của viêm ruột thừa.',
  },
  {
    id: 'RULE_APP_02',
    name: 'Bạch cầu tăng cùng điểm McBurney đau',
    diseaseId: 'd_acute_appendicitis',
    premises: ['s_dau_bung_ho_chau_phai', 's_bach_cau_tang_cao'],
    ruleCf: 0.80,
    rationale: 'Bạch cầu máu tăng cao kết hợp cơn đau di chuyển về hố chậu phải gia tăng độ nhạy chẩn đoán viêm ruột thừa cấp.',
  },

  // Viêm tụy cấp
  {
    id: 'RULE_PANC_01',
    name: 'Đau bụng cấp thượng vị xuyên lưng và nôn ói',
    diseaseId: 'd_acute_pancreatitis',
    premises: ['s_dau_thuong_vi_xuyen_lung', 's_buon_non_tieu_chay'],
    ruleCf: 0.81,
    rationale: 'Cơn đau vùng thượng vị lan ra sau lưng kèm buồn nôn liên tục sau bữa ăn giàu đạm hoặc rượu là gợi ý lớn của viêm tụy cấp.',
  },
  {
    id: 'RULE_PANC_02',
    name: 'Tiêu chuẩn sinh hóa Amylase/Lipase khẳng định viêm tụy',
    diseaseId: 'd_acute_pancreatitis',
    premises: ['s_dau_thuong_vi_xuyen_lung', 's_amylase_lipase_tang'],
    ruleCf: 0.96,
    rationale: 'Đau bụng kiểu tụy kết hợp men tụy máu tăng trên 3 lần giá trị bình thường là tiêu chuẩn vàng chẩn đoán viêm tụy cấp.',
  },

  // Cúm mùa
  {
    id: 'RULE_FLU_01',
    name: 'Hội chứng viêm long đường hô hấp trên và đau mỏi cơ',
    diseaseId: 'd_influenza',
    premises: ['s_sot_cao', 's_ho_khan_dau_hong', 's_dau_moi_co_khop'],
    ruleCf: 0.83,
    rationale: 'Khởi phát sốt đột ngột, ho rát họng kèm đau nhức bắp cơ toàn thân là bệnh cảnh kinh điển của virus cúm mùa.',
  },

  // Sốt rét
  {
    id: 'RULE_MALARIA_01',
    name: 'Cơn sốt rét chu kỳ định kỳ',
    diseaseId: 'd_malaria',
    premises: ['s_sot_dinh_ky', 's_sot_ret_run', 's_met_moi_suy_kiet'],
    ruleCf: 0.84,
    rationale: 'Cơn sốt rét run có chu kỳ cách nhật hoặc hàng ngày kèm vã mồ hôi là đặc trưng sinh lý bệnh của ký sinh trùng Plasmodium.',
  },
  {
    id: 'RULE_MALARIA_02',
    name: 'Ký sinh trùng sốt rét trong máu',
    diseaseId: 'd_malaria',
    premises: ['s_sot_ret_run', 's_soi_tim_ky_sinh_trung'],
    ruleCf: 0.98,
    rationale: 'Tìm thấy ký sinh trùng sốt rét trên giọt máu nhuộm soi là tiêu chuẩn khẳng định chắc chắn 100% bệnh sốt rét.',
  },

  // Viêm gan cấp
  {
    id: 'RULE_HEP_01',
    name: 'Hội chứng hoàng đản và hủy hoại tế bào gan',
    diseaseId: 'd_acute_hepatitis',
    premises: ['s_vang_da_vang_mat', 's_met_moi_suy_kiet', 's_men_gan_tang_cao'],
    ruleCf: 0.92,
    rationale: 'Vàng da vàng mắt kèm mệt mỏi chán ăn và men gan tăng cao đột biến phản ánh hoại tử tế bào gan cấp do virus.',
  },
];

export const PRESET_CASES: PresetCase[] = [
  {
    id: 'case_meningitis',
    title: 'Ca 1: Bệnh nhân sốt cao, cổ cứng, đau đầu dữ dội',
    patientProfile: 'Bệnh nhân nam, 24 tuổi, sốt 39.5°C kèm cứng gáy không gập được cằm, đau buốt đầu dữ dội, sợ ánh sáng và nôn vọt 2 lần.',
    expectedDiagnosis: 'Viêm màng não mủ do vi khuẩn',
    symptoms: [
      { symptomId: 's_sot_cao', cf: 1.0 },
      { symptomId: 's_co_cung', cf: 0.9 },
      { symptomId: 's_dau_dau_du_doi', cf: 1.0 },
      { symptomId: 's_so_anh_sang', cf: 0.8 },
      { symptomId: 's_non_vot', cf: 0.7 },
    ],
  },
  {
    id: 'case_sepsis',
    title: 'Ca 2: Sốt rét run, tụt huyết áp, nghi nhiễm khuẩn huyết',
    patientProfile: 'Bệnh nhân nữ, 58 tuổi, sốt rét run bần bật, huyết áp tụt 80/50 mmHg, mạch 124 nhịp/phút, da đầu chi lạnh nổi vân tím, tiểu buốt rắt trước đó 3 ngày.',
    expectedDiagnosis: 'Nhiễm khuẩn huyết Gram âm / Sốc nhiễm khuẩn',
    symptoms: [
      { symptomId: 's_sot_ret_run', cf: 1.0 },
      { symptomId: 's_ha_huyet_ap', cf: 0.95 },
      { symptomId: 's_mach_nhanh_nho', cf: 0.9 },
      { symptomId: 's_da_tai_lanh_noi_van', cf: 0.8 },
      { symptomId: 's_tieu_buot_tieu_rat', cf: 0.85 },
      { symptomId: 's_bach_cau_tang_cao', cf: 0.9 },
    ],
  },
  {
    id: 'case_dengue',
    title: 'Ca 3: Sốt ngày thứ 4, đau hốc mắt, giảm tiểu cầu',
    patientProfile: 'Bệnh nhân 29 tuổi, sốt liên tục 4 ngày, đau buốt sau 2 mắt, đau nhức mình mẩy, xuất hiện chấm xuất huyết dưới cẳng tay, xét nghiệm tiểu cầu 45.000 /µL.',
    expectedDiagnosis: 'Sốt xuất huyết Dengue cảnh báo',
    symptoms: [
      { symptomId: 's_sot_cao', cf: 1.0 },
      { symptomId: 's_dau_hoc_mat', cf: 0.9 },
      { symptomId: 's_dau_moi_co_khop', cf: 0.85 },
      { symptomId: 's_xuat_huyet_duoi_da', cf: 0.9 },
      { symptomId: 's_giam_tieu_cau', cf: 0.95 },
    ],
  },
  {
    id: 'case_pneumonia',
    title: 'Ca 4: Ho đờm rỉ sắt, đau ngực màng phổi, nghe ran ẩm',
    patientProfile: 'Bệnh nhân nam, 62 tuổi, sốt 39°C, ho khạc đờm đặc màu rỉ sắt, đau nhói ngực phải khi hít sâu, nghe phổi có ran nổ khu trú đáy phổi phải.',
    expectedDiagnosis: 'Viêm phổi thùy mắc phải cộng đồng',
    symptoms: [
      { symptomId: 's_sot_cao', cf: 0.9 },
      { symptomId: 's_ho_dom_ri_sat', cf: 1.0 },
      { symptomId: 's_dau_nguc_mang_phoi', cf: 0.85 },
      { symptomId: 's_rale_am_no', cf: 0.9 },
      { symptomId: 's_kho_tho_tho_nhanh', cf: 0.7 },
    ],
  },
  {
    id: 'case_appendicitis',
    title: 'Ca 5: Đau bụng hố chậu phải, phản ứng thành bụng',
    patientProfile: 'Bệnh nhân nữ, 20 tuổi, khởi phát đau âm ỉ quanh rốn sau 6 tiếng chuyển khu trú về hố chậu phải, sốt nhẹ 38°C, ấn điểm McBurney đau chói, thành bụng co cứng nhẹ.',
    expectedDiagnosis: 'Viêm ruột thừa cấp tính',
    symptoms: [
      { symptomId: 's_dau_bung_ho_chau_phai', cf: 1.0 },
      { symptomId: 's_phan_ung_thanh_bung', cf: 0.85 },
      { symptomId: 's_bach_cau_tang_cao', cf: 0.8 },
      { symptomId: 's_buon_non_tieu_chay', cf: 0.5 },
    ],
  },
];
