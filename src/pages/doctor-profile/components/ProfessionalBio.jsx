import React, { useState } from 'react';
import Button from '../../../components/ui/Button';

const ProfessionalBio = ({ initialData, onSave }) => {
  const [bioData, setBioData] = useState({
    bio: initialData?.bio || `Dr. Priya Sharma is a dedicated Ayurvedic physician with over 12 years of experience in traditional Indian medicine. She specializes in Panchakarma treatments, ayurvedic nutrition, and holistic wellness approaches.\n\nDr. Sharma completed her Bachelor of Ayurvedic Medicine and Surgery (BAMS) from Gujarat Ayurved University and later pursued specialized training in Panchakarma from the National Institute of Ayurveda. Her practice focuses on treating digestive disorders, stress-related conditions, and chronic lifestyle diseases through personalized ayurvedic interventions.\n\nShe believes in the ancient wisdom of Ayurveda combined with modern diagnostic approaches to provide comprehensive healthcare solutions. Dr. Sharma is passionate about educating patients about preventive healthcare and sustainable lifestyle practices.`,
    philosophy: initialData?.philosophy || `My treatment philosophy centers around the fundamental Ayurvedic principle of treating the root cause rather than just symptoms. I believe in:\n\n• Personalized treatment based on individual constitution (Prakriti)\n• Integration of diet, lifestyle, and herbal medicines\n• Patient education and empowerment\n• Preventive healthcare through seasonal routines\n• Holistic approach addressing mind, body, and spirit`,
    achievements: initialData?.achievements || [
      'Published research on Ayurvedic nutrition in chronic diseases',
      'Conducted over 500 successful Panchakarma treatments',
      'Speaker at National Ayurveda Conference 2023',
      'Certified in Ayurvedic Pulse Diagnosis',
      'Member of All India Ayurvedic Congress'
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newAchievement, setNewAchievement] = useState('');

  const handleSave = () => {
    onSave(bioData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setBioData({
      bio: initialData?.bio || `Dr. Priya Sharma is a dedicated Ayurvedic physician with over 12 years of experience in traditional Indian medicine. She specializes in Panchakarma treatments, ayurvedic nutrition, and holistic wellness approaches.\n\nDr. Sharma completed her Bachelor of Ayurvedic Medicine and Surgery (BAMS) from Gujarat Ayurved University and later pursued specialized training in Panchakarma from the National Institute of Ayurveda. Her practice focuses on treating digestive disorders, stress-related conditions, and chronic lifestyle diseases through personalized ayurvedic interventions.\n\nShe believes in the ancient wisdom of Ayurveda combined with modern diagnostic approaches to provide comprehensive healthcare solutions. Dr. Sharma is passionate about educating patients about preventive healthcare and sustainable lifestyle practices.`,
      philosophy: initialData?.philosophy || `My treatment philosophy centers around the fundamental Ayurvedic principle of treating the root cause rather than just symptoms. I believe in:\n\n• Personalized treatment based on individual constitution (Prakriti)\n• Integration of diet, lifestyle, and herbal medicines\n• Patient education and empowerment\n• Preventive healthcare through seasonal routines\n• Holistic approach addressing mind, body, and spirit`,
      achievements: initialData?.achievements || [
        'Published research on Ayurvedic nutrition in chronic diseases',
        'Conducted over 500 successful Panchakarma treatments',
        'Speaker at National Ayurveda Conference 2023',
        'Certified in Ayurvedic Pulse Diagnosis',
        'Member of All India Ayurvedic Congress'
      ]
    });
    setIsEditing(false);
  };

  const handleAddAchievement = () => {
    if (newAchievement?.trim()) {
      setBioData(prev => ({
        ...prev,
        achievements: [...prev?.achievements, newAchievement?.trim()]
      }));
      setNewAchievement('');
    }
  };

  const handleRemoveAchievement = (index) => {
    setBioData(prev => ({
      ...prev,
      achievements: prev?.achievements?.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-elevation-2 border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Professional Bio & Philosophy
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
        {/* Professional Bio */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Professional Biography
          </label>
          {isEditing ? (
            <textarea
              value={bioData?.bio}
              onChange={(e) => setBioData(prev => ({ ...prev, bio: e?.target?.value }))}
              rows={8}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              placeholder="Write your professional biography..."
            />
          ) : (
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-foreground whitespace-pre-line font-body text-sm leading-relaxed">
                {bioData?.bio}
              </p>
            </div>
          )}
        </div>

        {/* Treatment Philosophy */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Treatment Philosophy
          </label>
          {isEditing ? (
            <textarea
              value={bioData?.philosophy}
              onChange={(e) => setBioData(prev => ({ ...prev, philosophy: e?.target?.value }))}
              rows={6}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              placeholder="Describe your treatment philosophy..."
            />
          ) : (
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-foreground whitespace-pre-line font-body text-sm leading-relaxed">
                {bioData?.philosophy}
              </p>
            </div>
          )}
        </div>

        {/* Achievements */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Key Achievements & Recognition
          </label>
          
          <div className="space-y-3">
            {bioData?.achievements?.map((achievement, index) => (
              <div key={index} className="flex items-start justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-foreground font-body text-sm">
                    {achievement}
                  </p>
                </div>
                
                {isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveAchievement(index)}
                    iconName="X"
                    className="text-destructive hover:text-destructive ml-2"
                  />
                )}
              </div>
            ))}
          </div>

          {isEditing && (
            <div className="mt-4 flex space-x-2">
              <input
                type="text"
                value={newAchievement}
                onChange={(e) => setNewAchievement(e?.target?.value)}
                placeholder="Add new achievement..."
                className="flex-1 px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                onKeyPress={(e) => {
                  if (e?.key === 'Enter') {
                    handleAddAchievement();
                  }
                }}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddAchievement}
                iconName="Plus"
                disabled={!newAchievement?.trim()}
              >
                Add
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalBio;