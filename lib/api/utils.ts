// Utility functions for API operations

// Debounce function for search queries
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

// Format API errors for display
export const formatApiError = (error: any): string => {
  if (typeof error === "string") return error
  if (error?.message) return error.message
  if (error?.error) return error.error
  return "An unexpected error occurred"
}

// Build query string from object
export const buildQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(key, String(item)))
      } else {
        searchParams.append(key, String(value))
      }
    }
  })

  return searchParams.toString()
}

// Cache key generators
export const generateCacheKey = (prefix: string, params: any): string[] => {
  const key = [prefix]

  if (params) {
    if (typeof params === "object") {
      key.push(JSON.stringify(params))
    } else {
      key.push(String(params))
    }
  }

  return key
}

// Optimistic update helpers
export const optimisticUpdate = <T>(
  queryClient: any,
  queryKey: any[],
  updater: (old: T) => T
) => {
  queryClient.setQueryData(queryKey, updater)
}

// Invalidate related queries
export const invalidateRelatedQueries = (
  queryClient: any,
  patterns: string[][]
) => {
  patterns.forEach(pattern => {
    queryClient.invalidateQueries({ queryKey: pattern })
  })
}

// Retry configuration
export const retryConfig = {\
  retry: (failureCount: number, error: any) => {
    // Don't retry on client errors (4xx)\
    if (error?.status >= 400 && error?.status < 500) {\
      return false
    }
    // Retry up to 3 times for server errors\
    return failureCount < 3
  },
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
}

// Pagination helpers
export const getNextPageParam = (lastPage: any) => {\
  if (!lastPage?.pagination) return undefined
  const { page, totalPages } = lastPage.pagination\
  return page < totalPages ? page + 1 : undefined
}

export const getPreviousPageParam = (firstPage: any) => {\
  if (!firstPage?.pagination) return undefined
  const { page } = firstPage.pagination
  return page > 1 ? page - 1 : undefined
}

// Data transformation utilities
export const transformStaffData = (staff: any) => ({
  ...staff,\
  fullName: staff.name,
  skillsArray: Array.isArray(staff.skills) ? staff.skills : [],
  ratingDisplay: staff.rating ? staff.rating.toFixed(1) : 'N/A',
  experienceDisplay: `${staff.experience || 0} years`,
})

export const transformJobData = (job: any) => ({
  ...job,\
  skillsArray: Array.isArray(job.skills) ? job.skills : [],
  budgetDisplay: job.budget || 'Not specified',
  postedDate: new Date(job.postedAt).toLocaleDateString(),
})

// File upload utilities
export const uploadFile = async (
  file: File,
  endpoint: string,
  onProgress?: (progress: number) => void
): Promise<any> => {\
  return new Promise((resolve, reject) => {\
    const formData = new FormData()
    formData.append('file', file)
    
    const xhr = new XMLHttpRequest()
    
    xhr.upload.addEventListener('progress', (event) => {\
      if (event.lengthComputable && onProgress) {\
        const progress = (event.loaded / event.total) * 100
        onProgress(progress)
      }
    })
    
    xhr.addEventListener('load', () => {\
      if (xhr.status >= 200 && xhr.status < 300) {\
        resolve(JSON.parse(xhr.responseText))
      } else {
        reject(new Error(`Upload failed: ${xhr.statusText}`))
      }
    })
    
    xhr.addEventListener('error', () => {
      reject(new Error('Upload failed'))
    })
    
    xhr.open('POST', endpoint)
    xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('auth_token')}`)
    xhr.send(formData)
  })
}

// Local storage utilities
export const storage = {\
  get: (key: string) => {\
    if (typeof window === 'undefined') return null
    try {\
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {\
      return null
    }
  },
  
  set: (key: string, value: any) => {\
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  },
  
  remove: (key: string) => {\
    if (typeof window === 'undefined') return
    localStorage.removeItem(key)
  },
  
  clear: () => {\
    if (typeof window === 'undefined') return
    localStorage.clear()
  },
}

// Date utilities
export const formatDate = (date: string | Date): string => {\
  return new Date(date).toLocaleDateString()
}

export const formatDateTime = (date: string | Date): string => {\
  return new Date(date).toLocaleString()
}

export const timeAgo = (date: string | Date): string => {\
  const now = new Date()
  const past = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)
  \
  if (diffInSeconds < 60) return 'Just now'\
  if (diffInSeconds < 3600) return \`${Math.floor(diffInSeconds / 60)}m ago`\
  if (diffInSeconds < 86400) return \`${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`
  
  return formatDate(date)
}
