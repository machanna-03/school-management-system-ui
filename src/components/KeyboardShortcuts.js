import React, { useEffect } from 'react';
import { Modal, Text, Group, Kbd, Stack, Divider } from '@mantine/core';

const KeyboardShortcuts = ({ opened, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && opened) {
        onClose();
      }
    };

    if (opened) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [opened, onClose]);

  const shortcuts = [
    {
      category: 'Navigation',
      items: [
        { keys: ['Ctrl', 'B'], description: 'Toggle sidebar' },
        { keys: ['Ctrl', 'K'], description: 'Global search' },
        { keys: ['Ctrl', 'N'], description: 'New item (context dependent)' },
        { keys: ['Esc'], description: 'Close modals/dialogs' },
      ]
    },
    {
      category: 'User Management',
      items: [
        { keys: ['Ctrl', 'U'], description: 'Add new user' },
        { keys: ['F2'], description: 'Edit selected user' },
        { keys: ['Delete'], description: 'Delete selected user' },
      ]
    },
    {
      category: 'Patient Management',
      items: [
        { keys: ['Ctrl', 'P'], description: 'Add new patient' },
        { keys: ['F3'], description: 'View patient details' },
        { keys: ['F4'], description: 'Edit patient record' },
      ]
    },
    {
      category: 'Appointments',
      items: [
        { keys: ['Ctrl', 'A'], description: 'Schedule new appointment' },
        { keys: ['F5'], description: 'Refresh appointments' },
        { keys: ['Ctrl', 'Shift', 'A'], description: 'View all appointments' },
      ]
    },
    {
      category: 'General',
      items: [
        { keys: ['Ctrl', 'S'], description: 'Save changes' },
        { keys: ['Ctrl', 'Z'], description: 'Undo last action' },
        { keys: ['Ctrl', 'Y'], description: 'Redo last action' },
        { keys: ['F1'], description: 'Help & Documentation' },
        { keys: ['Ctrl', 'Shift', 'S'], description: 'Settings' },
      ]
    }
  ];

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Keyboard Shortcuts"
      size="lg"
      centered
    >
      <Stack>
        {shortcuts.map((category, categoryIndex) => (
          <div key={category.category}>
            <Text size="lg" fw={600} mb="sm" c="blue">
              {category.category}
            </Text>
            <Stack gap="xs">
              {category.items.map((shortcut, index) => (
                <Group key={index} justify="space-between" p="xs" style={{ borderRadius: '4px', backgroundColor: '#f8f9fa' }}>
                  <Text size="sm">{shortcut.description}</Text>
                  <Group gap={2}>
                    {shortcut.keys.map((key, keyIndex) => (
                      <React.Fragment key={keyIndex}>
                        <Kbd size="sm">{key}</Kbd>
                        {keyIndex < shortcut.keys.length - 1 && <Text size="xs" c="dimmed">+</Text>}
                      </React.Fragment>
                    ))}
                  </Group>
                </Group>
              ))}
            </Stack>
            {categoryIndex < shortcuts.length - 1 && <Divider my="md" />}
          </div>
        ))}

        <Text size="sm" c="dimmed" mt="md">
          <strong>Tip:</strong> Keyboard shortcuts work when focused on the main content area.
          Some shortcuts may be context-dependent based on the current section.
        </Text>
      </Stack>
    </Modal>
  );
};

export default KeyboardShortcuts;