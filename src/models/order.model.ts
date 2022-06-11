export enum OrderType
{
  Standard,
  SaleOrder,
  PurchaseOrder,
  TransferOrder,
  ReturnOrder
}

export interface IOrder {
    OrderId: number;
    OrderType: OrderType;
    CustomerName: string;
    CreatedDate: Date;
    CreatedByUserName: string;
  }
  