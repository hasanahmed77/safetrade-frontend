'use client';

import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import AuthGate from '@/components/AuthGate';
import { deleteAdminUser, getAdminUsers, updateAdminUser } from '@/lib/api';
import { getToken } from '@/lib/auth';
import type { User, UserRole } from '@/lib/types';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setStatus('Sign in as admin to manage users.');
      return;
    }

    getAdminUsers(token)
      .then(setUsers)
      .catch(() => setStatus('Unable to load users.'));
  }, []);

  const handleRoleChange = async (user: User, role: UserRole) => {
    const token = getToken();
    if (!token) return;
    try {
      const updated = await updateAdminUser(token, user.id, role);
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
      setStatus(`Updated ${updated.email} to ${updated.role}.`);
    } catch (error: any) {
      setStatus(error?.message ?? 'Unable to update user role.');
    }
  };

  const handleDelete = async (user: User) => {
    const token = getToken();
    if (!token) return;
    const confirmed = window.confirm(`Delete ${user.email}? This cannot be undone.`);
    if (!confirmed) return;
    try {
      await deleteAdminUser(token, user.id);
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      setStatus(`Deleted ${user.email}.`);
    } catch (error: any) {
      setStatus(error?.message ?? 'Unable to delete user.');
    }
  };

  return (
    <AuthGate role="admin">
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">User Management</h1>
        {status && <p className="text-sm text-white/60">{status}</p>}
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="card flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-white/60">{user.email}</p>
                <p className="text-lg font-semibold">{user.name}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <select
                  className="input"
                  value={user.role}
                  onChange={(event) => handleRoleChange(user, event.target.value as UserRole)}
                >
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </select>
                <button className="btn-ghost" aria-label="Delete user" title="Delete user" onClick={() => handleDelete(user)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuthGate>
  );
}
