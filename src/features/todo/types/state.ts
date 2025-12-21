export type ActionState = {
  message: string | null;
  errors: {
    title?: string[];
    isCompleted?: string[];
  };
};
