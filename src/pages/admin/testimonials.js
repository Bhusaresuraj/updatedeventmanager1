import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import TestimonialManager from '../../components/admin/TestimonialManager';

const TestimonialsPage = () => {
  return (
    <AdminLayout>
      <TestimonialManager />
    </AdminLayout>
  );
};

export default TestimonialsPage; 