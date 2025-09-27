import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileImageUpload = ({ currentImage, onImageChange }) => {
  const [previewImage, setPreviewImage] = useState(currentImage);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file) => {
    if (file && file?.type?.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImageUrl = e?.target?.result;
        setPreviewImage(newImageUrl);
        onImageChange(newImageUrl);
      };
      reader?.readAsDataURL(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e?.target?.files?.[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragging(false);
    const file = e?.dataTransfer?.files?.[0];
    handleFileSelect(file);
  };

  const handleRemoveImage = () => {
    setPreviewImage('/assets/images/doctor-avatar.jpg');
    onImageChange('/assets/images/doctor-avatar.jpg');
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-elevation-2 border">
      <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
        Profile Picture
      </h3>
      <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
        {/* Current Profile Image */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-muted shadow-elevation-2">
            <Image
              src={previewImage}
              alt="Doctor profile"
              className="w-full h-full object-cover"
            />
          </div>
          
          {previewImage !== '/assets/images/doctor-avatar.jpg' && (
            <button
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center shadow-elevation-2 hover:bg-destructive/90 transition-colors duration-150"
              aria-label="Remove profile picture"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>

        {/* Upload Area */}
        <div className="flex-1 w-full">
          <div
            className={`
              border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200
              ${isDragging 
                ? 'border-primary bg-primary/5' :'border-muted hover:border-primary/50'
              }
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Icon 
              name="Upload" 
              size={32} 
              className="mx-auto text-muted-foreground mb-3" 
            />
            
            <p className="font-body text-sm text-foreground mb-2">
              Drag and drop your image here, or click to browse
            </p>
            
            <p className="font-caption text-xs text-muted-foreground mb-4">
              Supports: JPG, PNG, GIF (Max 5MB)
            </p>
            
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              id="profile-image-input"
            />
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById('profile-image-input')?.click()}
              iconName="Camera"
              iconPosition="left"
            >
              Choose Image
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUpload;