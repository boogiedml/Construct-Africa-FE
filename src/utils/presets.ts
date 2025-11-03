import type { AppFilters } from '../types/filter.types';

// Types
export interface FilterPreset {
  id: string;
  name: string;
  filters: AppFilters;
  createdAt: string;
  type: 'projects' | 'companies' | 'news' | 'tenders';
}

export interface DefaultView {
  sortBy: string;
  grouping: string;
  activeView: string;
  presetId?: string;
}

// Generate unique ID for presets
const generateId = (): string => {
  return `preset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Get user ID (in a real app, this would come from auth context)
const getUserId = (): string => {
  let userId = localStorage.getItem('current_user_id');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('current_user_id', userId);
  }
  return userId;
};

// Storage keys with user isolation
const getPresetsKey = (type: string): string => {
  const userId = getUserId();
  return `${userId}_${type}_presets`;
};

const getDefaultViewKey = (type: string): string => {
  const userId = getUserId();
  return `${userId}_${type}_default_view`;
};

// Preset Management Functions
export const savePreset = (
  name: string, 
  filters: AppFilters, 
  type: 'projects' | 'companies' | 'news' | 'tenders'
): FilterPreset => {
  const preset: FilterPreset = {
    id: generateId(),
    name,
    filters,
    createdAt: new Date().toISOString(),
    type
  };

  const existingPresets = getPresets(type);
  const updatedPresets = [...existingPresets, preset];
  
  localStorage.setItem(getPresetsKey(type), JSON.stringify(updatedPresets));
  
  return preset;
};

export const getPresets = (type: string): FilterPreset[] => {
  try {
    const stored = localStorage.getItem(getPresetsKey(type));
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading presets:', error);
    return [];
  }
};

export const getPresetById = (id: string, type: string): FilterPreset | null => {
  const presets = getPresets(type);
  return presets.find(p => p.id === id) || null;
};

export const deletePreset = (id: string, type: string): void => {
  const presets = getPresets(type);
  const updatedPresets = presets.filter(p => p.id !== id);
  localStorage.setItem(getPresetsKey(type), JSON.stringify(updatedPresets));
  
  // If this was the default view, clear it
  const defaultView = getDefaultView(type);
  if (defaultView?.presetId === id) {
    clearDefaultView(type);
  }
};

export const updatePreset = (
  id: string, 
  updates: Partial<Omit<FilterPreset, 'id' | 'createdAt'>>,
  type: string
): FilterPreset | null => {
  const presets = getPresets(type);
  const index = presets.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  const updatedPreset = { ...presets[index], ...updates };
  presets[index] = updatedPreset;
  
  localStorage.setItem(getPresetsKey(type), JSON.stringify(presets));
  
  return updatedPreset;
};

// Default View Management Functions
export const saveDefaultView = (
  view: DefaultView,
  type: 'projects' | 'companies' | 'news' | 'tenders'
): void => {
  localStorage.setItem(getDefaultViewKey(type), JSON.stringify(view));
};

export const getDefaultView = (type: string): DefaultView | null => {
  try {
    const stored = localStorage.getItem(getDefaultViewKey(type));
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading default view:', error);
    return null;
  }
};

export const clearDefaultView = (type: string): void => {
  localStorage.removeItem(getDefaultViewKey(type));
};

// Check if a preset is being used as default view
export const isPresetDefault = (presetId: string, type: string): boolean => {
  const defaultView = getDefaultView(type);
  return defaultView?.presetId === presetId;
};