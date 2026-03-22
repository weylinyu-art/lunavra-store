/** Persisted order payload (anonymous / guest checkout). */

export type OrderSnapshot = {
  lines: {
    name: string;
    qty: number;
    size: string;
    lineTotal: number;
  }[];
  formData: {
    fullName: string;
    phoneLocal: string;
    email: string;
    city: string;
    addressDetail: string;
    orderNotes: string;
  };
  mapLat: number;
  mapLng: number;
  subtotal: number;
};

export type OrderStatus = "processing";

export type StoredOrder = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  snapshot: OrderSnapshot;
};
