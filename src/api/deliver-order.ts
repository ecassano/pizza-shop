import { api } from "@/lib/axios";

export interface DeliverOrderProps {
  orderId: string;
}

export const deliverOrder = async ({ orderId }: DeliverOrderProps) => {
  await api.patch(`/orders/${orderId}/deliver`);
};
