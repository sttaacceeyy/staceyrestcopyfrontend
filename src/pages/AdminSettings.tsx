import React, { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface SiteSettings {
  restaurantName: string;
  contactEmail: string;
  phone: string;
  address: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@steakz.com', role: 'admin' },
  { id: '2', name: 'Brian Smith', email: 'brian@steakz.com', role: 'manager' },
  { id: '3', name: 'Carlos Lee', email: 'carlos@steakz.com', role: 'customer' },
];

const tabList = [
  { key: 'users', label: 'Manage Users' },
  { key: 'roles', label: 'Manage Roles' },
  { key: 'site', label: 'Site Settings' },
  { key: 'security', label: 'Security Settings' },
];

const AdminSettings: React.FC = () => {
  const [tab, setTab] = useState('users');
  const [users, setUsers] = useState<User[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    restaurantName: 'Steakz',
    contactEmail: 'info@steakz.com',
    phone: '+1 555-1234',
    address: '123 Main St, Cityville',
  });
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [loginHistory, setLoginHistory] = useState<any[]>([]);

  useEffect(() => {
    setUsers(mockUsers);
    setLoginHistory([
      { id: 1, user: 'Alice Johnson', time: '2025-06-10 10:00', status: 'success' },
      { id: 2, user: 'Brian Smith', time: '2025-06-10 11:00', status: 'fail' },
    ]);
  }, []);

  const handleEditUser = (user: User) => setUsers(prev => prev.map(u => u.id === user.id ? user : u));
  const handleDeleteUser = (id: string) => setUsers(prev => prev.filter(u => u.id !== id));
  const handleSiteSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSiteSettings({ ...siteSettings, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto py-8 px-2">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex gap-2 mb-6 border-b-0">
          {tabList.map(t => (
            <button
              key={t.key}
              className={`py-2 px-4 font-semibold border-b-2 transition-colors duration-150 ${tab === t.key ? 'border-b-[#0066cc] text-[#0066cc]' : 'border-b-transparent text-gray-500'}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
        {/* Manage Users Tab */}
        {tab === 'users' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Users</h2>
              <button className="bg-[#0066cc] text-white px-4 py-2 rounded font-semibold" onClick={() => setShowUserDialog(true)}>Add User</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-left">Role</th>
                    <th className="p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b">
                      <td className="p-2">{user.name}</td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2">{user.role}</td>
                      <td className="p-2 flex gap-2">
                        <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => setEditUser(user)}>Edit</button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Add/Edit User Dialog */}
            {showUserDialog && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                  <h3 className="text-lg font-bold mb-4">{editUser ? 'Edit User' : 'Add User'}</h3>
                  <form className="flex flex-col gap-3" onSubmit={e => { e.preventDefault(); setShowUserDialog(false); }}>
                    <input className="border rounded px-3 py-2" placeholder="Name" required defaultValue={editUser?.name} />
                    <input className="border rounded px-3 py-2" placeholder="Email" type="email" required defaultValue={editUser?.email} />
                    <input className="border rounded px-3 py-2" placeholder="Role" required defaultValue={editUser?.role} />
                    <div className="flex gap-2 mt-2">
                      <button type="submit" className="bg-[#0066cc] text-white px-4 py-2 rounded font-semibold">Save</button>
                      <button type="button" className="bg-gray-300 px-4 py-2 rounded font-semibold" onClick={() => setShowUserDialog(false)}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
        {/* Manage Roles Tab */}
        {tab === 'roles' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Manage Roles</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">User</th>
                    <th className="p-2 text-left">Current Role</th>
                    <th className="p-2 text-left">Assign Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b">
                      <td className="p-2">{user.name}</td>
                      <td className="p-2">{user.role}</td>
                      <td className="p-2">
                        <select
                          className="border rounded px-2 py-1"
                          value={user.role}
                          onChange={e => handleEditUser({ ...user, role: e.target.value })}
                        >
                          <option value="admin">Admin</option>
                          <option value="manager">Manager</option>
                          <option value="customer">Customer</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* Site Settings Tab */}
        {tab === 'site' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Site Settings</h2>
            <form className="flex flex-col gap-4 max-w-md" onSubmit={e => e.preventDefault()}>
              <input name="restaurantName" className="border rounded px-3 py-2" value={siteSettings.restaurantName} onChange={handleSiteSettingsChange} placeholder="Restaurant Name" />
              <input name="contactEmail" className="border rounded px-3 py-2" value={siteSettings.contactEmail} onChange={handleSiteSettingsChange} placeholder="Contact Email" />
              <input name="phone" className="border rounded px-3 py-2" value={siteSettings.phone} onChange={handleSiteSettingsChange} placeholder="Phone" />
              <input name="address" className="border rounded px-3 py-2" value={siteSettings.address} onChange={handleSiteSettingsChange} placeholder="Address" />
              <button type="submit" className="bg-[#0066cc] text-white px-4 py-2 rounded font-semibold">Save Settings</button>
            </form>
          </div>
        )}
        {/* Security Settings Tab */}
        {tab === 'security' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Security Settings</h2>
            <div className="flex flex-col gap-4 max-w-md">
              <button className="bg-[#0066cc] text-white px-4 py-2 rounded font-semibold">Reset All Passwords</button>
              <button className="bg-[#0066cc] text-white px-4 py-2 rounded font-semibold">Enable 2FA</button>
            </div>
            <h3 className="text-lg font-semibold mt-6 mb-2">Login History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">User</th>
                    <th className="p-2 text-left">Time</th>
                    <th className="p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loginHistory.map(log => (
                    <tr key={log.id} className="border-b">
                      <td className="p-2">{log.user}</td>
                      <td className="p-2">{log.time}</td>
                      <td className="p-2">{log.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;
export {};
