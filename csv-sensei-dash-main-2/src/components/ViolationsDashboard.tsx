import React, { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronRight, Shield, FileText, User, Calendar, DollarSign, CheckCircle, XCircle, Clock, TrendingUp, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Progress } from '@/components/ui/progress';

interface Violation {
  dataset: 'op_billing' | 'doctor_roster';
  row: number;
  rule: `R${1|2|3|4|5|6|7|8|9|10}`;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  reason: string;
}

interface ViolationsDashboardProps {
  violations: Violation[];
  riskScore: number;
}

const RULE_DESCRIPTIONS = {
  R1: 'Patient_ID must exist and be unique per Visit_ID',
  R2: 'Age must be between 0 and 120',
  R3: 'Visit_Date cannot be in the future',
  R4: 'Doctor_ID must exist in doctor roster',
  R5: 'Doctor\'s License_Expiry must be ≥ Visit_Date',
  R6: 'Procedure_Code must be OP100/OP200/OP300',
  R7: 'Amount must be >0 and ≤100000',
  R8: 'If Procedure_Code=OP300 → Consent_Flag must be Y',
  R9: 'Doctor\'s specialty must match procedure mapping',
  R10: 'Payer_Type must be CASH, INSURANCE, or GOVT'
};

const SEVERITY_COLORS = {
  HIGH: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
  MEDIUM: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800',
  LOW: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800'
};

const SEVERITY_ICONS = {
  HIGH: <XCircle className="w-4 h-4 text-red-600" />,
  MEDIUM: <Clock className="w-4 h-4 text-yellow-600" />,
  LOW: <CheckCircle className="w-4 h-4 text-blue-600" />
};

export const ViolationsDashboard: React.FC<ViolationsDashboardProps> = ({ violations, riskScore }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedRule, setSelectedRule] = useState<string | null>(null);

  // Group violations by rule
  const violationsByRule = violations.reduce((acc, violation) => {
    if (!acc[violation.rule]) {
      acc[violation.rule] = [];
    }
    acc[violation.rule].push(violation);
    return acc;
  }, {} as Record<string, Violation[]>);

  // Get top 3 violations for summary
  const topViolations = Object.entries(violationsByRule)
    .sort(([,a], [,b]) => b.length - a.length)
    .slice(0, 3);

  const getSeverityColor = (severity: Violation['severity']) => {
    return SEVERITY_COLORS[severity];
  };

  const getSeverityIcon = (severity: Violation['severity']) => {
    return SEVERITY_ICONS[severity];
  };

  const getRiskLevel = (score: number) => {
    if (score >= 20) return { level: 'Critical', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' };
    if (score >= 10) return { level: 'High', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' };
    if (score >= 5) return { level: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-900/20' };
    return { level: 'Low', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' };
  };

  const riskLevel = getRiskLevel(riskScore);

  if (violations.length === 0) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800 mb-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">
              No Compliance Violations
            </h3>
            <p className="text-green-600 dark:text-green-400">
              All data passes compliance checks successfully
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      {/* Unified Compliance Risk Assessment Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-orange-500" />
          Real-time Compliance Alerts
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Overall Risk Level Card */}
          <Card className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-lg text-orange-800 dark:text-orange-300">
                    Overall Risk Level
                  </CardTitle>
                  <CardDescription className="text-orange-600 dark:text-orange-400">
                    Current compliance risk assessment
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${riskLevel.color}`}>
                  {riskLevel.level}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Risk Score: {riskScore}
                </div>
                <Progress 
                  value={(riskScore / 30) * 100} 
                  className="h-2 mb-3"
                />
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {riskScore >= 20 ? 'Critical: Immediate action required' :
                   riskScore >= 10 ? 'High: Additional controls needed' :
                   riskScore >= 5 ? 'Medium: Monitor closely' :
                   'Low: All systems normal'}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Violation Breakdown Card */}
          <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-lg text-red-800 dark:text-red-300">
                    Violation Breakdown
                  </CardTitle>
                  <CardDescription className="text-red-600 dark:text-red-400">
                    Distribution of compliance violations
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(violationsByRule).slice(0, 3).map(([rule, ruleViolations]) => {
                  const severity = ruleViolations[0].severity;
                  const percentage = ((ruleViolations.length / violations.length) * 100).toFixed(1);
                  
                  return (
                    <div key={rule} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getSeverityIcon(severity)}
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {severity}: {ruleViolations.length} violations
                        </span>
                      </div>
                      <span className={`text-sm font-medium ${
                        severity === 'HIGH' ? 'text-red-600' :
                        severity === 'MEDIUM' ? 'text-yellow-600' :
                        'text-blue-600'
                      }`}>
                        {percentage}%
                      </span>
                    </div>
                  );
                })}
                {Object.keys(violationsByRule).length === 0 && (
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    No violations detected
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Compliance Score Card */}
          <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg text-green-800 dark:text-green-300">
                    Compliance Score
                  </CardTitle>
                  <CardDescription className="text-green-600 dark:text-green-400">
                    Overall data quality and compliance rating
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {Math.max(0, 100 - (riskScore * 2))}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Data Quality Score
                </div>
                <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Clean Records:</span>
                    <span>{Math.max(0, 20 - violations.length)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Records:</span>
                    <span>20</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Violations Section */}
      <Card className="border-orange-200 dark:border-orange-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900 dark:text-white">
                  Detailed Violations
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  {violations.length} violations found across {Object.keys(violationsByRule).length} rules
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full ${riskLevel.bg} border`}>
                <span className={`text-sm font-medium ${riskLevel.color}`}>
                  Risk Score: {riskScore} ({riskLevel.level})
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center space-x-2"
              >
                {isExpanded ? (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    <span>Hide Details</span>
                  </>
                ) : (
                  <>
                    <ChevronRight className="w-4 h-4" />
                    <span>View All ({violations.length})</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Summary of top 3 violations */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Top Violations
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topViolations.map(([rule, ruleViolations]) => (
                <div key={rule} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="font-mono text-xs">
                      {rule}
                    </Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {ruleViolations.length} violations
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {RULE_DESCRIPTIONS[rule as keyof typeof RULE_DESCRIPTIONS]}
                  </p>
                  <div className="flex items-center space-x-2">
                    {getSeverityIcon(ruleViolations[0].severity)}
                    <span className={`text-xs font-medium ${getSeverityColor(ruleViolations[0].severity).split(' ')[1]}`}>
                      {ruleViolations[0].severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed violations */}
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleContent>
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Detailed Violations
                </h4>
                
                {Object.entries(violationsByRule).map(([rule, ruleViolations]) => (
                  <Card key={rule} className="border-l-4 border-l-orange-400">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline" className="font-mono">
                            {rule}
                          </Badge>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {ruleViolations.length} violations
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedRule(selectedRule === rule ? null : rule)}
                          className="flex items-center space-x-1"
                        >
                          {selectedRule === rule ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                          <span>Details</span>
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {RULE_DESCRIPTIONS[rule as keyof typeof RULE_DESCRIPTIONS]}
                      </p>
                    </CardHeader>
                    
                    {selectedRule === rule && (
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          {ruleViolations.map((violation, index) => (
                            <div key={index} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                      Row {violation.row}
                                    </span>
                                    <Badge 
                                      variant="outline" 
                                      className={`text-xs ${getSeverityColor(violation.severity)}`}
                                    >
                                      {violation.severity}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {violation.reason}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2 ml-4">
                                  {getSeverityIcon(violation.severity)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </div>
  );
};
