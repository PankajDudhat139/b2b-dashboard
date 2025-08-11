import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { DocumentAnalysis } from '../../types';
import { Button } from '../common/Button';
import { theme } from '../../styles/theme';

const AnalyzerContainer = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};
  margin-top: ${theme.spacing.lg};
`;

const AnalyzerHeader = styled.h3`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.xl};
  font-weight: 600;
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  
  &:before {
    content: "🤖";
    margin-right: ${theme.spacing.sm};
    font-size: ${theme.fontSizes['2xl']};
  }
`;

const UploadZone = styled.div`
  border: 2px dashed ${theme.colors.primary};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing['2xl']};
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${theme.colors.gray100};
  
  &:hover {
    background: #f8f9ff;
    border-color: ${theme.colors.primaryLight};
  }
`;

const UploadIcon = styled.div`
  font-size: 48px;
  margin-bottom: ${theme.spacing.md};
`;

const UploadTitle = styled.h4`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.lg};
  margin-bottom: ${theme.spacing.sm};
`;

const UploadDescription = styled.p`
  color: ${theme.colors.gray500};
  font-size: ${theme.fontSizes.sm};
  margin-bottom: ${theme.spacing.md};
`;

const FileList = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const FileItem = styled.div`
  background: ${theme.colors.gray100};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${theme.fontSizes.sm};
`;

const FileName = styled.span`
  color: ${theme.colors.gray700};
`;

const FileSize = styled.span`
  color: ${theme.colors.gray500};
  font-size: ${theme.fontSizes.xs};
`;

const AnalyzingState = styled.div`
  text-align: center;
  padding: ${theme.spacing.lg};
  color: ${theme.colors.primary};
`;

const AnalyzingIcon = styled.div`
  font-size: 24px;
  margin-bottom: ${theme.spacing.sm};
  animation: spin 2s linear infinite;
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const ResultsContainer = styled.div`
  background: ${theme.colors.gray100};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin-top: ${theme.spacing.lg};
`;

const ResultsHeader = styled.h4`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
  font-size: ${theme.fontSizes.lg};
  display: flex;
  align-items: center;
  
  &:before {
    content: "✨";
    margin-right: ${theme.spacing.sm};
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const MetricItem = styled.div`
  background: white;
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  text-align: center;
`;

const MetricLabel = styled.div`
  color: ${theme.colors.gray500};
  font-size: ${theme.fontSizes.sm};
  margin-bottom: ${theme.spacing.xs};
`;

const MetricValue = styled.div`
  color: ${theme.colors.gray700};
  font-weight: 600;
  font-size: ${theme.fontSizes.base};
  
  &.positive {
    color: ${theme.colors.secondary};
  }
  
  &.negative {
    color: ${theme.colors.danger};
  }
`;

const InsightsSection = styled.div`
  margin-top: ${theme.spacing.lg};
`;

const InsightsTitle = styled.h5`
  color: ${theme.colors.gray700};
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.base};
`;

const InsightsList = styled.ul`
  padding-left: ${theme.spacing.lg};
`;

const InsightItem = styled.li`
  color: ${theme.colors.gray600};
  margin-bottom: ${theme.spacing.xs};
  font-size: ${theme.fontSizes.sm};
`;

interface DocumentAnalyzerProps {
  onAnalysisComplete?: (results: DocumentAnalysis) => void;
}

export const DocumentAnalyzer: React.FC<DocumentAnalyzerProps> = ({ 
  onAnalysisComplete 
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<DocumentAnalysis | null>(null);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleAnalyze = useCallback(() => {
    if (uploadedFiles.length === 0) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const results: DocumentAnalysis = {
        revenue: "$2.4M annually",
        profitMargin: "18%",
        riskScore: "Low",
        revenueGrowth: "+15% YoY",
        keyInsights: [
          "Strong revenue growth trend over the past 3 years",
          "Healthy cash flow position with consistent profitability",
          "Minor inventory management concerns identified",
          "Customer base shows good diversity and retention",
          "Debt-to-equity ratio is within acceptable ranges"
        ]
      };
      
      setAnalysisResults(results);
      setIsAnalyzing(false);
      onAnalysisComplete?.(results);
    }, 3000);
  }, [uploadedFiles, onAnalysisComplete]);

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <AnalyzerContainer>
      <AnalyzerHeader>AI Document Analyzer</AnalyzerHeader>
      
      <UploadZone>
        <UploadIcon>📄</UploadIcon>
        <UploadTitle>Upload Financial Documents</UploadTitle>
        <UploadDescription>
          Drop files here or click to browse • PDF, Excel, CSV supported
        </UploadDescription>
        <label htmlFor="document-upload">
          <Button>
            Choose Files
          </Button>
        </label>
        <input
          id="document-upload"
          type="file"
          multiple
          accept=".pdf,.xlsx,.xls,.csv,.doc,.docx"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
      </UploadZone>

      {uploadedFiles.length > 0 && (
        <FileList>
          <h4 style={{ 
            marginBottom: theme.spacing.sm, 
            color: theme.colors.gray600,
            fontSize: theme.fontSizes.base 
          }}>
            Uploaded Files ({uploadedFiles.length}):
          </h4>
          {uploadedFiles.map((file, index) => (
            <FileItem key={index}>
              <FileName>{file.name}</FileName>
              <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
                <FileSize>{formatFileSize(file.size)}</FileSize>
                <button
                  onClick={() => removeFile(index)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: theme.colors.danger,
                    cursor: 'pointer',
                    padding: theme.spacing.xs
                  }}
                >
                  ✕
                </button>
              </div>
            </FileItem>
          ))}
          
          {!isAnalyzing && !analysisResults && (
            <div style={{ marginTop: theme.spacing.md }}>
              <Button onClick={handleAnalyze}>
                Analyze Documents with AI
              </Button>
            </div>
          )}
        </FileList>
      )}

      {isAnalyzing && (
        <AnalyzingState>
          <AnalyzingIcon>🔄</AnalyzingIcon>
          <p>Analyzing documents with AI...</p>
          <p style={{ fontSize: theme.fontSizes.sm, marginTop: theme.spacing.sm }}>
            This may take a few moments
          </p>
        </AnalyzingState>
      )}

      {analysisResults && !isAnalyzing && (
        <ResultsContainer>
          <ResultsHeader>AI Analysis Results</ResultsHeader>
          
          <MetricsGrid>
            <MetricItem>
              <MetricLabel>Annual Revenue</MetricLabel>
              <MetricValue className="positive">{analysisResults.revenue}</MetricValue>
            </MetricItem>
            <MetricItem>
              <MetricLabel>Profit Margin</MetricLabel>
              <MetricValue className="positive">{analysisResults.profitMargin}</MetricValue>
            </MetricItem>
            <MetricItem>
              <MetricLabel>Revenue Growth</MetricLabel>
              <MetricValue className="positive">{analysisResults.revenueGrowth}</MetricValue>
            </MetricItem>
            <MetricItem>
              <MetricLabel>Risk Score</MetricLabel>
              <MetricValue className="positive">{analysisResults.riskScore}</MetricValue>
            </MetricItem>
          </MetricsGrid>
          
          <InsightsSection>
            <InsightsTitle>Key Insights:</InsightsTitle>
            <InsightsList>
              {analysisResults.keyInsights.map((insight, index) => (
                <InsightItem key={index}>{insight}</InsightItem>
              ))}
            </InsightsList>
          </InsightsSection>
        </ResultsContainer>
      )}
    </AnalyzerContainer>
  );
};
