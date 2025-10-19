export interface Insight {
  id: string;
  title: string;
  description: string;
  category: 'data_quality' | 'revenue' | 'compliance' | 'performance' | 'anomaly';
  priority: 'high' | 'medium' | 'low';
}

export interface InsightData {
  billingData: any[];
  doctorRosterData: any[];
}

export function generateInsights(data: InsightData): Insight[] {
  const { billingData, doctorRosterData } = data;
  const insights: Insight[] = [];

  if (!billingData || billingData.length === 0) {
    return insights;
  }

  // Helper function to get field value with flexible mapping
  const getFieldValue = (row: any, possibleNames: string[], fallback?: any): any => {
    for (const name of possibleNames) {
      if (row[name] !== undefined && row[name] !== null && row[name] !== '') {
        return row[name];
      }
    }
    return fallback;
  };

  const parseAmount = (value: any): number => {
    if (value === undefined || value === null || value === '') return 0;
    if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
    const str = String(value).replace(/[,\s]/g, '').replace(/[^0-9.-]/g, '');
    const n = parseFloat(str);
    return Number.isFinite(n) ? n : 0;
  };

  // Data Quality Insights
  const totalRecords = billingData.length;
  const totalRevenue = billingData.reduce((sum, row) => 
    sum + parseAmount(getFieldValue(row, ['Amount', 'Total_Amount', 'TotalAmount', 'Amount_Billed', 'Bill_Amount', 'Gross_Amount'])), 0);
  const averageAmount = totalRevenue / totalRecords;

  insights.push({
    id: 'data_volume',
    title: 'Data Volume Analysis',
    description: `Successfully processed ${totalRecords} billing records with total revenue of ₹${totalRevenue.toLocaleString()}`,
    category: 'data_quality',
    priority: 'high'
  });

  // Revenue Insights
  const revenueByPayer = billingData.reduce((acc, row) => {
    const payer = getFieldValue(row, ['Payer_Type', 'Payer', 'PayerType'], 'Unknown');
    const amount = parseAmount(getFieldValue(row, ['Amount', 'Total_Amount', 'TotalAmount', 'Amount_Billed', 'Bill_Amount', 'Gross_Amount']));
    acc[payer] = (acc[payer] || 0) + amount;
    return acc;
  }, {} as Record<string, number>);

  const topPayer = Object.entries(revenueByPayer).sort((a, b) => b[1] - a[1])[0];
  if (topPayer) {
    insights.push({
      id: 'top_payer',
      title: 'Top Revenue Source',
      description: `${topPayer[0]} generates the highest revenue at ₹${topPayer[1].toLocaleString()} (${((topPayer[1] / totalRevenue) * 100).toFixed(1)}% of total)`,
      category: 'revenue',
      priority: 'high'
    });
  }

  // Doctor Performance Insights
  const doctorStats = billingData.reduce((acc, row) => {
    const doctorId = getFieldValue(row, ['Doctor_ID', 'doctor_id', 'DoctorId', 'ID', 'id']);
    const doctorName = getFieldValue(row, ['Doctor_Name', 'doctor_name', 'DoctorName', 'Name', 'name'], `Doctor ${doctorId}`);
    const amount = parseAmount(getFieldValue(row, ['Amount', 'Total_Amount', 'TotalAmount', 'Amount_Billed', 'Bill_Amount', 'Gross_Amount']));
    const patientId = getFieldValue(row, ['Patient_ID', 'patient_id', 'PatientId']);
    
    if (doctorId) {
      if (!acc[doctorId]) {
        acc[doctorId] = { 
          doctorName, 
          revenue: 0, 
          patients: new Set(), 
          visits: 0 
        };
      }
      acc[doctorId].revenue += amount;
      acc[doctorId].visits += 1;
      if (patientId) acc[doctorId].patients.add(patientId);
    }
    return acc;
  }, {} as Record<string, { doctorName: string; revenue: number; patients: Set<string>; visits: number }>);

  const topDoctor = Object.entries(doctorStats).sort((a, b) => b[1].revenue - a[1].revenue)[0];
  if (topDoctor) {
    insights.push({
      id: 'top_doctor',
      title: 'Top Performing Doctor',
      description: `${topDoctor[1].doctorName} leads with ₹${topDoctor[1].revenue.toLocaleString()} revenue from ${topDoctor[1].visits} visits`,
      category: 'performance',
      priority: 'high'
    });
  }

  // Procedure Analysis
  const procedureStats = billingData.reduce((acc, row) => {
    const procedure = getFieldValue(row, ['Procedure_Code', 'Service_Code', 'Procedure', 'Proc_Code'], 'Unknown');
    const amount = parseAmount(getFieldValue(row, ['Amount', 'Total_Amount', 'TotalAmount', 'Amount_Billed', 'Bill_Amount', 'Gross_Amount']));
    if (!acc[procedure]) acc[procedure] = { revenue: 0, count: 0 };
    acc[procedure].revenue += amount;
    acc[procedure].count += 1;
    return acc;
  }, {} as Record<string, { revenue: number; count: number }>);

  const topProcedure = Object.entries(procedureStats).sort((a, b) => b[1].revenue - a[1].revenue)[0];
  if (topProcedure) {
    insights.push({
      id: 'top_procedure',
      title: 'Most Profitable Procedure',
      description: `${topProcedure[0]} generates ₹${topProcedure[1].revenue.toLocaleString()} from ${topProcedure[1].count} procedures`,
      category: 'revenue',
      priority: 'medium'
    });
  }

  // Age Distribution Analysis
  const ageGroups = { '0-18': 0, '19-35': 0, '36-50': 0, '51-65': 0, '65+': 0 };
  billingData.forEach(row => {
    const age = Number(getFieldValue(row, ['Age', 'age', 'Patient_Age', 'patient_age']));
    if (Number.isFinite(age)) {
      if (age <= 18) ageGroups['0-18']++;
      else if (age <= 35) ageGroups['19-35']++;
      else if (age <= 50) ageGroups['36-50']++;
      else if (age <= 65) ageGroups['51-65']++;
      else ageGroups['65+']++;
    }
  });

  const dominantAgeGroup = Object.entries(ageGroups).sort((a, b) => b[1] - a[1])[0];
  if (dominantAgeGroup && dominantAgeGroup[1] > 0) {
    insights.push({
      id: 'age_distribution',
      title: 'Patient Demographics',
      description: `${dominantAgeGroup[0]} age group represents the largest patient segment with ${dominantAgeGroup[1]} patients`,
      category: 'data_quality',
      priority: 'medium'
    });
  }

  // Payment Status Analysis
  const paymentStatus = billingData.reduce((acc, row) => {
    const status = getFieldValue(row, ['Payment_Status', 'PaymentStatus', 'Status', 'Payment_Status_Desc'], 'Unknown');
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const paidBills = paymentStatus.Paid || 0;
  const pendingBills = paymentStatus.Pending || paymentStatus.Outstanding || 0;
  const paymentRate = totalRecords > 0 ? (paidBills / totalRecords) * 100 : 0;

  if (paymentRate > 0) {
    insights.push({
      id: 'payment_rate',
      title: 'Payment Performance',
      description: `${paymentRate.toFixed(1)}% payment completion rate with ${paidBills} paid and ${pendingBills} pending bills`,
      category: 'performance',
      priority: 'high'
    });
  }

  // Consent Analysis
  const consentData = billingData.filter(row => 
    getFieldValue(row, ['Consent_Flag', 'consent_flag', 'Consent', 'consent']) !== undefined
  );
  const consentYes = consentData.filter(row => 
    getFieldValue(row, ['Consent_Flag', 'consent_flag', 'Consent', 'consent']) === 'Y'
  ).length;
  const consentRate = consentData.length > 0 ? (consentYes / consentData.length) * 100 : 0;

  if (consentRate > 0) {
    insights.push({
      id: 'consent_rate',
      title: 'Consent Compliance',
      description: `${consentRate.toFixed(1)}% consent rate with ${consentYes} out of ${consentData.length} records having consent`,
      category: 'compliance',
      priority: 'high'
    });
  }

  // Data Quality Checks
  const missingPatientNames = billingData.filter(row => 
    !getFieldValue(row, ['Patient_Name', 'patient_name', 'PatientName', 'Name', 'name'])
  ).length;

  if (missingPatientNames > 0) {
    insights.push({
      id: 'data_quality',
      title: 'Data Quality Alert',
      description: `${missingPatientNames} records are missing patient names, affecting data completeness`,
      category: 'data_quality',
      priority: 'medium'
    });
  }

  // Revenue Trends
  const dateRange = billingData
    .map(row => getFieldValue(row, ['Bill_Date', 'Visit_Date', 'Date', 'Transaction_Date']))
    .map(v => new Date(String(v)))
    .filter(date => !isNaN(date.getTime()));

  if (dateRange.length > 0) {
    const minDate = new Date(Math.min(...dateRange.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...dateRange.map(d => d.getTime())));
    const daysDiff = Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
    
    insights.push({
      id: 'date_range',
      title: 'Data Coverage',
      description: `Data spans ${daysDiff} days from ${minDate.toLocaleDateString()} to ${maxDate.toLocaleDateString()}`,
      category: 'data_quality',
      priority: 'low'
    });
  }

  // Doctor Roster Integration
  if (doctorRosterData && doctorRosterData.length > 0) {
    const activeDoctors = new Set(billingData.map(row => 
      getFieldValue(row, ['Doctor_ID', 'doctor_id', 'DoctorId', 'ID', 'id'])
    )).size;
    const totalDoctors = doctorRosterData.length;
    const utilizationRate = totalDoctors > 0 ? (activeDoctors / totalDoctors) * 100 : 0;

    insights.push({
      id: 'doctor_utilization',
      title: 'Doctor Utilization',
      description: `${activeDoctors} out of ${totalDoctors} doctors are active (${utilizationRate.toFixed(1)}% utilization rate)`,
      category: 'performance',
      priority: 'medium'
    });
  }

  // Sort insights by priority and importance
  const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
  const categoryOrder = { 'revenue': 4, 'performance': 3, 'compliance': 2, 'data_quality': 1, 'anomaly': 0 };
  
  return insights.sort((a, b) => {
    // First sort by priority
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    if (priorityDiff !== 0) return priorityDiff;
    
    // Then sort by category importance
    return categoryOrder[b.category] - categoryOrder[a.category];
  });
}
