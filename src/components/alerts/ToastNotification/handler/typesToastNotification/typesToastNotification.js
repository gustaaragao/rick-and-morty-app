import { Check, Ban, TriangleAlert } from 'lucide'

export const typesToastNotification = {
  success: {
    icon: Check,
    color: 'green-600',
    defaultMessage: 'Default success message!',
  },
  error: {
    icon: Ban,
    color: 'red-600',
    defaultMessage: 'Default error message!',
  },
  warning: {
    icon: TriangleAlert,
    color: 'yellow-500',
    defaultMessage: 'Default warning message!',
  }
}
