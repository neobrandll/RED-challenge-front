export interface IModal {
  title: string;
  open: boolean;
  description?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export interface IModalProps {
  modal: IModal;
}
