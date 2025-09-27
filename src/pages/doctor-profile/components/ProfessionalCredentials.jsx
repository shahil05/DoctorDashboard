import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProfessionalCredentials = ({ initialData, onSave }) => {
  const [credentials, setCredentials] = useState(initialData || [
    {
      id: 1,
      type: 'Medical Degree',
      title: 'Bachelor of Ayurvedic Medicine and Surgery (BAMS)',
      institution: 'Gujarat Ayurved University',
      year: '2008',
      certificateNumber: 'BAMS/2008/1234',
      verified: true
    },
    {
      id: 2,
      type: 'Specialization',
      title: 'Post Graduate Diploma in Panchakarma',
      institution: 'National Institute of Ayurveda',
      year: '2010',
      certificateNumber: 'PGD/PK/2010/5678',
      verified: true
    },
    {
      id: 3,
      type: 'Certification',
      title: 'Ayurvedic Nutrition Specialist',
      institution: 'International Ayurveda Foundation',
      year: '2015',
      certificateNumber: 'ANS/2015/9012',
      verified: false
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newCredential, setNewCredential] = useState({
    type: '',
    title: '',
    institution: '',
    year: '',
    certificateNumber: ''
  });

  const credentialTypes = [
    'Medical Degree',
    'Specialization',
    'Certification',
    'License',
    'Membership'
  ];

  const handleEdit = (credential) => {
    setEditingId(credential?.id);
    setNewCredential({
      type: credential?.type,
      title: credential?.title,
      institution: credential?.institution,
      year: credential?.year,
      certificateNumber: credential?.certificateNumber
    });
  };

  const handleSave = () => {
    if (editingId) {
      // Update existing credential
      setCredentials(prev => prev?.map(cred => 
        cred?.id === editingId 
          ? { ...cred, ...newCredential }
          : cred
      ));
    } else {
      // Add new credential
      const newId = Math.max(...credentials?.map(c => c?.id)) + 1;
      setCredentials(prev => [...prev, {
        id: newId,
        ...newCredential,
        verified: false
      }]);
    }
    
    setEditingId(null);
    setNewCredential({
      type: '',
      title: '',
      institution: '',
      year: '',
      certificateNumber: ''
    });
    setIsEditing(false);
    onSave(credentials);
  };

  const handleCancel = () => {
    setEditingId(null);
    setNewCredential({
      type: '',
      title: '',
      institution: '',
      year: '',
      certificateNumber: ''
    });
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    setCredentials(prev => prev?.filter(cred => cred?.id !== id));
    onSave(credentials?.filter(cred => cred?.id !== id));
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-elevation-2 border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Professional Credentials
        </h3>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(true)}
          iconName="Plus"
          iconPosition="left"
        >
          Add Credential
        </Button>
      </div>
      {/* Existing Credentials */}
      <div className="space-y-4 mb-6">
        {credentials?.map((credential) => (
          <div key={credential?.id} className="border rounded-lg p-4 bg-muted/30">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {credential?.type}
                  </span>
                  {credential?.verified && (
                    <div className="flex items-center space-x-1">
                      <Icon name="CheckCircle" size={16} className="text-success" />
                      <span className="text-xs text-success font-medium">Verified</span>
                    </div>
                  )}
                </div>
                
                <h4 className="font-body font-medium text-foreground mb-1">
                  {credential?.title}
                </h4>
                
                <p className="text-sm text-muted-foreground mb-1">
                  {credential?.institution} • {credential?.year}
                </p>
                
                <p className="text-xs text-muted-foreground font-mono">
                  Certificate: {credential?.certificateNumber}
                </p>
              </div>
              
              <div className="flex space-x-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(credential)}
                  iconName="Edit"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(credential?.id)}
                  iconName="Trash2"
                  className="text-destructive hover:text-destructive"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Add/Edit Form */}
      {isEditing && (
        <div className="border-t pt-6">
          <h4 className="font-body font-medium text-foreground mb-4">
            {editingId ? 'Edit Credential' : 'Add New Credential'}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Credential Type
              </label>
              <select
                value={newCredential?.type}
                onChange={(e) => setNewCredential(prev => ({ ...prev, type: e?.target?.value }))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select type</option>
                {credentialTypes?.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <Input
              label="Year Obtained"
              type="text"
              value={newCredential?.year}
              onChange={(e) => setNewCredential(prev => ({ ...prev, year: e?.target?.value }))}
              placeholder="2023"
            />

            <div className="md:col-span-2">
              <Input
                label="Credential Title"
                type="text"
                value={newCredential?.title}
                onChange={(e) => setNewCredential(prev => ({ ...prev, title: e?.target?.value }))}
                placeholder="Bachelor of Ayurvedic Medicine and Surgery"
              />
            </div>

            <div className="md:col-span-2">
              <Input
                label="Institution/Organization"
                type="text"
                value={newCredential?.institution}
                onChange={(e) => setNewCredential(prev => ({ ...prev, institution: e?.target?.value }))}
                placeholder="Gujarat Ayurved University"
              />
            </div>

            <div className="md:col-span-2">
              <Input
                label="Certificate Number"
                type="text"
                value={newCredential?.certificateNumber}
                onChange={(e) => setNewCredential(prev => ({ ...prev, certificateNumber: e?.target?.value }))}
                placeholder="BAMS/2023/1234"
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              variant="default"
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
            >
              {editingId ? 'Update' : 'Add'} Credential
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalCredentials;