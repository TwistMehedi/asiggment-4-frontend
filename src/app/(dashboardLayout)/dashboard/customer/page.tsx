import { getUserDashboardStats } from "@/service/User/user.service";

const CustomerStats = async () => {
  const stats = await getUserDashboardStats();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white shadow rounded-2xl p-6 border">
          <h2 className="text-lg font-semibold text-gray-600">Total Orders</h2>

          <p className="text-4xl font-bold mt-2">{stats?.totalOrders || 0}</p>
        </div>

        <div className="bg-white shadow rounded-2xl p-6 border">
          <h2 className="text-lg font-semibold text-gray-600">Total Spent</h2>

          <p className="text-4xl font-bold mt-2">৳ {stats?.totalSpent || 0}</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-2xl p-6 border">
        <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>

        {stats?.recentOrders?.length === 0 ? (
          <p>No recent orders found.</p>
        ) : (
          <div className="space-y-4">
            {stats?.recentOrders?.map((order: any) => (
              <div
                key={order.id}
                className="border rounded-xl p-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold">{order?.provider?.shopName}</h3>

                  <p className="text-sm text-gray-500">
                    Status: {order.status}
                  </p>

                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-lg font-bold">৳ {order.totalAmount}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerStats;
