import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const PersonalInformationForm = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: initialData?.fullName || 'Dr. Priya Sharma',
    email: initialData?.email || 'priya.sharma@ayurdoc.com',
    phone: initialData?.phone || '+91 98765 43210',
    dateOfBirth: initialData?.dateOfBirth || '1985-03-15',
    gender: initialData?.gender || 'female',
    address: initialData?.address || '123 Wellness Street, Mumbai, Maharashtra 400001',
    emergencyContact: initialData?.emergencyContact || '+91 98765 43211',
    languages: initialData?.languages || 'English, Hindi, Marathi'
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: initialData?.fullName || 'Dr. Priya Sharma',
      email: initialData?.email || 'priya.sharma@ayurdoc.com',
      phone: initialData?.phone || '+91 98765 43210',
      dateOfBirth: initialData?.dateOfBirth || '1985-03-15',
      gender: initialData?.gender || 'female',
      address: initialData?.address || '123 Wellness Street, Mumbai, Maharashtra 400001',
      emergencyContact: initialData?.emergencyContact || '+91 98765 43211',
      languages: initialData?.languages || 'English, Hindi, Marathi'
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-elevation-2 border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Personal Information
        </h3>
        
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            iconName="Edit"
            iconPosition="left"
          >
            Edit
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
            >
              Save
            </Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          type="text"
          value={formData?.fullName}
          onChange={(e) => handleInputChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          disabled={!isEditing}
          required
        />

        <Input
          label="Email Address"
          type="email"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          disabled={!isEditing}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          value={formData?.phone}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          error={errors?.phone}
          disabled={!isEditing}
          required
        />

        <Input
          label="Date of Birth"
          type="date"
          value={formData?.dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
          disabled={!isEditing}
        />

        <Select
          label="Gender"
          options={genderOptions}
          value={formData?.gender}
          onChange={(value) => handleInputChange('gender', value)}
          disabled={!isEditing}
        />

        <Input
          label="Emergency Contact"
          type="tel"
          value={formData?.emergencyContact}
          onChange={(e) => handleInputChange('emergencyContact', e?.target?.value)}
          disabled={!isEditing}
        />

        <div className="md:col-span-2">
          <Input
            label="Address"
            type="text"
            value={formData?.address}
            onChange={(e) => handleInputChange('address', e?.target?.value)}
            disabled={!isEditing}
          />
        </div>

        <div className="md:col-span-2">
          <Input
            label="Languages Spoken"
            type="text"
            value={formData?.languages}
            onChange={(e) => handleInputChange('languages', e?.target?.value)}
            description="Separate multiple languages with commas"
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationForm;