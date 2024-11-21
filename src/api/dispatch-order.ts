import { api } from "@/lib/axios";

export interface DispatchOrderProps {
  orderId: string;
}

export const dispatchOrder = async ({ orderId }: DispatchOrderProps) => {
  await api.patch(`/orders/${orderId}/cancel`);
};
