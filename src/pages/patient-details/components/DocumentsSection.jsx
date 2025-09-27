import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DocumentsSection = ({ documents, onUploadDocument, onDeleteDocument }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadTitle, setUploadTitle] = useState('');

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getFileIcon = (type) => {
    const icons = {
      'pdf': 'FileText',
      'image': 'Image',
      'doc': 'FileText',
      'docx': 'FileText',
      'xls': 'FileSpreadsheet',
      'xlsx': 'FileSpreadsheet'
    };
    return icons?.[type] || 'File';
  };

  const getFileTypeColor = (type) => {
    const colors = {
      'pdf': 'text-red-600',
      'image': 'text-green-600',
      'doc': 'text-blue-600',
      'docx': 'text-blue-600',
      'xls': 'text-green-600',
      'xlsx': 'text-green-600'
    };
    return colors?.[type] || 'text-muted-foreground';
  };

  const handleFileSelect = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadTitle(file?.name?.split('.')?.[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !uploadTitle?.trim()) return;

    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      const newDocument = {
        id: Date.now(),
        title: uploadTitle,
        fileName: selectedFile?.name,
        type: selectedFile?.type?.includes('image') ? 'image' : selectedFile?.name?.split('.')?.pop(),
        size: selectedFile?.size,
        uploadDate: new Date()?.toISOString(),
        category: 'Test Results'
      };
      
      onUploadDocument(newDocument);
      setSelectedFile(null);
      setUploadTitle('');
      setIsUploading(false);
    }, 2000);
  };

  const handleDownload = (document) => {
    // Simulate download
    const link = document?.createElement('a');
    link.href = '#';
    link.download = document?.fileName;
    link?.click();
  };

  const handleDelete = (documentId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      onDeleteDocument(documentId);
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 p-6 border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Documents & Reports
        </h2>
      </div>
      {/* Upload Section */}
      <div className="border-2 border-dashed border-muted rounded-lg p-6 mb-6">
        <div className="text-center">
          <Icon name="Upload" size={32} className="text-muted-foreground mx-auto mb-3" />
          <h3 className="font-medium text-foreground mb-2">Upload New Document</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Upload test results, medical reports, or other relevant documents
          </p>
          
          <div className="max-w-md mx-auto space-y-4">
            <Input
              type="file"
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
              className="w-full"
            />
            
            {selectedFile && (
              <Input
                label="Document Title"
                type="text"
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e?.target?.value)}
                placeholder="Enter document title"
                required
              />
            )}
            
            {selectedFile && (
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Icon name="File" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground flex-1">{selectedFile?.name}</span>
                <span className="text-xs text-muted-foreground">
                  {formatFileSize(selectedFile?.size)}
                </span>
              </div>
            )}
            
            <Button
              variant="default"
              iconName="Upload"
              iconPosition="left"
              onClick={handleUpload}
              disabled={!selectedFile || !uploadTitle?.trim() || isUploading}
              loading={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload Document'}
            </Button>
          </div>
        </div>
      </div>
      {/* Documents List */}
      <div className="space-y-3">
        {documents?.map((document) => (
          <div
            key={document?.id}
            className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-elevation-1 transition-shadow duration-150"
          >
            <Icon
              name={getFileIcon(document?.type)}
              size={24}
              className={getFileTypeColor(document?.type)}
            />
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground truncate">{document?.title}</h4>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{document?.fileName}</span>
                <span>{formatFileSize(document?.size)}</span>
                <span>Uploaded: {formatDate(document?.uploadDate)}</span>
              </div>
              <span className="inline-block px-2 py-1 bg-muted rounded-full text-xs text-foreground mt-1">
                {document?.category}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="Download"
                onClick={() => handleDownload(document)}
                title="Download"
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="Eye"
                title="Preview"
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="Trash2"
                onClick={() => handleDelete(document?.id)}
                title="Delete"
                className="text-error hover:text-error"
              />
            </div>
          </div>
        ))}

        {documents?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No documents uploaded yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsSection;