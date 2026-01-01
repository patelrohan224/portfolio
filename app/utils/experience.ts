// Helper function to calculate experience duration from period string
export function calculateExperienceDuration(period: string): string {
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const parseDate = (dateStr: string): { month: number; year: number } => {
    const parts = dateStr.trim().split(' ');
    const month = monthNames.indexOf(parts[0]);
    const year = parseInt(parts[1]);
    return { month, year };
  };

  const [startStr, endStr] = period.split(' – ');
  const start = parseDate(startStr);
  const end = endStr === 'Present' 
    ? { month: new Date().getMonth(), year: new Date().getFullYear() }
    : parseDate(endStr);

  // Calculate total months difference
  let months = (end.year - start.year) * 12 + (end.month - start.month);
  
  // Add 1 to include both start and end months (inclusive)
  // e.g., Jan 2022 to Feb 2022 = 2 months (Jan + Feb)
  months += 1;
  
  // Ensure minimum of 1 month for any valid period
  if (months < 1) months = 1;
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return remainingMonths === 1 ? '1 month' : `${remainingMonths} months`;
  } else if (remainingMonths === 0) {
    return years === 1 ? '1 year' : `${years} years`;
  } else {
    const yearStr = years === 1 ? '1 year' : `${years} years`;
    const monthStr = remainingMonths === 1 ? '1 month' : `${remainingMonths} months`;
    return `${yearStr} ${monthStr}`;
  }
}

