
import React, { useState } from 'react';
import { 
  AppraisalReport, 
  AppraisalResult, 
  WatchStatus, 
  PerformanceStatus 
} from './types';

// 準備模擬數據以供展示
const MOCK_REPORT: AppraisalReport = {
  brand: 'Rolex 勞力士',
  warrantyDate: '2023年05月12日',
  modelNumber: '126610LV',
  serialNumber: 'V82J9102',
  overallResult: AppraisalResult.COMPLIANT,
  movementResult: AppraisalResult.COMPLIANT,
  cardResult: AppraisalResult.COMPLIANT,
  packageResult: AppraisalResult.COMPLIANT,
  status: {
    case: WatchStatus.NORMAL,
    strap: WatchStatus.NONE,
    crystal: WatchStatus.NONE,
    caseback: WatchStatus.NORMAL,
    hands: WatchStatus.NONE,
    crown: WatchStatus.NONE,
    buckle: WatchStatus.NORMAL,
    dial: WatchStatus.NONE,
  },
  performance: {
    function: PerformanceStatus.NORMAL,
    movement: PerformanceStatus.ACCEPTABLE_ERROR,
    waterproof: PerformanceStatus.WATERPROOF_PASS,
  },
  notes: '經精密鑑定，此腕錶所有外觀零件及機芯均符合原廠工藝標準。錶殼及錶扣有極輕微使用痕跡，整體品相優異，功能運作正常。',
  tags: ['極佳品相', '全套原裝'],
  photos: {
    front: 'https://imagefile2.aristohk.com/ROLEX-126500LN-0002-1726208478667-1.webp',
    back: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800',
    buckle: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=800',
    card: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=800',
    others: [
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=800'
    ],
  },
};

const LOGO_URL = 'https://agwatchrepair.com.hk/wp-content/uploads/2025/12/AG-LOGO_NEW.png';

const AuthenticStamp = () => (
  <div className="absolute -top-3 -right-3 z-20 pointer-events-none opacity-60 transform rotate-12 scale-75 sm:scale-90">
    <div className="border-[4px] border-green-500 rounded-full w-28 h-28 flex items-center justify-center flex-col p-1 bg-white/20 backdrop-blur-[1px]">
      <div className="border-[1.5px] border-green-500 rounded-full w-full h-full flex items-center justify-center flex-col">
        <span className="text-green-600 font-black text-xl tracking-tighter uppercase leading-none">Authentic</span>
        <div className="h-[1.5px] w-2/3 bg-green-500 my-1"></div>
        <span className="text-green-600 font-bold text-[7px] tracking-[0.2em] uppercase">AG Appraisal</span>
      </div>
    </div>
  </div>
);

export default function App() {
  const [report] = useState<AppraisalReport>(MOCK_REPORT);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // 匯總所有照片用於滾動展示
  const allPhotos = [
    { url: report.photos.front, label: '正面' },
    { url: report.photos.back, label: '背面' },
    { url: report.photos.buckle, label: '錶扣' },
    { url: report.photos.card, label: '保卡/附件' },
    ...report.photos.others.map((url, i) => ({ url, label: `細節 ${i + 1}` }))
  ].filter(p => p.url);

  const SectionTitle = ({ children, icon }: { children: React.ReactNode; icon: string }) => (
    <div className="flex items-center space-x-2 mb-4">
      <span className="material-icons-round text-primary text-xl">{icon}</span>
      <h3 className="font-bold text-gray-900 text-lg">{children}</h3>
    </div>
  );

  const StatusItem = ({ label, status }: { label: string; status: string }) => (
    <div className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500 font-medium">{label}</span>
      <span className={`text-sm font-bold ${status.includes('不符合') ? 'text-red-600' : 'text-primary'}`}>{status}</span>
    </div>
  );

  const DetailGridItem = ({ label, val }: { label: string; val: string }) => (
    <div className="flex flex-col space-y-1 bg-gray-50/50 p-2.5 rounded-lg border border-gray-100">
      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{label}</span>
      <span className="text-xs font-bold text-gray-800">{val}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F1F3F6] pb-12 font-sans relative">
      <div className="watermark">AG APPRAISAL</div>

      {/* 頂部導航與 Logo */}
      <header className="bg-white pt-6 pb-5 px-4 flex flex-col items-center border-b border-border-light shadow-sm sticky top-0 z-50">
        <img src={LOGO_URL} alt="AG Logo" className="h-12 object-contain mb-3" />
        <p className="text-[15px] tracking-[0.4em] text-primary font-black drop-shadow-sm">手錶鑒定報告</p>
      </header>

      <main className="max-w-md mx-auto px-4 mt-6 space-y-6 relative z-10">
        
        {/* 手錶高級藝廊展示 */}
        <section className="bg-white rounded-[2rem] overflow-hidden report-card border border-border-light relative">
          {/* 主圖展示區 */}
          <div className="aspect-square w-full relative bg-gray-100 overflow-hidden group">
            <img 
              key={allPhotos[activePhotoIndex]?.url}
              src={allPhotos[activePhotoIndex]?.url || ''} 
              alt="Watch Detail" 
              className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-500"
            />
            <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg z-30">
              鑑定編號: #20240325-001
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase z-30">
              {allPhotos[activePhotoIndex]?.label}
            </div>
          </div>
          
          {/* 橫向滾動縮圖 */}
          <div className="p-4 border-t border-gray-50">
            <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-1 snap-x">
              {allPhotos.map((photo, index) => (
                <button 
                  key={index}
                  onClick={() => setActivePhotoIndex(index)}
                  className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden snap-start transition-all duration-300 border-2 ${
                    activePhotoIndex === index 
                      ? 'border-primary scale-105 shadow-md' 
                      : 'border-transparent opacity-50 grayscale'
                  }`}
                >
                  <img src={photo.url} className="w-full h-full object-cover" alt="thumbnail" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 1. 基本資料 */}
        <section className="bg-white rounded-[1.5rem] p-6 report-card border border-border-light relative">
          <SectionTitle icon="info">基本資料</SectionTitle>
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h2 className="text-2xl font-bold text-primary">{report.brand}</h2>
              <p className="text-gray-500 font-bold tracking-tight">{report.modelNumber}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">序號 Serial No.</p>
                <p className="text-sm font-bold text-gray-800">{report.serialNumber}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">保卡日期 Date</p>
                <p className="text-sm font-bold text-gray-800">{report.warrantyDate}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. 核心鑑定結果 */}
        <section className="bg-white rounded-[1.5rem] p-6 report-card border border-border-light relative">
          {/* 鑑定合格印章 */}
          <AuthenticStamp />
          
          <SectionTitle icon="verified">核心鑑定結果</SectionTitle>
          <div className="space-y-1">
            <StatusItem label="整體手錶鑑定" status={report.overallResult} />
            <StatusItem label="內部機芯鑑定" status={report.movementResult} />
            <StatusItem label="官方保卡鑑定" status={report.cardResult} />
            <StatusItem label="外盒及附件鑑定" status={report.packageResult} />
          </div>
        </section>

        {/* 3. 部位詳細狀態 */}
        <section className="bg-white rounded-[1.5rem] p-6 report-card border border-border-light">
          <SectionTitle icon="zoom_in">部位詳細狀態</SectionTitle>
          <div className="grid grid-cols-2 gap-3">
            <DetailGridItem label="錶殼" val={report.status.case} />
            <DetailGridItem label="錶帶" val={report.status.strap} />
            <DetailGridItem label="鏡面" val={report.status.crystal} />
            <DetailGridItem label="錶底鏡面" val={report.status.caseback} />
            <DetailGridItem label="指針" val={report.status.hands} />
            <DetailGridItem label="錶冠" val={report.status.crown} />
            <DetailGridItem label="錶扣" val={report.status.buckle} />
            <DetailGridItem label="錶盤" val={report.status.dial} />
          </div>
        </section>

        {/* 4. 功能與性能表現 */}
        <section className="bg-white rounded-[1.5rem] p-6 report-card border border-border-light">
          <SectionTitle icon="speed">功能與性能表現</SectionTitle>
          <div className="space-y-2">
             <StatusItem label="手錶功能" status={report.performance.function} />
             <StatusItem label="走時精準度" status={report.performance.movement} />
             <StatusItem label="防水測試" status={report.performance.waterproof} />
          </div>
        </section>

        {/* 5. 鑑定師簽署 (原附註內) */}
        <section className="bg-white rounded-[1.5rem] p-6 report-card border border-border-light">
          <SectionTitle icon="description">鑑定附註</SectionTitle>
          <div className="text-sm text-gray-600 leading-relaxed bg-primary/[0.03] p-5 rounded-2xl border border-primary/10 italic">
            "{report.notes}"
          </div>

          {/* 簽名與日期區 */}
          <div className="mt-10 pt-8 border-t border-gray-100 flex justify-between items-end">
            <div className="space-y-1">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">鑑定師 Appraiser</p>
              <p className="text-2xl font-signature text-primary">Nic Chan</p>
              <p className="text-[10px] text-primary/60 font-bold uppercase">Senior Horologist</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">發佈日期 Issued</p>
              <p className="text-xs font-bold text-gray-800">2024年03月25日</p>
            </div>
          </div>
        </section>

        {/* 6. 免責條款 */}
        <section className="bg-white rounded-[1.5rem] p-6 report-card border border-border-light">
          <SectionTitle icon="gavel">免責條款</SectionTitle>
          <div className="text-xs text-gray-500 leading-loose space-y-3">
            <p>
              本報告僅反映手錶於檢查當時之狀態及真偽意見，並非法律承諾或保證。若因技術限制、後續人為改裝或零件替換所致之差異，本公司概不負責。
            </p>
            <p className="pt-2 border-t border-gray-50">
              詳細責任限制與鑑定範圍請參閱完整 <a href="#" className="text-primary font-bold underline decoration-primary/30 underline-offset-4 hover:decoration-primary transition-all">免責條款</a>。
            </p>
          </div>
        </section>

        {/* 頁尾動作按鈕 */}
        <footer className="px-6 py-8 text-center space-y-6">
           <div className="flex justify-center space-x-4">
             <button className="flex flex-col items-center group">
               <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:border-primary transition-all shadow-sm">
                 <span className="material-icons-round text-xl">share</span>
               </div>
               <span className="text-[9px] mt-2 text-gray-400 font-bold uppercase">分享報告</span>
             </button>
             <button className="flex flex-col items-center group">
               <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white transition-all shadow-lg group-hover:scale-105">
                 <span className="material-icons-round text-xl">file_download</span>
               </div>
               <span className="text-[9px] mt-2 text-primary font-bold uppercase">下載報告</span>
             </button>
           </div>

           {/* 地址及聯絡資訊 */}
           <div className="space-y-1.5 py-4 border-t border-gray-100/50">
             <p className="text-[11px] text-gray-500 flex items-center justify-center font-medium">
               <span className="material-icons-round text-[14px] mr-1.5 text-primary/40">location_on</span>
               尖沙咀寶勒巷3號萬事昌廣場20樓10室
             </p>
             <p className="text-[11px] text-gray-500 flex items-center justify-center font-bold">
               <span className="material-icons-round text-[14px] mr-1.5 text-primary/40">phone</span>
               <a href="tel:+85253032636" className="text-primary hover:underline">+852 5303 2636</a>
             </p>
           </div>

           <p className="text-[9px] text-gray-300 font-bold tracking-widest uppercase">
             © 2025 AG INTERNATIONAL LUXURY APPRAISAL CENTER
           </p>
        </footer>
      </main>
    </div>
  );
}
