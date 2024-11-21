import { api } from "@/lib/axios";

export interface CancelOrderProps {
  orderId: string;
}

export const cancelOrder = async ({ orderId }: CancelOrderProps) => {
  await api.patch(`/orders/${orderId}/cancel`);
};
