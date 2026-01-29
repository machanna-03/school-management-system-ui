import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Stack, Text, Group, Avatar, Badge, Button, Divider } from '@mantine/core';
import { FaSearch, FaUser, FaUserInjured, FaCalendarAlt, FaFileMedical } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const GlobalSearch = ({ opened, onClose }) => {
  const { state } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState({ users: [], patients: [], appointments: [], medications: [] });

  useEffect(() => {
    if (searchTerm.length > 2) {
      const searchLower = searchTerm.toLowerCase();

      const filteredUsers = state.users.filter(user =>
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.role.toLowerCase().includes(searchLower)
      );

      const filteredPatients = state.patients.filter(patient =>
        patient.name.toLowerCase().includes(searchLower) ||
        patient.condition.toLowerCase().includes(searchLower) ||
        patient.doctor.toLowerCase().includes(searchLower)
      );

      const filteredAppointments = state.appointments.filter(appointment =>
        appointment.patient.toLowerCase().includes(searchLower) ||
        appointment.doctor.toLowerCase().includes(searchLower) ||
        appointment.type.toLowerCase().includes(searchLower)
      );

      const filteredMedications = state.medications.filter(medication =>
        medication.name.toLowerCase().includes(searchLower) ||
        medication.category.toLowerCase().includes(searchLower)
      );

      setResults({
        users: filteredUsers.slice(0, 5),
        patients: filteredPatients.slice(0, 5),
        appointments: filteredAppointments.slice(0, 5),
        medications: filteredMedications.slice(0, 5),
      });
    } else {
      setResults({ users: [], patients: [], appointments: [], medications: [] });
    }
  }, [searchTerm, state]);

  const renderSearchResult = (item, type, icon) => (
    <Group key={`${type}-${item.id}`} p="xs" style={{ cursor: 'pointer', borderRadius: '4px' }} className="search-result">
      <Avatar size="sm" radius="xl">
        {icon}
      </Avatar>
      <div style={{ flex: 1 }}>
        <Text size="sm" fw={500}>
          {item.name || item.patient || item.title}
        </Text>
        <Text size="xs" c="dimmed">
          {type === 'users' && `${item.role} • ${item.email}`}
          {type === 'patients' && `${item.condition} • ${item.doctor}`}
          {type === 'appointments' && `${item.date} ${item.time} • ${item.type}`}
          {type === 'medications' && `${item.category} • ${item.stock} in stock`}
        </Text>
      </div>
      <Badge size="xs" color={
        type === 'users' ? 'blue' :
        type === 'patients' ? 'green' :
        type === 'appointments' ? 'orange' : 'purple'
      }>
        {type.slice(0, -1)}
      </Badge>
    </Group>
  );

  const hasResults = Object.values(results).some(arr => arr.length > 0);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Global Search"
      size="lg"
      centered
    >
      <Stack>
        <TextInput
          placeholder="Search users, patients, appointments, medications..."
          leftSection={<FaSearch />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus
        />

        {searchTerm.length > 0 && searchTerm.length <= 2 && (
          <Text size="sm" c="dimmed" ta="center">
            Type at least 3 characters to search
          </Text>
        )}

        {searchTerm.length > 2 && !hasResults && (
          <Text size="sm" c="dimmed" ta="center">
            No results found for "{searchTerm}"
          </Text>
        )}

        {hasResults && (
          <Stack gap="xs">
            {results.users.length > 0 && (
              <>
                <Text size="sm" fw={500} c="blue">Users ({results.users.length})</Text>
                {results.users.map(user => renderSearchResult(user, 'users', <FaUser />))}
                <Divider />
              </>
            )}

            {results.patients.length > 0 && (
              <>
                <Text size="sm" fw={500} c="green">Patients ({results.patients.length})</Text>
                {results.patients.map(patient => renderSearchResult(patient, 'patients', <FaUserInjured />))}
                <Divider />
              </>
            )}

            {results.appointments.length > 0 && (
              <>
                <Text size="sm" fw={500} c="orange">Appointments ({results.appointments.length})</Text>
                {results.appointments.map(appointment => renderSearchResult(appointment, 'appointments', <FaCalendarAlt />))}
                <Divider />
              </>
            )}

            {results.medications.length > 0 && (
              <>
                <Text size="sm" fw={500} c="purple">Medications ({results.medications.length})</Text>
                {results.medications.map(medication => renderSearchResult(medication, 'medications', <FaFileMedical />))}
              </>
            )}
          </Stack>
        )}

        <Group justify="flex-end" mt="md">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default GlobalSearch;