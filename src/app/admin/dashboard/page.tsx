import { requireAuth } from "@/lib/auth";
import { getProducts } from "@/app/admin/actions";
import AdminDashboardClient from "./client";

export default async function AdminDashboardPage() {
  await requireAuth();
  const products = await getProducts();

  return <AdminDashboardClient initialProducts={products} />;
}
