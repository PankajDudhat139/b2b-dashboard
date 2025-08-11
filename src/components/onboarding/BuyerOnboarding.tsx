import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { BuyerProfile, OnboardingStep } from "../../types";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { OnboardingLayout } from "./OnboardingLayout";
import { theme } from "../../styles/theme";
import { useAuth } from "../../hooks/useAuth";

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: ${theme.colors.gray200};
  border-radius: ${theme.borderRadius.sm};
  margin-bottom: ${theme.spacing.xl};
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background: linear-gradient(
    90deg,
    ${theme.colors.primary},
    ${theme.colors.primaryLight}
  );
  border-radius: ${theme.borderRadius.sm};
  width: ${(props) => props.progress}%;
  transition: width 0.3s ease;
`;

const StepHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing["2xl"]};

  h2 {
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.sm};
    font-size: ${theme.fontSizes["3xl"]};
    font-weight: 600;
  }

  p {
    color: ${theme.colors.gray500};
    font-size: ${theme.fontSizes.base};
  }
`;

const FormGrid = styled.div`
  display: grid;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing["2xl"]};
`;

const Select = styled.select<{ hasError?: boolean }>`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 2px solid
    ${(props) => (props.hasError ? theme.colors.danger : theme.colors.gray200)};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.fontSizes.base};
  background: white;
  transition: all 0.3s ease;
  font-family: ${theme.fonts.primary};

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.hasError ? theme.colors.danger : theme.colors.primary};
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.hasError
          ? `${theme.colors.danger}20`
          : `${theme.colors.primary}20`};
  }
`;

const TextArea = styled.textarea<{ hasError?: boolean }>`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 2px solid
    ${(props) => (props.hasError ? theme.colors.danger : theme.colors.gray200)};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.fontSizes.base};
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: ${theme.fonts.primary};

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.hasError ? theme.colors.danger : theme.colors.primary};
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.hasError
          ? `${theme.colors.danger}20`
          : `${theme.colors.primary}20`};
  }

  &::placeholder {
    color: ${theme.colors.gray400};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  color: ${theme.colors.gray700};
  font-weight: 500;
  margin-bottom: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.base};
`;

const ErrorText = styled.span`
  color: ${theme.colors.danger};
  font-size: ${theme.fontSizes.sm};
  margin-top: ${theme.spacing.xs};
  display: block;
`;

const buyerOnboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    title: "Tell us about yourself",
    description: "Help us understand what you're looking for",
    fields: [
      {
        name: "name",
        type: "text",
        label: "Full Name",
        required: true,
        placeholder: "John Doe",
      },
      {
        name: "location",
        type: "text",
        label: "Location",
        required: true,
        placeholder: "City, State",
      },
      {
        name: "experience",
        type: "select",
        label: "Buying Experience",
        required: true,
        options: ["first-time", "experienced", "serial"],
      },
      {
        name: "timeline",
        type: "select",
        label: "Purchase Timeline",
        required: true,
        options: [
          "Immediately",
          "Within 3 months",
          "Within 6 months",
          "Within 1 year",
          "Over 1 year",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Investment Preferences",
    description: "Let's discuss your budget and preferences",
    fields: [
      {
        name: "investmentMin",
        type: "number",
        label: "Minimum Investment ($)",
        required: true,
        placeholder: "100000",
      },
      {
        name: "investmentMax",
        type: "number",
        label: "Maximum Investment ($)",
        required: true,
        placeholder: "1000000",
      },
      {
        name: "fundingSource",
        type: "select",
        label: "Funding Source",
        required: true,
        options: ["personal-savings", "bank-loan", "investors", "combination"],
      },
      {
        name: "preferredBusinessSize",
        type: "select",
        label: "Preferred Business Size",
        required: true,
        options: ["small", "medium", "large"],
      },
    ],
  },
  {
    id: 3,
    title: "Industry & Background",
    description: "What type of business are you interested in?",
    fields: [
      {
        name: "industry",
        type: "select",
        label: "Primary Industry Interest",
        required: true,
        options: [
          "Technology",
          "Healthcare",
          "Retail",
          "Manufacturing",
          "Food & Beverage",
          "Professional Services",
          "Construction",
          "Any",
        ],
      },
      {
        name: "bio",
        type: "textarea",
        label: "About You",
        required: true,
        placeholder:
          "Tell sellers about your background, experience, and what you bring to the table...",
      },
    ],
  },
];

interface BuyerOnboardingProps {
  onComplete: (profile: BuyerProfile) => void;
}

export const BuyerOnboarding: React.FC<BuyerOnboardingProps> = ({
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { user, createTemporaryUser } = useAuth();

  useEffect(() => {
    if (!user) {
      createTemporaryUser("buyer");
    }
  }, [user, createTemporaryUser]);

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("bizMatch_buyerOnboarding");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed.formData || {});
        setCurrentStep(parsed.currentStep || 0);
      } catch (error) {
        console.error("Error loading saved onboarding data:", error);
      }
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback((data: any, step: number) => {
    try {
      localStorage.setItem(
        "bizMatch_buyerOnboarding",
        JSON.stringify({
          formData: data,
          currentStep: step,
          lastSaved: Date.now(),
        })
      );
    } catch (error) {
      console.error("Error saving onboarding progress:", error);
    }
  }, []);

  const handleInputChange = useCallback(
    (field: string, value: string | number) => {
      setFormData((prev: any) => ({
        ...prev,
        [field]: value,
      }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: "",
        }));
      }
    },
    [errors]
  );

  const validateStep = () => {
    const currentStepData = buyerOnboardingSteps[currentStep];
    const newErrors: Record<string, string> = {};

    currentStepData.fields.forEach((field) => {
      if (field.required) {
        const value = formData[field.name];
        if (!value || value === "") {
          newErrors[field.name] = `${field.label} is required`;
        }
      }
    });

    // Special validation for investment range
    if (currentStep === 1) {
      const min = Number(formData.investmentMin);
      const max = Number(formData.investmentMax);
      if (min && max && min >= max) {
        newErrors.investmentMax = "Maximum must be greater than minimum";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = useCallback(() => {
    if (!validateStep()) return;

    if (currentStep < buyerOnboardingSteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      saveProgress(formData, nextStep);
    } else {
      // Transform form data to match BuyerProfile interface
      const profile: BuyerProfile = {
        id: user?.id || Date.now().toString(),
        name: formData.name,
        industry: formData.industry,
        investmentRange: {
          min: Number(formData.investmentMin),
          max: Number(formData.investmentMax),
        },
        experience: formData.experience,
        location: formData.location,
        timeline: formData.timeline,
        fundingSource: formData.fundingSource,
        bio: formData.bio,
        interestedIndustries: [formData.industry],
        preferredBusinessSize: formData.preferredBusinessSize,
      };

      // Clear saved progress
      localStorage.removeItem("bizMatch_buyerOnboarding");

      console.log("Completing buyer onboarding with:", profile);
      onComplete(profile);
    }
  }, [currentStep, formData, onComplete, user, saveProgress]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const currentStepData = buyerOnboardingSteps[currentStep];
  const progress = ((currentStep + 1) / buyerOnboardingSteps.length) * 100;

  const renderField = (field: any) => {
    const value = formData[field.name] || "";
    const error = errors[field.name];

    // Special handling for investment range
    if (field.name === "investmentMin" || field.name === "investmentMax") {
      return (
        <Input
          key={field.name}
          type="number"
          label={field.label}
          value={value}
          onChange={(e) =>
            handleInputChange(field.name, Number(e.target.value))
          }
          placeholder={field.placeholder}
          required={field.required}
          error={error}
        />
      );
    }

    switch (field.type) {
      case "select":
        return (
          <div key={field.name}>
            <Label>
              {field.label} {field.required && "*"}
            </Label>
            <Select
              value={value}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              hasError={!!error}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((option: string) => (
                <option key={option} value={option}>
                  {option
                    .replace("-", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </option>
              ))}
            </Select>
            {error && <ErrorText>{error}</ErrorText>}
          </div>
        );
      case "textarea":
        return (
          <div key={field.name}>
            <Label>
              {field.label} {field.required && "*"}
            </Label>
            <TextArea
              value={value}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              hasError={!!error}
            />
            {error && <ErrorText>{error}</ErrorText>}
          </div>
        );
      default:
        return (
          <Input
            key={field.name}
            type={field.type}
            label={field.label}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            error={error}
          />
        );
    }
  };

  return (
    <OnboardingLayout gradientColors={["#4facfe", "#00f2fe"]}>
      <ProgressBar>
        <ProgressFill progress={progress} />
      </ProgressBar>

      <StepHeader>
        <h2>{currentStepData.title}</h2>
        <p>{currentStepData.description}</p>
      </StepHeader>

      <FormGrid>{currentStepData.fields.map(renderField)}</FormGrid>

      <ButtonGroup>
        {currentStep > 0 && (
          <Button variant="ghost" onClick={handleBack}>
            Back
          </Button>
        )}
        <Button onClick={handleNext} fullWidth={currentStep === 0}>
          {currentStep === buyerOnboardingSteps.length - 1
            ? "Complete Profile"
            : "Continue"}
        </Button>
      </ButtonGroup>
    </OnboardingLayout>
  );
};
