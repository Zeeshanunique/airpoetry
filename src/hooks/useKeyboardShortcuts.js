import { useEffect, useCallback } from 'react';

/**
 * Hook to handle keyboard shortcuts
 * @param {Object} shortcuts - Object mapping key combinations to callbacks
 * @param {boolean} enabled - Whether shortcuts are enabled
 * 
 * Key format examples:
 * - 'ctrl+g' or 'meta+g' (for Cmd on Mac)
 * - 'ctrl+shift+s'
 * - 'escape'
 * - 'enter'
 */
export function useKeyboardShortcuts(shortcuts, enabled = true) {
  const handleKeyDown = useCallback(
    (event) => {
      if (!enabled) return;

      // Don't trigger shortcuts when typing in inputs/textareas
      const target = event.target;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        // Allow Escape to work even in inputs
        if (event.key !== 'Escape') {
          return;
        }
      }

      // Build the key combination string
      const parts = [];
      if (event.ctrlKey) parts.push('ctrl');
      if (event.metaKey) parts.push('meta');
      if (event.altKey) parts.push('alt');
      if (event.shiftKey) parts.push('shift');
      parts.push(event.key.toLowerCase());

      const combination = parts.join('+');

      // Check for matching shortcuts
      Object.entries(shortcuts).forEach(([shortcut, callback]) => {
        const normalizedShortcut = shortcut.toLowerCase();
        
        // Support both ctrl and meta (for Mac users)
        const variants = [
          normalizedShortcut,
          normalizedShortcut.replace('ctrl', 'meta'),
          normalizedShortcut.replace('meta', 'ctrl'),
        ];

        if (variants.includes(combination)) {
          event.preventDefault();
          callback(event);
        }
      });
    },
    [shortcuts, enabled]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

/**
 * Hook to show keyboard shortcut hints
 */
export function useShortcutHints() {
  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  
  return {
    isMac,
    modKey: isMac ? '⌘' : 'Ctrl',
    shortcuts: {
      generate: isMac ? '⌘+G' : 'Ctrl+G',
      download: isMac ? '⌘+D' : 'Ctrl+D',
      copy: isMac ? '⌘+C' : 'Ctrl+C',
      translate: isMac ? '⌘+T' : 'Ctrl+T',
    },
  };
}

export default useKeyboardShortcuts;


