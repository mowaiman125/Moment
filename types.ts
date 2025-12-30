
export enum AppraisalResult {
  COMPLIANT = '符合原廠工藝標準',
  NON_COMPLIANT = '不符合原廠工藝標準',
  NOT_APPLICABLE = '不適用',
  NOT_OPENED = '未開蓋檢測'
}

export enum WatchStatus {
  NONE = '目測無瑕疵',
  NORMAL = '正常使用痕跡',
  OBVIOUS = '明顯使用痕跡',
  POLISHED = '有打磨痕跡',
  NON_GENUINE = '非原裝/不適用',
  DENTED = '輕微碰崩刮痕',
  HEAVILY_DENTED = '明顯碰崩刮痕',
  COATED = '有後加塗層痕跡',
  NON_GENUINE_CRYSTAL = '非原裝'
}

export enum PerformanceStatus {
  NORMAL = '檢測當下運作正常',
  PARTIAL = '部分功能未能正常運作',
  ACCEPTABLE_ERROR = '走時在可接受誤差範圍內',
  MAINTENANCE_REQUIRED = '建議抹油保養',
  NOT_APPLICABLE = '不適用',
  WATERPROOF_PASS = '通過一般氣密測試',
  WATERPROOF_FAIL = '不通過一般氣密測試'
}

export interface AppraisalReport {
  brand: string;
  warrantyDate: string;
  modelNumber: string;
  serialNumber: string;
  overallResult: AppraisalResult;
  movementResult: AppraisalResult;
  cardResult: AppraisalResult;
  packageResult: AppraisalResult;
  status: {
    case: WatchStatus;
    strap: WatchStatus;
    crystal: WatchStatus;
    caseback: WatchStatus;
    hands: WatchStatus;
    crown: WatchStatus;
    buckle: WatchStatus;
    dial: WatchStatus;
  };
  performance: {
    function: PerformanceStatus;
    movement: PerformanceStatus;
    waterproof: PerformanceStatus;
  };
  notes: string;
  tags: string[];
  photos: {
    front?: string;
    back?: string;
    side1?: string;
    side2?: string;
    buckle?: string;
    card?: string;
    others: string[];
  };
}
