
import React, { useState } from 'react';
import { 
  AppraisalReport, 
  AppraisalResult, 
  WatchStatus, 
  PerformanceStatus 
} from './types';

// 使用模擬數據展示 View 模式
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
  notes: '經鑑定，此腕錶所有外觀零件及機芯均符合原廠工藝標準。錶殼及錶扣有極輕微使用痕跡，整體品相優異，功能運作正常。',
  tags: ['極佳品相', '全套原裝'],
  photos: {
    front: 'https://images.unsplash.com/photo-1547996160-81dfa63595dd?auto=format&fit=crop&q=80&w=800', // 示例圖
    others: [],
  },
};

const LOGO_URL = 'https://generativelanguage.googleapis.com/v1beta/files/sc87z82u02h0'; // 這是您提供的 Logo

export default function App() {
  const [report] = useState<AppraisalReport>(MOCK_REPORT);

  const StatusItem = ({ label, status }: { label: string; status: string }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`text-sm font-medium ${status.includes('不符合') ? 'text-red-600' : 'text-gray-900'}`}>{status}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-background-light pb-12 font-sans relative overflow-hidden">
      <div className="watermark">AG APPRAISAL</div>

      {/* 頂部 Logo 區 */}
      <header className="bg-white pt-6 pb-4 px-4 flex flex-col items-center border-b border-border-light shadow-sm">
        <img src={LOGO_URL} alt="AG Logo" className="h-14 object-contain mb-2" />
        <p className="text-[10px] tracking-[0.2em] text-primary font-bold opacity-80 uppercase">Authenticity Guaranteed</p>
      </header>

      <main className="max-w-md mx-auto px-4 mt-6 space-y-6 relative z-10">
        
        {/* 手錶英雄展示區 */}
        <section className="bg-white rounded-2xl overflow-hidden report-card border border-border-light">
          <div className="aspect-[4/3] w-full relative bg-gray-100">
            <img 
              src={report.photos.front || 'https://via.placeholder.com/800x600?text=No+Image'} 
              alt="Watch Front" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
              鑑定編號: #20240325-001
            </div>
          </div>
          
          <div className="p-5 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-primary">{report.brand}</h2>
              <p className="text-gray-500 font-medium">{report.modelNumber}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-xl">
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">序號 Serial No.</p>
                <p className="text-sm font-bold text-gray-800">{report.serialNumber}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">保卡日期 Date</p>
                <p className="text-sm font-bold text-gray-800">{report.warrantyDate}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 鑑定結論 */}
        <section className="bg-white rounded-2xl p-5 report-card border border-border-light space-y-4">
          <div className="flex items-center space-x-2">
            <span className="material-icons-round text-primary">verified</span>
            <h3 className="font-bold text-gray-900">核心鑑定結果</h3>
          </div>
          <div className="space-y-1">
            <StatusItem label="整體原廠工藝鑑定" status={report.overallResult} />
            <StatusItem label="內部機芯鑑定" status={report.movementResult} />
            <StatusItem label="官方保證卡鑑定" status={report.cardResult} />
            <StatusItem label="外盒及附件鑑定" status={report.packageResult} />
          </div>
        </section>

        {/* 部位詳細狀態 - 網格顯示 */}
        <section className="bg-white rounded-2xl p-5 report-card border border-border-light">
          <div className="flex items-center space-x-2 mb-4">
            <span className="material-icons-round text-primary">zoom_in</span>
            <h3 className="font-bold text-gray-900">部位詳細狀態</h3>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            {[
              { label: '錶殼', val: report.status.case },
              { label: '錶帶', val: report.status.strap },
              { label: '鏡面', val: report.status.crystal },
              { label: '指針', val: report.status.hands },
              { label: '錶盤', val: report.status.dial },
              { label: '錶扣', val: report.status.buckle },
            ].map((item) => (
              <div key={item.label} className="flex flex-col space-y-1">
                <span className="text-[10px] text-gray-400 uppercase">{item.label}</span>
                <span className="text-xs font-medium text-gray-800">{item.val}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 性能檢測 */}
        <section className="bg-white rounded-2xl p-5 report-card border border-border-light">
          <div className="flex items-center space-x-2 mb-4">
            <span className="material-icons-round text-primary">speed</span>
            <h3 className="font-bold text-gray-900">功能與性能表現</h3>
          </div>
          <div className="space-y-3">
             <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">走時精準度</span>
                <span className="text-xs font-bold text-primary bg-primary/5 px-2 py-1 rounded">{report.performance.movement}</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">防水測試 (氣密)</span>
                <span className="text-xs font-bold text-primary bg-primary/5 px-2 py-1 rounded">{report.performance.waterproof}</span>
             </div>
          </div>
        </section>

        {/* 鑑定附註 */}
        <section className="bg-white rounded-2xl p-5 report-card border border-border-light space-y-4">
          <div className="flex items-center space-x-2">
            <span className="material-icons-round text-primary">description</span>
            <h3 className="font-bold text-gray-900">鑑定附註</h3>
          </div>
          <div className="text-sm text-gray-600 leading-relaxed bg-primary/[0.02] p-4 rounded-xl border border-primary/10 italic">
            "{report.notes}"
          </div>
          <div className="flex flex-wrap gap-2">
            {report.tags.map(tag => (
              <span key={tag} className="text-[10px] px-2 py-1 bg-gray-100 text-gray-500 rounded font-bold">#{tag}</span>
            ))}
          </div>

          {/* 分隔線 */}
          <div className="pt-6 border-t border-gray-200">
            <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">重要聲明 Disclaimer</h4>
            <div className="text-[9px] text-gray-400 leading-normal space-y-2">
              <p>1. 本報告僅代表本鑑定中心在檢測當下，根據物件現況所作之專業技術評估，不代表該物件之市場估價或未來之增值保證。</p>
              <p>2. 鑑定結果僅對檢測物件本身負責。若物件經二次拆解、改裝或人為破壞，本報告即行失效。</p>
              <p>3. 鑑定數據受限於檢測設備之精確度及當時之環境因素，可能存在微小誤差，僅供參考。</p>
            </div>
          </div>

          {/* 鑑定師簽名 */}
          <div className="pt-8 flex justify-between items-end">
            <div className="space-y-1">
              <p className="text-[10px] text-gray-400 uppercase">鑑定師 Appraiser</p>
              <p className="text-xl font-signature text-primary">David Chen</p>
              <p className="text-[10px] text-gray-500 font-bold">高級鐘錶鑑定專家</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 uppercase">發佈日期 Issued on</p>
              <p className="text-xs font-bold text-gray-800">2024年03月25日</p>
            </div>
          </div>
        </section>

        <footer className="text-center py-6">
          <div className="flex justify-center space-x-4 mb-4">
             <button className="flex flex-col items-center group">
               <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 group-hover:text-primary group-hover:border-primary transition-all">
                 <span className="material-icons-round text-xl">share</span>
               </div>
               <span className="text-[10px] mt-1 text-gray-400">分享報告</span>
             </button>
             <button className="flex flex-col items-center group">
               <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 group-hover:text-primary group-hover:border-primary transition-all">
                 <span className="material-icons-round text-xl">file_download</span>
               </div>
               <span className="text-[10px] mt-1 text-gray-400">下載 PDF</span>
             </button>
          </div>
          <p className="text-[10px] text-gray-400">© 2024 AG 國際奢侈品鑑定中心 版權所有</p>
        </footer>
      </main>
    </div>
  );
}
