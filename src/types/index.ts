// Data models based on the Blog API documentation
export interface User {
  id: number;
  username: string;
  role: 'WRITER' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: User;
  comments: Comment[];
}

export interface Comment {
  id: number;
  content: string;
  postId: number;
  authorId?: number;
  userName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UsersResponse {
  users: User[];
  pagination: PaginationInfo;
}

// Home page props interface
export interface HomeProps {
  posts: import('../types').Post[];
  loading: boolean;
  error: string | null;
}

// TODO: Students - Add interfaces for error responses and other API responses as needed
// For example, you might need interfaces for post creation responses or user update responses

export type UserRole = 'admin' | 'manager' | 'customer' | 'chef' | 'branchManager' | 'hqManager' | 'cashier';

export interface RBACUser {
  id: string;
  name: string;
  role: UserRole;
  branchId?: string; // for branchManager, chef
}

export interface Order {
  id: string;
  items: { name: string; quantity: number; price: number }[];
  status: 'pending' | 'in_progress' | 'fulfilled';
  paymentStatus: 'paid' | 'unpaid';
  createdAt: string;
  fulfilledAt?: string;
  branchId: string;
}

export interface Payment {
  orderId: string;
  amount: number;
  status: 'paid' | 'unpaid';
  paidAt?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

export interface Recipe {
  menuItem: string;
  ingredients: { inventoryId: string; amount: number; unit: string }[];
}

export interface Branch {
  id: string;
  name: string;
  location: string;
}

export interface BranchReport {
  branchId: string;
  date: string;
  totalOrders: number;
  totalSales: number;
  avgPrepTime: number;
  inventoryUsage: { inventoryId: string; used: number; unit: string }[];
}

export interface HQReport {
  period: 'month' | 'week' | 'quarter';
  startDate: string;
  endDate: string;
  branches: BranchReport[];
  totalOrders: number;
  totalSales: number;
  avgPrepTime: number;
  inventoryUsage: { inventoryId: string; used: number; unit: string }[];
}
