import currentUser from "@/actions/user";
import {
  User as UserIcon,
  Mail,
  ShieldCheck,
  Calendar,
  BadgeCheck,
  Settings,
  LogOut,
} from "lucide-react";

const Profile = async () => {
  const { user } = await currentUser();

  if (!user)
    return (
      <div className="text-center p-20">Please Login to view profile.</div>
    );

  const joinDate = new Date(user.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 min-h-screen">
      <div className="relative bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-bl-[5rem] -z-0 opacity-50" />

        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-tr from-orange-500 to-orange-300 rounded-[2.5rem] flex items-center justify-center shadow-xl shadow-orange-100">
              <span className="text-5xl font-black text-white">
                {user.name?.[0].toUpperCase()}
              </span>
            </div>
            {user.isVerified && (
              <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-full shadow-md">
                <BadgeCheck className="text-blue-500" size={24} />
              </div>
            )}
          </div>

          <div className="text-center md:text-left space-y-2">
            <h1 className="text-3xl font-black text-gray-800 tracking-tight">
              {user.name}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="px-4 py-1.5 bg-gray-900 text-white rounded-full text-xs font-bold tracking-widest uppercase">
                {user.role}
              </span>
              <span
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${
                  user.status === "ACTIVE"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                ● {user.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Settings size={20} className="text-orange-600" /> Account Details
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <Mail className="text-gray-400" size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">
                  Email Address
                </p>
                <p className="text-sm font-bold text-gray-700">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <ShieldCheck className="text-gray-400" size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">
                  Verification
                </p>
                <p className="text-sm font-bold text-gray-700">
                  {user.isVerified
                    ? "Verified Account"
                    : "Pending Verification"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <Calendar className="text-gray-400" size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">
                  Member Since
                </p>
                <p className="text-sm font-bold text-gray-700">{joinDate}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-orange-600 p-8 rounded-[2.5rem] text-white shadow-lg shadow-orange-100 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-xl font-black">Foodie Rewards</h3>
              <p className="text-orange-100 text-sm mt-1 opacity-80">
                Order more to unlock gold badge!
              </p>
              <button className="mt-6 bg-white text-orange-600 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-orange-50 transition-colors">
                View Wallet
              </button>
            </div>
            <UserIcon className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="p-6 bg-white border border-gray-100 rounded-[2rem] font-bold text-gray-700 hover:border-orange-200 hover:bg-orange-50/30 transition-all flex flex-col items-center gap-2">
              <Settings className="text-gray-400" />
              <span className="text-xs">Edit Profile</span>
            </button>
            <button className="p-6 bg-white border border-gray-100 rounded-[2rem] font-bold text-red-500 hover:bg-red-50 transition-all flex flex-col items-center gap-2">
              <LogOut />
              <span className="text-xs">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
