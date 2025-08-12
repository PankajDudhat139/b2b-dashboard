import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useAuth } from '../../hooks/useAuth';

const SettingsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
`;

const PageTitle = styled.h1`
  font-size: ${theme.fontSizes['3xl']};
  font-weight: 600;
  margin-bottom: ${theme.spacing.xl};
  color: ${theme.colors.primary};
`;

const Section = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.md};
  margin-bottom: ${theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: ${theme.fontSizes.xl};
  font-weight: 600;
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.gray700};
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.lg};
  
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const SettingsPage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (user?.profile) {
      setFormData(user.profile);
    }
  }, [user]);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (user) {
      updateProfile(formData);
      alert('Settings updated successfully!');
    }
  };

  return (
    <SettingsContainer>
      <PageTitle>Settings</PageTitle>

      <Section>
        <SectionTitle>Profile Information</SectionTitle>
        <FormGrid>
          {user?.type === 'buyer' && (
            <>
              <Input
                label="Full Name"
                value={formData.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
              />
              <Input
                label="Location"
                value={formData.location || ''}
                onChange={(e) => handleChange('location', e.target.value)}
              />
              <Input
                label="Primary Industry Interest"
                value={formData.industry || ''}
                onChange={(e) => handleChange('industry', e.target.value)}
              />
            </>
          )}
          {user?.type === 'seller' && (
            <>
              <Input
                label="Business Name"
                value={formData.businessName || ''}
                onChange={(e) => handleChange('businessName', e.target.value)}
              />
              <Input
                label="Location"
                value={formData.location || ''}
                onChange={(e) => handleChange('location', e.target.value)}
              />
              <Input
                label="Industry"
                value={formData.industry || ''}
                onChange={(e) => handleChange('industry', e.target.value)}
              />
            </>
          )}
        </FormGrid>
      </Section>

      <Section>
        <SectionTitle>Notification Preferences</SectionTitle>
        <div>
          <label>
            <input
              type="checkbox"
              checked={formData.emailNotifications ?? true}
              onChange={(e) => handleChange('emailNotifications', e.target.checked)}
            />
            &nbsp; Email notifications for new matches
          </label>
        </div>
        <div style={{ marginTop: theme.spacing.md }}>
          <label>
            <input
              type="checkbox"
              checked={formData.messageNotifications ?? true}
              onChange={(e) => handleChange('messageNotifications', e.target.checked)}
            />
            &nbsp; Email notifications for messages
          </label>
        </div>
      </Section>

      <Button onClick={handleSave}>Save Changes</Button>
    </SettingsContainer>
  );
};
