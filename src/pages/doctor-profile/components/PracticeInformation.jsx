import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PracticeInformation = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState({
    clinicName: initialData?.clinicName || 'Ayur Wellness Clinic',
    clinicAddress: initialData?.clinicAddress || '456 Health Avenue, Mumbai, Maharashtra 400002',
    consultationFee: initialData?.consultationFee || '1500',
    followUpFee: initialData?.followUpFee || '800',
    consultationDuration: initialData?.consultationDuration || '45',
    workingDays: initialData?.workingDays || ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    morningHours: initialData?.morningHours || { start: '09:00', end: '13:00' },
    eveningHours: initialData?.eveningHours || { start: '16:00', end: '20:00' },
    paymentMethods: initialData?.paymentMethods || ['cash', 'card', 'upi'],
    specializations: initialData?.specializations || 'Panchakarma, Ayurvedic Nutrition, Stress Management, Digestive Disorders'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const daysOfWeek = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
  ];

  const paymentMethodOptions = [
    { value: 'cash', label: 'Cash' },
    { value: 'card', label: 'Credit/Debit Card' },
    { value: 'upi', label: 'UPI/Digital Payments' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'cheque', label: 'Cheque' }
  ];

  const consultationDurationOptions = [
    { value: '30', label: '30 minutes' },
    { value: '45', label: '45 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleWorkingDayChange = (day, checked) => {
    setFormData(prev => ({
      ...prev,
      workingDays: checked 
        ? [...prev?.workingDays, day]
        : prev?.workingDays?.filter(d => d !== day)
    }));
  };

  const handlePaymentMethodChange = (method, checked) => {
    setFormData(prev => ({
      ...prev,
      paymentMethods: checked 
        ? [...prev?.paymentMethods, method]
        : prev?.paymentMethods?.filter(m => m !== method)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.clinicName?.trim()) {
      newErrors.clinicName = 'Clinic name is required';
    }
    
    if (!formData?.consultationFee || formData?.consultationFee <= 0) {
      newErrors.consultationFee = 'Please enter a valid consultation fee';
    }
    
    if (formData?.workingDays?.length === 0) {
      newErrors.workingDays = 'Please select at least one working day';
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
      clinicName: initialData?.clinicName || 'Ayur Wellness Clinic',
      clinicAddress: initialData?.clinicAddress || '456 Health Avenue, Mumbai, Maharashtra 400002',
      consultationFee: initialData?.consultationFee || '1500',
      followUpFee: initialData?.followUpFee || '800',
      consultationDuration: initialData?.consultationDuration || '45',
      workingDays: initialData?.workingDays || ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      morningHours: initialData?.morningHours || { start: '09:00', end: '13:00' },
      eveningHours: initialData?.eveningHours || { start: '16:00', end: '20:00' },
      paymentMethods: initialData?.paymentMethods || ['cash', 'card', 'upi'],
      specializations: initialData?.specializations || 'Panchakarma, Ayurvedic Nutrition, Stress Management, Digestive Disorders'
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-elevation-2 border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Practice Information
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
      <div className="space-y-6">
        {/* Clinic Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Clinic Name"
            type="text"
            value={formData?.clinicName}
            onChange={(e) => handleInputChange('clinicName', e?.target?.value)}
            error={errors?.clinicName}
            disabled={!isEditing}
            required
          />

          <div className="md:col-span-2">
            <Input
              label="Clinic Address"
              type="text"
              value={formData?.clinicAddress}
              onChange={(e) => handleInputChange('clinicAddress', e?.target?.value)}
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Fee Structure */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="Consultation Fee (₹)"
            type="number"
            value={formData?.consultationFee}
            onChange={(e) => handleInputChange('consultationFee', e?.target?.value)}
            error={errors?.consultationFee}
            disabled={!isEditing}
            required
          />

          <Input
            label="Follow-up Fee (₹)"
            type="number"
            value={formData?.followUpFee}
            onChange={(e) => handleInputChange('followUpFee', e?.target?.value)}
            disabled={!isEditing}
          />

          <Select
            label="Consultation Duration"
            options={consultationDurationOptions}
            value={formData?.consultationDuration}
            onChange={(value) => handleInputChange('consultationDuration', value)}
            disabled={!isEditing}
          />
        </div>

        {/* Working Days */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Working Days {errors?.workingDays && <span className="text-destructive">*</span>}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {daysOfWeek?.map((day) => (
              <Checkbox
                key={day?.value}
                label={day?.label}
                checked={formData?.workingDays?.includes(day?.value)}
                onChange={(e) => handleWorkingDayChange(day?.value, e?.target?.checked)}
                disabled={!isEditing}
              />
            ))}
          </div>
          {errors?.workingDays && (
            <p className="text-sm text-destructive mt-1">{errors?.workingDays}</p>
          )}
        </div>

        {/* Working Hours */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Morning Hours
            </label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Start Time"
                type="time"
                value={formData?.morningHours?.start}
                onChange={(e) => handleInputChange('morningHours', { ...formData?.morningHours, start: e?.target?.value })}
                disabled={!isEditing}
              />
              <Input
                label="End Time"
                type="time"
                value={formData?.morningHours?.end}
                onChange={(e) => handleInputChange('morningHours', { ...formData?.morningHours, end: e?.target?.value })}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Evening Hours
            </label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Start Time"
                type="time"
                value={formData?.eveningHours?.start}
                onChange={(e) => handleInputChange('eveningHours', { ...formData?.eveningHours, start: e?.target?.value })}
                disabled={!isEditing}
              />
              <Input
                label="End Time"
                type="time"
                value={formData?.eveningHours?.end}
                onChange={(e) => handleInputChange('eveningHours', { ...formData?.eveningHours, end: e?.target?.value })}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Accepted Payment Methods
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {paymentMethodOptions?.map((method) => (
              <Checkbox
                key={method?.value}
                label={method?.label}
                checked={formData?.paymentMethods?.includes(method?.value)}
                onChange={(e) => handlePaymentMethodChange(method?.value, e?.target?.checked)}
                disabled={!isEditing}
              />
            ))}
          </div>
        </div>

        {/* Specializations */}
        <div>
          <Input
            label="Specializations"
            type="text"
            value={formData?.specializations}
            onChange={(e) => handleInputChange('specializations', e?.target?.value)}
            description="Separate multiple specializations with commas"
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );
};

export default PracticeInformation;