export enum OrderType {
  Standard,
  SaleOrder,
  PurchaseOrder,
  TransferOrder,
  ReturnOrder,
}

export interface IOrder {
  orderId: string;
  orderType: string;
  customerName: string;
  createdDate: string;
  createdByUserName: string;
}

export interface ISelectedOrder {
  orderId: string;
  orderType: OrderType;
  customerName: string;
}

export interface IOrderSearch {
  customerName: string;
  orderType: OrderType;
}
