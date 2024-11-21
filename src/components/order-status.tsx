export type TOrderStatus =
  | "pending"
  | "canceled"
  | "processing"
  | "delivering"
  | "delivered";

interface OrderStatusProps {
  status: TOrderStatus;
}

const orderStatusMap: Record<TOrderStatus, string> = {
  pending: "Pendente",
  canceled: "Cancelado",
  delivered: "Entregue",
  delivering: "Em entrega",
  processing: "Em preparo",
};

const OrderStatus = ({ status }: OrderStatusProps) => {
  return (
    <div className="flex items-center gap-2">
      {status === "pending" && (
        <span className="h-2 w-2 rounded-full bg-slate-400"></span>
      )}
      {status === "canceled" && (
        <span className="h-2 w-2 rounded-full bg-rose-500"></span>
      )}
      {status === "delivered" && (
        <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
      )}
      {["processing", "delivering"].includes(status) && (
        <span className="h-2 w-2 rounded-full bg-amber-400"></span>
      )}
      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status]}
      </span>
    </div>
  );
};

export default OrderStatus;
