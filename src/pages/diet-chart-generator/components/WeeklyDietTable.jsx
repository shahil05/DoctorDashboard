import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const WeeklyDietTable = ({ dietData, onMealUpdate, onSaveChart }) => {
  const [editingCell, setEditingCell] = useState(null);
  const [tempValue, setTempValue] = useState('');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];

  const defaultMeals = {
    Monday: {
      Breakfast: 'Warm oats with almonds and honey\nHerbal tea (ginger-tulsi)',
      Lunch: 'Quinoa with steamed vegetables\nButtermilk with cumin',
      Dinner: 'Khichdi with ghee\nWarm milk with turmeric'
    },
    Tuesday: {
      Breakfast: 'Upma with vegetables\nFresh lime water',
      Lunch: 'Brown rice with dal\nCucumber raita',
      Dinner: 'Vegetable soup\nChamomile tea'
    },
    Wednesday: {
      Breakfast: 'Poha with peanuts\nGreen tea',
      Lunch: 'Roti with sabzi\nLassi (sweet)',
      Dinner: 'Moong dal khichdi\nWarm water with honey'
    },
    Thursday: {
      Breakfast: 'Idli with sambar\nCoconut water',
      Lunch: 'Rice with rasam\nSteamed vegetables',
      Dinner: 'Vegetable daliya\nHerbal tea'
    },
    Friday: {
      Breakfast: 'Dalia upma\nFresh fruit juice',
      Lunch: 'Chapati with curry\nButtermilk',
      Dinner: 'Light vegetable soup\nWarm milk'
    },
    Saturday: {
      Breakfast: 'Smoothie bowl\nHerbal tea',
      Lunch: 'Pulao with raita\nSalad',
      Dinner: 'Khichdi with vegetables\nTurmeric milk'
    },
    Sunday: {
      Breakfast: 'Pancakes (healthy)\nFresh juice',
      Lunch: 'Special thali\nLassi',
      Dinner: 'Light dinner\nChamomile tea'
    }
  };

  const handleCellClick = (day, meal) => {
    setEditingCell(`${day}-${meal}`);
    setTempValue(dietData?.[day]?.[meal] || defaultMeals?.[day]?.[meal] || '');
  };

  const handleCellSave = () => {
    if (editingCell) {
      const [day, meal] = editingCell?.split('-');
      onMealUpdate(day, meal, tempValue);
      setEditingCell(null);
      setTempValue('');
    }
  };

  const handleCellCancel = () => {
    setEditingCell(null);
    setTempValue('');
  };

  const getMealContent = (day, meal) => {
    return dietData?.[day]?.[meal] || defaultMeals?.[day]?.[meal] || '';
  };

  const formatMealText = (text) => {
    return text?.split('\n')?.map((line, index) => (
      <div key={index} className="text-sm font-body text-foreground">
        {line}
      </div>
    ));
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 border overflow-hidden">
      {/* Table Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-heading font-semibold">
            Weekly Diet Chart
          </h2>
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={20} />
            <span className="text-sm font-body">
              Week of {new Date()?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>
      </div>
      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="text-left p-4 font-heading font-medium text-foreground min-w-[120px]">
                Day / Meal
              </th>
              {mealTypes?.map((meal) => (
                <th key={meal} className="text-left p-4 font-heading font-medium text-foreground min-w-[250px]">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={meal === 'Breakfast' ? 'Coffee' : meal === 'Lunch' ? 'UtensilsCrossed' : 'Moon'} 
                      size={16} 
                    />
                    <span>{meal}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {daysOfWeek?.map((day, dayIndex) => (
              <tr key={day} className={`border-b hover:bg-muted/30 ${dayIndex % 2 === 0 ? 'bg-background' : 'bg-muted/10'}`}>
                <td className="p-4 font-heading font-medium text-foreground bg-muted/20">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>{day}</span>
                  </div>
                </td>
                {mealTypes?.map((meal) => {
                  const cellKey = `${day}-${meal}`;
                  const isEditing = editingCell === cellKey;
                  const content = getMealContent(day, meal);

                  return (
                    <td key={meal} className="p-4 align-top">
                      {isEditing ? (
                        <div className="space-y-2">
                          <textarea
                            value={tempValue}
                            onChange={(e) => setTempValue(e?.target?.value)}
                            className="w-full h-24 p-2 border rounded-lg resize-none text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder={`Enter ${meal?.toLowerCase()} for ${day}...`}
                            autoFocus
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={handleCellSave}
                              className="flex items-center space-x-1 px-2 py-1 bg-success text-success-foreground rounded text-xs hover:bg-success/90"
                            >
                              <Icon name="Check" size={12} />
                              <span>Save</span>
                            </button>
                            <button
                              onClick={handleCellCancel}
                              className="flex items-center space-x-1 px-2 py-1 bg-muted text-muted-foreground rounded text-xs hover:bg-muted/80"
                            >
                              <Icon name="X" size={12} />
                              <span>Cancel</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => handleCellClick(day, meal)}
                          className="min-h-[60px] p-2 rounded-lg border border-transparent hover:border-primary/30 hover:bg-primary/5 cursor-pointer transition-all duration-150 group"
                        >
                          {content ? (
                            <div className="space-y-1">
                              {formatMealText(content)}
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                              <div className="text-center">
                                <Icon name="Plus" size={16} className="mx-auto mb-1 group-hover:text-primary" />
                                <span className="text-xs font-caption group-hover:text-primary">
                                  Add {meal?.toLowerCase()}
                                </span>
                              </div>
                            </div>
                          )}
                          
                          {content && (
                            <div className="flex items-center justify-end mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                              <Icon name="Edit2" size={12} className="text-primary" />
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Table Footer */}
      <div className="bg-muted/30 p-4 border-t">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="Info" size={16} />
              <span className="font-caption">Click any cell to edit meal details</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} />
              <span className="font-caption">Last updated: {new Date()?.toLocaleTimeString()}</span>
            </div>
          </div>
          <button
            onClick={onSaveChart}
            className="flex items-center space-x-2 px-3 py-1 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-150"
          >
            <Icon name="Save" size={16} />
            <span className="font-body font-medium">Save Chart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeeklyDietTable;