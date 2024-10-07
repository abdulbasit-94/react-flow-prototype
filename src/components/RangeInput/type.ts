export interface IRangeInput {
    title: string;
    selectedValue: number;
    setSelectedValue: (value: number) => void;
    allowedValues?: number[];  // Optional array of predefined values
    minValue?: number;         // For dynamic ranges
    maxValue?: number;
    step?: number;
    handleDelete: () => void;
    isDisabled?: boolean;
  }