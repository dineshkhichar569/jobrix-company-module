import { useEffect, useState } from "react";
import {
  User,
  Building2,
  Users,
  Bell,
  Lock,
  Mail,
  Phone,
  Globe,
  Trash2,
  Check,
} from "lucide-react";
import { getLoggedInUser } from "../../../api";
import { updateMembersDetails } from "../../../api/differentApi's/updateMembersDetails.api";
import { updatePassword } from "../../../api/differentApi's/updatePassword.api";
import AuthMSG from "../../../components/ui/popUpMessages/AuthMSG";
import { AnimatePresence } from "framer-motion";

//! all settings tabs (some only for admin)
const TABS = [
  { key: "profile", label: "My Profile", icon: User, adminOnly: false },
  { key: "company", label: "Company", icon: Building2, adminOnly: true },
  {
    key: "notifications",
    label: "Notifications",
    icon: Bell,
    adminOnly: false,
  },
];

const ROLES = ["admin", "HR", "recruiter"];

//! color for each role badge
function getRoleColor(role) {
  if (role === "admin") return "bg-indigo-100 text-indigo-700";
  if (role === "HR") return "bg-blue-100 text-blue-700";
  return "bg-gray-100 text-gray-700";
}

//! makes initials from a name
function initials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("");
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //! To get the Logged in user informations
  const [loggedUser, setLoggedUser] = useState();

  //! profile form
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  //! password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  //! company form
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");

  //! notification toggles
  const [notifyApply, setNotifyApply] = useState(true);
  const [notifyInterview, setNotifyInterview] = useState(true);
  const [notifySelected, setNotifySelected] = useState(false);

  const isAdmin = loggedUser?.role === "admin";

  //! only show tabs this user is allowed to see
  const visibleTabs = TABS.filter((t) => !t.adminOnly || isAdmin);

  //! TODO: connect to your update profile API
  const handleSaveProfile = async () => {
    await updateMembersDetails(loggedUser._id, {
      fullname,
      phoneNo: phone,
    });

    setSuccess("Profile Updated successfully.")
  };

  //! TODO: connect to your change password API
  async function handleChangePassword() {
    try {
      await updatePassword(currentPassword, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      setSuccess("Password changed successfully.");
    } catch (err) {
      console.error("password change failed:", err);
      setError(err.response?.data?.message || "Failed to change password");
    }
  }

  //! TODO: connect to your update company API
  function handleSaveCompany() {
    showSaved();
  }

  useEffect(() => {
    const fetchLoggedUser = async () => {
      const res = await getLoggedInUser();
      setLoggedUser(res.data);

      //! prefill the form fields from the fetched user
      setFullname(res.data.fullname || "");
      setEmail(res.data.email || "");
      setPhone(res.data.phoneNo || "");
    };

    fetchLoggedUser();
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }

    if (success) {
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    }
  }, [error, success]);

  return (
    <>
      <div className="space-y-4">
        {/* //! header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Settings</h1>
            <p className="text-sm text-gray-500">
              Manage your account and company preferences.
            </p>
          </div>

          {/* //! saved message */}
          {saved && (
            <span className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-600">
              <Check size={14} /> Saved
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          {/* //! left tabs */}
          <div className="rounded-xl border border-gray-100 bg-white p-2 shadow-sm">
            {visibleTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`mb-1 flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition ${
                    isActive
                      ? "bg-indigo-50 font-medium text-indigo-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* //! right content */}
          <div className="lg:col-span-3">
            {/* //! /////////////////// PROFILE */}
            {activeTab === "profile" && (
              <div className="space-y-4">
                {/* profile info */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="mb-4 text-sm font-semibold text-gray-900">
                    Profile Information
                  </div>

                  {/* //! avatar */}
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-lg font-semibold text-indigo-600">
                      {initials(loggedUser?.fullname)}
                    </div>
                    <div>
                      <div className="text-base font-medium text-gray-900">
                        {loggedUser?.fullname || "Your name"}
                      </div>
                      <span
                        className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium ${getRoleColor(
                          loggedUser?.role,
                        )}`}
                      >
                        {loggedUser?.role || "—"}
                      </span>
                    </div>
                  </div>

                  {/* //! fields */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-500">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-indigo-400"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-500">
                        Email
                      </label>
                      <div className="relative">
                        <Mail
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="email"
                          value={email}
                          disabled
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 py-2 pl-9 pr-3 text-sm outline-none text-gray-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-500">
                        Phone
                      </label>
                      <div className="relative">
                        <Phone
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-500">
                        Role
                      </label>
                      <input
                        type="text"
                        value={loggedUser?.role || ""}
                        disabled
                        className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSaveProfile}
                    className="mt-5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                  >
                    Save changes
                  </button>
                </div>

                {/* change password */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <Lock size={15} className="text-gray-400" />
                    Change Password
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-500">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-indigo-400"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-gray-500">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-indigo-400"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleChangePassword}
                    className="mt-5 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Update password
                  </button>
                </div>
              </div>
            )}

            {/* //! ///////////////// COMPANY */}
            {activeTab === "company" && (
              <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="mb-4 text-sm font-semibold text-gray-900">
                  Company Details
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Jobrix Corporation"
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-indigo-400"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-500">
                      Website
                    </label>
                    <div className="relative">
                      <Globe
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="text"
                        value={companyWebsite}
                        onChange={(e) => setCompanyWebsite(e.target.value)}
                        placeholder="https://jobrix.com"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-400"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSaveCompany}
                  className="mt-5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  Save changes
                </button>
              </div>
            )}

            {/* //! //////////////// NOTIFICATIONS  */}
            {activeTab === "notifications" && (
              <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="mb-4 text-sm font-semibold text-gray-900">
                  Email Notifications
                </div>

                <div className="space-y-1">
                  {/* toggle 1 */}
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <div className="text-sm font-medium text-gray-800">
                        New candidate applies
                      </div>
                      <div className="text-xs text-gray-400">
                        Get an email when someone applies to a job
                      </div>
                    </div>
                    <button
                      onClick={() => setNotifyApply(!notifyApply)}
                      className={`relative h-6 w-11 rounded-full transition ${
                        notifyApply ? "bg-indigo-600" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                          notifyApply ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                  </div>

                  {/* toggle 2 */}
                  <div className="flex items-center justify-between border-t border-gray-50 py-3">
                    <div>
                      <div className="text-sm font-medium text-gray-800">
                        Interview scheduled
                      </div>
                      <div className="text-xs text-gray-400">
                        Get notified when an interview is set
                      </div>
                    </div>
                    <button
                      onClick={() => setNotifyInterview(!notifyInterview)}
                      className={`relative h-6 w-11 rounded-full transition ${
                        notifyInterview ? "bg-indigo-600" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                          notifyInterview ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                  </div>

                  {/* toggle 3 */}
                  <div className="flex items-center justify-between border-t border-gray-50 py-3">
                    <div>
                      <div className="text-sm font-medium text-gray-800">
                        Candidate selected
                      </div>
                      <div className="text-xs text-gray-400">
                        Get notified when a candidate is hired
                      </div>
                    </div>
                    <button
                      onClick={() => setNotifySelected(!notifySelected)}
                      className={`relative h-6 w-11 rounded-full transition ${
                        notifySelected ? "bg-indigo-600" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                          notifySelected ? "left-6" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* //! for error popUp */}
      <AnimatePresence mode="wait">
        {error && (
          <AuthMSG
            message={error}
            type="warning"
            top=""
            bottom="24px"
            popUpDirection="bottom"
          />
        )}
        {success && (
            <AuthMSG
              message={success}
              type="success"
              top="24px"
              bottom=""
              popUpDirection="top"
            />
        )}
      </AnimatePresence>
    </>
  );
}
