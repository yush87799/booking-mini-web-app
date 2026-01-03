export type Slot = {
  id: string;
  date: string;
  time: string;
  booked: boolean;
  bookedBy?: string;
  bookedAt?: string;
};

export type MessageType = {
  type: "success" | "error";
  text: string;
};

export type CalendarDay = {
  date: Date;
  dateStr: string;
  isCurrentMonth: boolean;
  isToday: boolean;
};

