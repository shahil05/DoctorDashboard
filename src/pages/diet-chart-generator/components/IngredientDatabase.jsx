import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const IngredientDatabase = ({ isVisible, onClose, onIngredientSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Ingredients', icon: 'List' },
    { id: 'grains', name: 'Grains & Cereals', icon: 'Wheat' },
    { id: 'vegetables', name: 'Vegetables', icon: 'Carrot' },
    { id: 'fruits', name: 'Fruits', icon: 'Apple' },
    { id: 'spices', name: 'Spices & Herbs', icon: 'Leaf' },
    { id: 'dairy', name: 'Dairy & Alternatives', icon: 'Milk' },
    { id: 'proteins', name: 'Proteins', icon: 'Fish' }
  ];

  const ingredients = [
    {
      id: 1,
      name: 'Basmati Rice',
      category: 'grains',
      dosha: ['Vata', 'Pitta'],
      rasa: 'Madhura (Sweet)',
      virya: 'Sheeta (Cool)',
      vipaka: 'Madhura (Sweet)',
      properties: ['Easy to digest', 'Cooling', 'Nourishing'],
      contraindications: ['Kapha excess', 'Diabetes (in large quantities)'],
      nutritional: {
        calories: '130 per 100g',
        protein: '2.7g',
        carbs: '28g',
        fiber: '0.4g'
      },
      ayurvedicUse: 'Balances Vata and Pitta doshas, provides sustained energy'
    },
    {
      id: 2,
      name: 'Turmeric',
      category: 'spices',
      dosha: ['Vata', 'Kapha', 'Pitta'],
      rasa: 'Tikta (Bitter), Katu (Pungent)',
      virya: 'Ushna (Hot)',
      vipaka: 'Katu (Pungent)',
      properties: ['Anti-inflammatory', 'Digestive', 'Blood purifier'],
      contraindications: ['Excessive Pitta', 'Gallstones', 'Blood thinning medications'],
      nutritional: {
        calories: '29 per tbsp',
        protein: '0.9g',
        carbs: '6.3g',
        fiber: '2.1g'
      },
      ayurvedicUse: 'Powerful anti-inflammatory, supports digestion and immunity'
    },
    {
      id: 3,
      name: 'Spinach',
      category: 'vegetables',
      dosha: ['Pitta', 'Kapha'],
      rasa: 'Kashaya (Astringent), Madhura (Sweet)',
      virya: 'Sheeta (Cool)',
      vipaka: 'Katu (Pungent)',
      properties: ['Iron-rich', 'Cooling', 'Blood building'],
      contraindications: ['Kidney stones', 'Excessive Vata'],
      nutritional: {
        calories: '23 per 100g',
        protein: '2.9g',
        carbs: '3.6g',
        fiber: '2.2g'
      },
      ayurvedicUse: 'Builds blood, cools Pitta, supports liver function'
    },
    {
      id: 4,
      name: 'Ginger',
      category: 'spices',
      dosha: ['Vata', 'Kapha'],
      rasa: 'Katu (Pungent)',
      virya: 'Ushna (Hot)',
      vipaka: 'Madhura (Sweet)',
      properties: ['Digestive fire enhancer', 'Anti-nausea', 'Warming'],
      contraindications: ['Excessive Pitta', 'Peptic ulcers', 'High fever'],
      nutritional: {
        calories: '4 per tsp',
        protein: '0.1g',
        carbs: '0.9g',
        fiber: '0.1g'
      },
      ayurvedicUse: 'Kindles digestive fire, reduces Ama (toxins), warming'
    },
    {
      id: 5,
      name: 'Almonds',
      category: 'proteins',
      dosha: ['Vata', 'Pitta'],
      rasa: 'Madhura (Sweet)',
      virya: 'Ushna (Hot)',
      vipaka: 'Madhura (Sweet)',
      properties: ['Brain tonic', 'Nourishing', 'Strength building'],
      contraindications: ['Excessive Kapha', 'Poor digestion'],
      nutritional: {
        calories: '161 per 28g',
        protein: '6g',
        carbs: '6g',
        fiber: '3.5g'
      },
      ayurvedicUse: 'Nourishes brain and nervous system, builds Ojas (vitality)'
    },
    {
      id: 6,
      name: 'Coconut Water',
      category: 'dairy',
      dosha: ['Pitta', 'Vata'],
      rasa: 'Madhura (Sweet)',
      virya: 'Sheeta (Cool)',
      vipaka: 'Madhura (Sweet)',
      properties: ['Hydrating', 'Cooling', 'Electrolyte balance'],
      contraindications: ['Excessive Kapha', 'Cold conditions'],
      nutritional: {
        calories: '46 per cup',
        protein: '1.7g',
        carbs: '8.9g',
        fiber: '2.6g'
      },
      ayurvedicUse: 'Natural coolant, balances electrolytes, soothes Pitta'
    }
  ];

  const filteredIngredients = ingredients?.filter(ingredient => {
    const matchesSearch = ingredient?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         ingredient?.properties?.some(prop => prop?.toLowerCase()?.includes(searchTerm?.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || ingredient?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDoshaColor = (dosha) => {
    const colors = {
      'Vata': 'bg-blue-100 text-blue-800',
      'Pitta': 'bg-red-100 text-red-800',
      'Kapha': 'bg-green-100 text-green-800'
    };
    return colors?.[dosha] || 'bg-gray-100 text-gray-800';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-elevation-4 border max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Ayurvedic Ingredient Database
            </h2>
            <p className="text-sm text-muted-foreground font-body mt-1">
              Explore ingredients with their Ayurvedic properties and nutritional information
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors duration-150"
          >
            <Icon name="X" size={24} className="text-muted-foreground" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Sidebar */}
          <div className="w-64 border-r bg-muted/30 p-4">
            <div className="mb-4">
              <Input
                type="search"
                placeholder="Search ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-heading font-medium text-foreground mb-3">
                Categories
              </h3>
              {categories?.map((category) => (
                <button
                  key={category?.id}
                  onClick={() => setSelectedCategory(category?.id)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-150
                    ${selectedCategory === category?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon name={category?.icon} size={16} />
                  <span className="text-sm font-body">{category?.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid gap-4">
              {filteredIngredients?.map((ingredient) => (
                <div
                  key={ingredient?.id}
                  className="bg-background border rounded-lg p-4 hover:shadow-elevation-2 transition-all duration-150"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">
                        {ingredient?.name}
                      </h3>
                      <p className="text-sm text-muted-foreground font-body mt-1">
                        {ingredient?.ayurvedicUse}
                      </p>
                    </div>
                    <button
                      onClick={() => onIngredientSelect(ingredient)}
                      className="flex items-center space-x-2 px-3 py-1 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-150"
                    >
                      <Icon name="Plus" size={16} />
                      <span className="text-sm font-body">Add</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Ayurvedic Properties */}
                    <div>
                      <h4 className="text-sm font-heading font-medium text-foreground mb-2">
                        Ayurvedic Properties
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-caption text-muted-foreground">Suitable for: </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {ingredient?.dosha?.map((dosha) => (
                              <span key={dosha} className={`px-2 py-1 rounded-full text-xs font-caption ${getDoshaColor(dosha)}`}>
                                {dosha}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="font-caption text-muted-foreground">Rasa: </span>
                          <span className="font-body text-foreground">{ingredient?.rasa}</span>
                        </div>
                        <div>
                          <span className="font-caption text-muted-foreground">Virya: </span>
                          <span className="font-body text-foreground">{ingredient?.virya}</span>
                        </div>
                      </div>
                    </div>

                    {/* Properties & Benefits */}
                    <div>
                      <h4 className="text-sm font-heading font-medium text-foreground mb-2">
                        Properties
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {ingredient?.properties?.map((property, index) => (
                          <span key={index} className="px-2 py-1 bg-success/10 text-success rounded-full text-xs font-caption">
                            {property}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Nutritional Info */}
                    <div>
                      <h4 className="text-sm font-heading font-medium text-foreground mb-2">
                        Nutritional Info
                      </h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="font-caption text-muted-foreground">Calories:</span>
                          <span className="font-mono text-foreground">{ingredient?.nutritional?.calories}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-caption text-muted-foreground">Protein:</span>
                          <span className="font-mono text-foreground">{ingredient?.nutritional?.protein}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-caption text-muted-foreground">Carbs:</span>
                          <span className="font-mono text-foreground">{ingredient?.nutritional?.carbs}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contraindications */}
                  {ingredient?.contraindications?.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <h4 className="text-sm font-heading font-medium text-foreground mb-2 flex items-center space-x-2">
                        <Icon name="AlertTriangle" size={16} className="text-warning" />
                        <span>Contraindications</span>
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {ingredient?.contraindications?.map((contra, index) => (
                          <span key={index} className="px-2 py-1 bg-warning/10 text-warning rounded-full text-xs font-caption">
                            {contra}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredIngredients?.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-heading font-medium text-foreground mb-2">
                  No ingredients found
                </h3>
                <p className="text-muted-foreground font-body">
                  Try adjusting your search terms or category filter
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientDatabase;