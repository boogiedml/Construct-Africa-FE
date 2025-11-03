import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import ActionButton from './ActionButton';

interface PresetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (presetName: string) => void;
}

const PresetModal: React.FC<PresetModalProps> = ({ isOpen, onClose, onSave }) => {
  const [presetName, setPresetName] = useState('');

  const handleSave = () => {
    if (presetName.trim()) {
      onSave(presetName.trim());
      setPresetName('');
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#E9EAEB]">
            <h3 className="text-lg font-semibold text-[#181D27]">Name your preset</h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <IoClose size={24} className="text-[#535862]" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            <label className="block text-sm font-medium text-[#181D27] mb-2">
              Preset name
            </label>
            <input
              type="text"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter preset name"
              className="w-full px-3 py-2 border border-[#D5D7DA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F89822] focus:border-transparent text-sm"
              autoFocus
            />
          </div>

          {/* Footer */}
          <div className="p-6 pt-0">
            <ActionButton
              buttonText="Save preset"
              outline={false}
              width="full"
              fullyRounded
              backgroundColor='#E0891E'
              attributes={{
                onClick: handleSave,
                disabled: !presetName.trim()
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PresetModal;