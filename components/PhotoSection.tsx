
import React from 'react';

interface PhotoSectionProps {
  photos: {
    front?: string;
    back?: string;
    side1?: string;
    side2?: string;
    buckle?: string;
    card?: string;
    others: string[];
  };
  onUpload: (key: string, file: File) => void;
}

export const PhotoSection: React.FC<PhotoSectionProps> = ({ photos, onUpload }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(key, e.target.files[0]);
    }
  };

  const PhotoBox = ({ label, icon, photoKey }: { label: string; icon: string; photoKey: string }) => (
    <div 
      onClick={() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => handleFileChange(e as any, photoKey);
        input.click();
      }}
      className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors cursor-pointer border border-dashed border-gray-300 overflow-hidden relative"
    >
      {(photos as any)[photoKey] ? (
        <img src={(photos as any)[photoKey]} alt={label} className="w-full h-full object-cover" />
      ) : (
        <>
          <span className="material-icons-round text-2xl">{icon}</span>
          <span className="text-[10px] mt-1">{label}</span>
        </>
      )}
    </div>
  );

  return (
    <section className="bg-white rounded-xl p-4 shadow-sm border border-border-light">
      <h2 className="text-base font-bold mb-4 flex items-center">
        <span className="material-icons-round mr-2 text-primary">photo_camera</span>
        手錶照片紀錄
      </h2>
      <div className="grid grid-cols-4 gap-2">
        <PhotoBox label="正面" icon="image" photoKey="front" />
        <PhotoBox label="背面" icon="image" photoKey="back" />
        <PhotoBox label="側面1" icon="image" photoKey="side1" />
        <PhotoBox label="側面2" icon="image" photoKey="side2" />
        <PhotoBox label="錶扣" icon="watch" photoKey="buckle" />
        <PhotoBox label="保卡" icon="credit_card" photoKey="card" />
        
        <div 
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.multiple = true;
            input.onchange = (e) => {
                const files = (e.target as HTMLInputElement).files;
                if(files) {
                    Array.from(files).forEach(f => onUpload('others', f));
                }
            };
            input.click();
          }}
          className="col-span-2 aspect-[2/1] bg-gray-50 rounded-lg flex flex-row items-center justify-center text-primary font-medium border border-dashed border-primary cursor-pointer hover:bg-primary/5 transition-colors"
        >
          <span className="material-icons-round text-xl mr-1">add</span>
          <span className="text-xs">添加更多細節 ({photos.others.length})</span>
        </div>
      </div>
    </section>
  );
};
