import React, { useState } from 'react';
import Icon from '../AppIcon';

const NavigationMenuItem = ({
  item,
  isActive = false,
  isCollapsed = false,
  onNavigate,
  isActiveRoute,
  level = 0
}) => {
  const [isExpanded, setIsExpanded] = useState(isActive);

  const handleClick = () => {
    if (item?.path) {
      onNavigate(item?.path);
    } else if (item?.children) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleChildClick = (childPath) => {
    onNavigate(childPath);
  };

  const hasActiveChild = item?.children?.some((child) =>
    isActiveRoute(child?.path)
  );

  return (
    <div className="space-y-1">
      {/* Parent Button */}
      <button
        onClick={handleClick}
        className={`
          relative w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left
          transition-all duration-200 ease-in-out group
          ${level > 0 ? 'ml-4' : ''}
          ${
            isActive || hasActiveChild
              ? 'bg-primary text-primary-foreground shadow-elevation-1'
              : 'text-foreground hover:bg-muted hover:text-foreground'
          }
        `}
        title={isCollapsed ? item?.label : item?.description}
      >
        <Icon
          name={item?.icon}
          size={20}
          className={`
            flex-shrink-0 transition-colors duration-200
            ${
              isActive || hasActiveChild
                ? 'text-primary-foreground'
                : 'text-muted-foreground group-hover:text-foreground'
            }
          `}
        />

        {!isCollapsed && (
          <>
            <span className="flex-1 font-body font-medium text-sm truncate">
              {item?.label}
            </span>

            {item?.children && (
              <Icon
                name="ChevronDown"
                size={16}
                className={`
                  transition-transform duration-300 ease-out
                  ${isExpanded ? 'rotate-180' : 'rotate-0'}
                  ${
                    isActive || hasActiveChild
                      ? 'text-primary-foreground'
                      : 'text-muted-foreground group-hover:text-foreground'
                  }
                `}
              />
            )}
          </>
        )}
      </button>

      {/* Submenu */}
      {item?.children && !isCollapsed && (
        <div
          className={`
            overflow-hidden transition-all duration-300 ease-in-out
            ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="ml-6 space-y-1 pt-1">
            {item?.children?.map((child, index) => (
              <button
                key={index}
                onClick={() => handleChildClick(child?.path)}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left
                  transition-all duration-200 ease-in-out group
                  ${
                    isActiveRoute(child?.path)
                      ? 'bg-secondary text-secondary-foreground shadow-elevation-1'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }
                `}
                title={child?.description}
              >
                <Icon
                  name={child?.icon}
                  size={16}
                  className={`
                    flex-shrink-0 transition-colors duration-200
                    ${
                      isActiveRoute(child?.path)
                        ? 'text-secondary-foreground'
                        : 'text-muted-foreground group-hover:text-foreground'
                    }
                  `}
                />
                <span className="flex-1 font-body text-sm truncate">
                  {child?.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Collapsed submenu active indicator */}
      {item?.children && isCollapsed && hasActiveChild && (
        <div className="w-1 h-6 bg-secondary rounded-full ml-7" />
      )}
    </div>
  );
};

export default NavigationMenuItem;
