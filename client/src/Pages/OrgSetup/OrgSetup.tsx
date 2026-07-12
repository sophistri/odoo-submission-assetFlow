import { useEffect, useState } from 'react';
import axiosInstance from '../../Axios/axiosInstance';

interface Department {
  id: number;
  name: string;
  departmentHeadName?: string | null;
  parentDepartmentName?: string | null;
  isActive: boolean;
}

interface Category {
  id: number;
  name: string;
  customFieldsJson?: string | null;
}

interface EmployeeRow {
  id: number;
  name: string;
  email: string;
  departmentName?: string | null;
  role: string;
  status: string;
}

type Tab = 'departments' | 'categories' | 'employees';

export default function OrgSetup() {
  const [tab, setTab] = useState<Tab>('departments');

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <nav className="bg-slate-800 text-white p-4 flex justify-between items-center shadow-md">
        <span className="font-bold text-lg tracking-wide text-blue-400">Organization Setup</span>
      </nav>

      <div className="max-w-5xl mx-auto p-6">
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {(['departments', 'categories', 'employees'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition ${
                tab === t ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t === 'departments' ? 'Departments' : t === 'categories' ? 'Asset Categories' : 'Employee Directory'}
            </button>
          ))}
        </div>

        {tab === 'departments' && <DepartmentsTab />}
        {tab === 'categories' && <CategoriesTab />}
        {tab === 'employees' && <EmployeesTab />}
      </div>
    </div>
  );
}

// ---------------- TAB A: Departments ----------------
function DepartmentsTab() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [employees, setEmployees] = useState<EmployeeRow[]>([]);
  const [name, setName] = useState('');
  const [headId, setHeadId] = useState('');
  const [parentId, setParentId] = useState('');
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const res = await axiosInstance.get('/Departments');
      setDepartments(res.data.data || []);
    } catch (e) { console.error(e); }
    try {
      const res = await axiosInstance.get('/EmployeeDirectory');
      setEmployees(res.data.data || []);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await axiosInstance.post('/Departments', {
        name,
        departmentHeadId: headId ? Number(headId) : null,
        parentDepartmentId: parentId ? Number(parentId) : null,
      });
      setName(''); setHeadId(''); setParentId('');
      load();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create department');
    }
  };

  const handleDeactivate = async (id: number) => {
    try {
      await axiosInstance.patch(`/Departments/${id}/deactivate`);
      load();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to deactivate');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Departments</h2>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 font-semibold text-gray-600 bg-gray-50">
              <th className="p-3">Name</th>
              <th className="p-3">Head</th>
              <th className="p-3">Parent</th>
              <th className="p-3">Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {departments.map((d) => (
              <tr key={d.id}>
                <td className="p-3 font-medium text-gray-900">{d.name}</td>
                <td className="p-3 text-gray-600">{d.departmentHeadName || '—'}</td>
                <td className="p-3 text-gray-600">{d.parentDepartmentName || '—'}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 text-xs rounded-full ${d.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                    {d.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-3 text-right">
                  {d.isActive && (
                    <button onClick={() => handleDeactivate(d.id)} className="text-xs text-red-600 hover:underline">
                      Deactivate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit">
        <h3 className="text-md font-bold text-gray-800 mb-4">Add Department</h3>
        {error && <div className="mb-3 p-2 bg-red-50 text-red-700 border border-red-200 text-xs rounded">{error}</div>}
        <form onSubmit={handleCreate} className="space-y-3">
          <input
            placeholder="Department name"
            className="w-full p-2 border border-gray-300 rounded text-sm"
            value={name} onChange={(e) => setName(e.target.value)} required
          />
          <select className="w-full p-2 border border-gray-300 rounded text-sm bg-white" value={headId} onChange={(e) => setHeadId(e.target.value)}>
            <option value="">No Department Head</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
          </select>
          <select className="w-full p-2 border border-gray-300 rounded text-sm bg-white" value={parentId} onChange={(e) => setParentId(e.target.value)}>
            <option value="">No Parent Department</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
          <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded">
            Create Department
          </button>
        </form>
      </div>
    </div>
  );
}

// ---------------- TAB B: Asset Categories ----------------
function CategoriesTab() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const res = await axiosInstance.get('/Categories');
      setCategories(res.data.data || []);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await axiosInstance.post('/Categories', { name });
      setName('');
      load();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create category');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Asset Categories</h2>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 font-semibold text-gray-600 bg-gray-50">
              <th className="p-3">Name</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map((c) => (
              <tr key={c.id}>
                <td className="p-3 font-medium text-gray-900">{c.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit">
        <h3 className="text-md font-bold text-gray-800 mb-4">Add Category</h3>
        {error && <div className="mb-3 p-2 bg-red-50 text-red-700 border border-red-200 text-xs rounded">{error}</div>}
        <form onSubmit={handleCreate} className="space-y-3">
          <input
            placeholder="e.g. Electronics"
            className="w-full p-2 border border-gray-300 rounded text-sm"
            value={name} onChange={(e) => setName(e.target.value)} required
          />
          <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded">
            Create Category
          </button>
        </form>
      </div>
    </div>
  );
}

// ---------------- TAB C: Employee Directory ----------------
function EmployeesTab() {
  const [employees, setEmployees] = useState<EmployeeRow[]>([]);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const res = await axiosInstance.get('/EmployeeDirectory');
      setEmployees(res.data.data || []);
    } catch (e: any) {
      setError(e.response?.data?.message || 'Failed to load employees');
    }
  };

  useEffect(() => { load(); }, []);

  const handlePromote = async (employeeId: number, newRole: string) => {
    try {
      await axiosInstance.post('/EmployeeDirectory/promote', { employeeId, newRole });
      load();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to promote');
    }
  };

  const handleStatusToggle = async (employeeId: number, isActive: boolean) => {
    try {
      await axiosInstance.patch('/EmployeeDirectory/status', { employeeId, isActive: !isActive });
      load();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update status');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Employee Directory</h2>
      {error && <div className="mb-3 p-2 bg-red-50 text-red-700 border border-red-200 text-xs rounded">{error}</div>}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 font-semibold text-gray-600 bg-gray-50">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Department</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td className="p-3 font-medium text-gray-900">{emp.name}</td>
                <td className="p-3 text-gray-600">{emp.email}</td>
                <td className="p-3 text-gray-600">{emp.departmentName || '—'}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 text-xs rounded-full bg-blue-50 text-blue-700">{emp.role}</span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 text-xs rounded-full ${emp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                    {emp.status}
                  </span>
                </td>
                <td className="p-3 text-right space-x-2">
                  {emp.role === 'Employee' && (
                    <>
                      <button onClick={() => handlePromote(emp.id, 'DepartmentHead')} className="text-xs text-blue-600 hover:underline">
                        Make Dept Head
                      </button>
                      <button onClick={() => handlePromote(emp.id, 'AssetManager')} className="text-xs text-blue-600 hover:underline">
                        Make Asset Mgr
                      </button>
                    </>
                  )}
                  <button onClick={() => handleStatusToggle(emp.id, emp.status === 'Active')} className="text-xs text-gray-600 hover:underline">
                    {emp.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}