import React from "react";

// Step UI에 사용되는 데이터 타입
export interface StepData {
  title: string;
  description: string;
  content: React.ReactNode;
  handleNext: () => void;
  validation: () => boolean;
}
