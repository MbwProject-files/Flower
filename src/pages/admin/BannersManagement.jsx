import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/NewAdminLayout';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/admin/Modal';
import { bannerAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { IconPlus } from '@tabler/icons-react';

const BannersManagement = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    button_text: '',
    button_link: '',
    banner_type: 'hero',
    display_order: 0,
    status: true,
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await bannerAPI.getAll();
      setBanners(response.data.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch banners');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      if (editingBanner) {
        await bannerAPI.update(editingBanner.id, data);
        toast.success('Banner updated successfully');
      } else {
        await bannerAPI.create(data);
        toast.success('Banner created successfully');
      }
      fetchBanners();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle || '',
      description: banner.description || '',
      button_text: banner.button_text || '',
      button_link: banner.button_link || '',
      banner_type: banner.banner_type,
      display_order: banner.display_order,
      status: banner.status,
    });
    setModalOpen(true);
  };

  const handleDelete = async (banner) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        await bannerAPI.delete(banner.id);
        toast.success('Banner deleted successfully');
        fetchBanners();
      } catch (error) {
        toast.error('Failed to delete banner');
      }
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingBanner(null);
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      button_text: '',
      button_link: '',
      banner_type: 'hero',
      display_order: 0,
      status: true,
    });
    setImageFile(null);
  };

  const columns = [
    { label: 'Title', key: 'title' },
    { label: 'Type', key: 'banner_type', render: (row) => (
      <span className="px-3 py-1 bg-violet-100 text-violet-600 rounded-full text-xs font-semibold uppercase">
        {row.banner_type}
      </span>
    )},
    { label: 'Order', key: 'display_order' },
    { label: 'Status', key: 'status', render: (row) => (
      <span className={`px-3 py-1 ${row.status ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} rounded-full text-xs font-semibold`}>
        {row.status ? 'Active' : 'Inactive'}
      </span>
    )},
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-violet-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Banners Management</h1>
            <p className="text-slate-500 mt-1">Manage hero banners and promotional sliders</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-all shadow-lg"
          >
            <IconPlus size={20} />
            Add Banner
          </button>
        </div>

        <DataTable
          columns={columns}
          data={banners}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingBanner ? 'Edit Banner' : 'Add New Banner'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-violet-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Subtitle</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-violet-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-violet-500 focus:outline-none"
              rows="3"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Button Text</label>
              <input
                type="text"
                value={formData.button_text}
                onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-violet-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Button Link</label>
              <input
                type="text"
                value={formData.button_link}
                onChange={(e) => setFormData({ ...formData, button_link: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-violet-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Banner Type</label>
              <select
                value={formData.banner_type}
                onChange={(e) => setFormData({ ...formData, banner_type: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-violet-500 focus:outline-none"
              >
                <option value="hero">Hero</option>
                <option value="promo">Promo</option>
                <option value="side">Side</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Display Order</label>
              <input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-violet-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Banner Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-violet-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
              className="w-5 h-5 text-violet-600 rounded"
            />
            <label className="text-sm font-semibold text-slate-700">Active</label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-all"
            >
              {editingBanner ? 'Update' : 'Create'} Banner
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-300 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
};

export default BannersManagement;
