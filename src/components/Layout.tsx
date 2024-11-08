import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import {
  LayoutDashboard,
  Users,
  FileText,
  DollarSign,
  LogOut,
  Building2,
} from 'lucide-react';
import { cn } from '../lib/utils';

const Layout = () => {
  const { user, hasPermission } = useAuthStore();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard, permission: true },
    {
      name: 'Sales CRM',
      href: '/sales',
      icon: Users,
      permission: hasPermission('sales'),
    },
    {
      name: 'Content CRM',
      href: '/content',
      icon: FileText,
      permission: hasPermission('content'),
    },
    {
      name: 'Budget',
      href: '/budget',
      icon: DollarSign,
      permission: hasPermission('finance'),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
            <div className="flex items-center flex-shrink-0 px-4">
              <Building2 className="w-8 h-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                {user.tenantId}
              </span>
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                {navigation.map(
                  (item) =>
                    item.permission && (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={cn(
                          location.pathname === item.href
                            ? 'bg-indigo-50 text-indigo-600'
                            : 'text-gray-600 hover:bg-gray-50',
                          'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                        )}
                      >
                        <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                        {item.name}
                      </Link>
                    )
                )}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <button
                  onClick={() => useAuthStore.getState().setUser(null)}
                  className="ml-auto flex items-center justify-center h-8 w-8 rounded-full bg-white hover:bg-gray-50"
                >
                  <LogOut className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
