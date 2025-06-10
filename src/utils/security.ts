
/**
 * Sanitizes user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

/**
 * Validates if an input contains potentially harmful content
 */
export const validateInput = (input: string): boolean => {
  // Check for common XSS patterns
  const dangerousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+=/gi,
    /data:/gi
  ];
  
  return !dangerousPatterns.some(pattern => pattern.test(input));
};

/**
 * Checks if user has permission for a specific action
 */
export const hasPermission = (userRole: string | undefined, requiredRole: string): boolean => {
  if (!userRole) return false;
  
  const roleHierarchy = {
    'admin': 4,
    'manager': 3,
    'counsellor': 2,
    'agent': 1
  };
  
  type RoleKey = keyof typeof roleHierarchy;
  
  // If the role doesn't exist in our hierarchy, deny access
  if (!(userRole as RoleKey in roleHierarchy) || !(requiredRole as RoleKey in roleHierarchy)) {
    return false;
  }
  
  return roleHierarchy[userRole as RoleKey] >= roleHierarchy[requiredRole as RoleKey];
};
