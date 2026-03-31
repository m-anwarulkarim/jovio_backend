অবশ্যই — নিচে তোমার **final route + request + response** একদম cleanভাবে দিলাম, **তোমার latest updated route structure অনুযায়ী**।

**Base URL**

```bash
/api/v1
```

---

# 1) Auth Routes

## `POST /api/v1/auth/register`

**Request body**

```json
{
  "name": "Anwarul Karim",
  "email": "anwarul@example.com",
  "password": "12345678",
  "image": "https://example.com/avatar.png"
}
```

**Response**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {}
  }
}
```

---

## `POST /api/v1/auth/login`

**Request body**

```json
{
  "email": "anwarul@example.com",
  "password": "12345678",
  "rememberMe": true
}
```

**Response**

```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "user": {}
  }
}
```

---

## `POST /api/v1/auth/logout`

**Request**
কিছু লাগবে না, শুধু logged in session লাগবে

**Response**

```json
{
  "success": true,
  "message": "User logged out successfully",
  "data": {}
}
```

---

## `GET /api/v1/auth/me`

**Request**
কিছু লাগবে না, শুধু logged in session লাগবে

**Response**

```json
{
  "success": true,
  "message": "User session retrieved successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "Anwarul Karim",
      "email": "anwarul@example.com",
      "role": "COMPANY_OWNER"
    }
  }
}
```

---

## `POST /api/v1/auth/change-password`

**Request body**

```json
{
  "currentPassword": "12345678",
  "newPassword": "87654321"
}
```

**Response**

```json
{
  "success": true,
  "message": "Password changed successfully",
  "data": {}
}
```

---

## `GET /api/v1/auth/all`

**Access:** `ADMIN`

**Query**

```http
/auth/all?page=1&limit=10&searchTerm=anwar&role=EMPLOYEE
```

**Response**

```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1
  },
  "data": [
    {
      "id": "user_id",
      "name": "Rahim",
      "email": "rahim@example.com",
      "phone": "01700000000",
      "role": "EMPLOYEE",
      "avatar": null,
      "bio": null,
      "isActive": true,
      "createdAt": "2026-03-31T00:00:00.000Z",
      "updatedAt": "2026-03-31T00:00:00.000Z",
      "department": {
        "id": "department_id",
        "name": "Development"
      }
    }
  ]
}
```

---

# 2) Company Routes

## `POST /api/v1/companies`

**Request body**

```json
{
  "name": "AB Tech",
  "slug": "ab-tech",
  "description": "Software company",
  "logo": "https://example.com/logo.png",
  "website": "https://abtech.com"
}
```

**Response**

```json
{
  "success": true,
  "message": "Company created successfully",
  "data": {
    "id": "company_id",
    "name": "AB Tech",
    "slug": "ab-tech",
    "description": "Software company",
    "logo": "https://example.com/logo.png",
    "website": "https://abtech.com",
    "isActive": true,
    "isVerified": false,
    "ownerId": "user_id",
    "createdAt": "2026-03-31T00:00:00.000Z",
    "updatedAt": "2026-03-31T00:00:00.000Z"
  }
}
```

---

## `GET /api/v1/companies/my-company`

**Request**
শুধু logged in session

**Response**

```json
{
  "success": true,
  "message": "My company retrieved successfully",
  "data": {
    "id": "company_id",
    "name": "AB Tech",
    "slug": "ab-tech",
    "description": "Software company",
    "logo": "https://example.com/logo.png",
    "website": "https://abtech.com",
    "isActive": true,
    "isVerified": false,
    "owner": {
      "id": "user_id",
      "name": "Anwarul",
      "email": "anwarul@example.com",
      "role": "COMPANY_OWNER"
    },
    "_count": {
      "members": 5,
      "departments": 2,
      "tasks": 10,
      "proposals": 0,
      "orders": 0
    }
  }
}
```

---

## `PATCH /api/v1/companies/my-company`

**Access:** `COMPANY_OWNER`

**Request body**

```json
{
  "name": "AB Tech Ltd",
  "slug": "ab-tech-ltd",
  "description": "Updated description",
  "logo": "https://example.com/new-logo.png",
  "website": "https://abtechltd.com"
}
```

**Response**

```json
{
  "success": true,
  "message": "Company updated successfully",
  "data": {
    "id": "company_id",
    "name": "AB Tech Ltd",
    "slug": "ab-tech-ltd",
    "description": "Updated description",
    "logo": "https://example.com/new-logo.png",
    "website": "https://abtechltd.com",
    "isActive": true,
    "isVerified": false,
    "ownerId": "user_id",
    "createdAt": "2026-03-31T00:00:00.000Z",
    "updatedAt": "2026-03-31T01:00:00.000Z"
  }
}
```

---

## `GET /api/v1/companies`

**Query**

```http
/companies?page=1&limit=10&searchTerm=ab&isVerified=true&isActive=true
```

**Response**

```json
{
  "success": true,
  "message": "Companies retrieved successfully",
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1
  },
  "data": [
    {
      "id": "company_id",
      "name": "AB Tech",
      "slug": "ab-tech",
      "description": "Software company",
      "logo": "https://example.com/logo.png",
      "website": "https://abtech.com",
      "isActive": true,
      "isVerified": true,
      "owner": {
        "id": "user_id",
        "name": "Owner Name",
        "email": "owner@example.com"
      },
      "_count": {
        "members": 10,
        "orders": 0,
        "proposals": 0
      }
    }
  ]
}
```

---

## `GET /api/v1/companies/:slugOrId`

**Example**

```http
/companies/ab-tech
```

**Response**

```json
{
  "success": true,
  "message": "Company retrieved successfully",
  "data": {
    "id": "company_id",
    "name": "AB Tech",
    "slug": "ab-tech",
    "description": "Software company",
    "logo": "https://example.com/logo.png",
    "website": "https://abtech.com",
    "isActive": true,
    "isVerified": true
  }
}
```

---

## `PATCH /api/v1/companies/:companyId/verify`

**Access:** `ADMIN`

**Request body**

```json
{
  "isVerified": true
}
```

**Response**

```json
{
  "success": true,
  "message": "Company verification updated successfully",
  "data": {
    "id": "company_id",
    "isVerified": true
  }
}
```

---

## `PATCH /api/v1/companies/:companyId/status`

**Access:** `ADMIN`

**Request body**

```json
{
  "isActive": false
}
```

**Response**

```json
{
  "success": true,
  "message": "Company status updated successfully",
  "data": {
    "id": "company_id",
    "isActive": false
  }
}
```

---

# 3) Dashboard Route

## `GET /api/v1/dashboard/stats`

**Access:** logged in user

**Request**
কিছু লাগবে না, শুধু session লাগবে

**Response (ADMIN)**

```json
{
  "success": true,
  "message": "Dashboard stats retrieved successfully",
  "data": {
    "scope": "ADMIN",
    "overview": {
      "totalUsers": 20,
      "totalCompanies": 5,
      "activeCompanies": 4,
      "verifiedCompanies": 3,
      "totalEmployees": 10,
      "totalCompanyOwners": 5,
      "totalTasks": 50
    },
    "tasks": {
      "pending": 10,
      "inProgress": 12,
      "review": 5,
      "completed": 20,
      "cancelled": 3,
      "overdue": 2,
      "dueToday": 4,
      "urgent": 6,
      "highPriority": 9
    },
    "recentCompanies": [],
    "recentTasks": []
  }
}
```

**Response (COMPANY_OWNER)**

```json
{
  "success": true,
  "message": "Dashboard stats retrieved successfully",
  "data": {
    "scope": "COMPANY_OWNER",
    "company": {
      "id": "company_id",
      "name": "AB Tech",
      "slug": "ab-tech",
      "isActive": true,
      "isVerified": false
    },
    "overview": {
      "totalEmployees": 8,
      "activeEmployees": 7,
      "inactiveEmployees": 1,
      "totalDepartments": 3,
      "totalTasks": 18
    },
    "tasks": {
      "pending": 4,
      "inProgress": 5,
      "onHold": 2,
      "review": 1,
      "completed": 5,
      "cancelled": 1,
      "overdue": 2,
      "dueToday": 3,
      "urgent": 2,
      "highPriority": 4
    },
    "recentEmployees": [],
    "recentTasks": []
  }
}
```

**Response (EMPLOYEE)**

```json
{
  "success": true,
  "message": "Dashboard stats retrieved successfully",
  "data": {
    "scope": "EMPLOYEE",
    "overview": {
      "totalTasks": 10,
      "pendingTasks": 2,
      "inProgressTasks": 3,
      "onHoldTasks": 1,
      "reviewTasks": 1,
      "completedTasks": 2,
      "cancelledTasks": 1,
      "overdueTasks": 1,
      "dueTodayTasks": 2,
      "urgentTasks": 1,
      "highPriorityTasks": 2
    },
    "recentTasks": []
  }
}
```

---

# 4) Employee Routes

## `POST /api/v1/employees`

**Access:** `COMPANY_OWNER`

**Request body**

```json
{
  "name": "Rahim Uddin",
  "email": "rahim@example.com",
  "password": "12345678",
  "phone": "01700000000",
  "bio": "Frontend developer",
  "image": "https://example.com/rahim.png",
  "departmentId": "department_id"
}
```

**Response**

```json
{
  "success": true,
  "message": "Employee created successfully",
  "data": {
    "id": "employee_id",
    "name": "Rahim Uddin",
    "email": "rahim@example.com",
    "phone": "01700000000",
    "role": "EMPLOYEE",
    "image": "https://example.com/rahim.png",
    "bio": "Frontend developer",
    "isActive": true,
    "companyId": "company_id",
    "departmentId": "department_id",
    "department": {
      "id": "department_id",
      "name": "Development"
    }
  }
}
```

---

## `PATCH /api/v1/employees/convert-existing`

**Access:** `COMPANY_OWNER`

**Request body**

```json
{
  "email": "olduser@example.com",
  "departmentId": "department_id"
}
```

**Response**

```json
{
  "success": true,
  "message": "User converted to employee successfully",
  "data": {
    "id": "user_id",
    "name": "Old User",
    "email": "olduser@example.com",
    "role": "EMPLOYEE",
    "companyId": "company_id",
    "departmentId": "department_id",
    "isActive": true
  }
}
```

---

## `GET /api/v1/employees`

**Access:** `COMPANY_OWNER`

**Query**

```http
/employees?page=1&limit=10&searchTerm=rahim&departmentId=department_id&isActive=true
```

**Response**

```json
{
  "success": true,
  "message": "Employees retrieved successfully",
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1
  },
  "data": [
    {
      "id": "employee_id",
      "name": "Rahim Uddin",
      "email": "rahim@example.com",
      "phone": "01700000000",
      "role": "EMPLOYEE",
      "image": "https://example.com/rahim.png",
      "bio": "Frontend developer",
      "isActive": true,
      "companyId": "company_id",
      "departmentId": "department_id",
      "department": {
        "id": "department_id",
        "name": "Development"
      }
    }
  ]
}
```

---

## `GET /api/v1/employees/:employeeId`

**Access:** `COMPANY_OWNER`

**Response**

```json
{
  "success": true,
  "message": "Employee retrieved successfully",
  "data": {
    "id": "employee_id",
    "name": "Rahim Uddin",
    "email": "rahim@example.com",
    "phone": "01700000000",
    "role": "EMPLOYEE",
    "image": "https://example.com/rahim.png",
    "bio": "Frontend developer",
    "isActive": true,
    "companyId": "company_id",
    "departmentId": "department_id",
    "department": {
      "id": "department_id",
      "name": "Development"
    },
    "assignedTasks": [
      {
        "id": "task_id",
        "title": "Build landing page",
        "status": "PENDING",
        "priority": "HIGH",
        "deadline": "2026-04-05T12:00:00.000Z"
      }
    ],
    "_count": {
      "assignedTasks": 1
    }
  }
}
```

---

## `PATCH /api/v1/employees/:employeeId`

**Access:** `COMPANY_OWNER`

**Request body**

```json
{
  "name": "Rahim Hasan",
  "phone": "01800000000",
  "bio": "Updated bio",
  "image": "https://example.com/new.png",
  "departmentId": null,
  "isActive": true
}
```

**Response**

```json
{
  "success": true,
  "message": "Employee updated successfully",
  "data": {
    "id": "employee_id",
    "name": "Rahim Hasan",
    "email": "rahim@example.com",
    "phone": "01800000000",
    "role": "EMPLOYEE",
    "image": "https://example.com/new.png",
    "bio": "Updated bio",
    "isActive": true,
    "companyId": "company_id",
    "departmentId": null
  }
}
```

---

## `DELETE /api/v1/employees/:employeeId`

**Access:** `COMPANY_OWNER`

**Response**

```json
{
  "success": true,
  "message": "Employee deactivated successfully",
  "data": {
    "id": "employee_id",
    "name": "Rahim Uddin",
    "email": "rahim@example.com",
    "role": "EMPLOYEE",
    "isActive": false,
    "updatedAt": "2026-03-31T00:00:00.000Z"
  }
}
```

---

# 5) Department Routes

## `POST /api/v1/departments`

**Access:** `COMPANY_OWNER`

**Request body**

```json
{
  "name": "Development"
}
```

**Response**

```json
{
  "success": true,
  "message": "Department created successfully",
  "data": {
    "id": "department_id",
    "name": "Development",
    "companyId": "company_id",
    "createdAt": "2026-03-31T00:00:00.000Z",
    "updatedAt": "2026-03-31T00:00:00.000Z"
  }
}
```

---

## `GET /api/v1/departments`

**Access:** `COMPANY_OWNER`

**Query**

```http
/departments?page=1&limit=10&searchTerm=dev
```

**Response**

```json
{
  "success": true,
  "message": "Departments retrieved successfully",
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1
  },
  "data": [
    {
      "id": "department_id",
      "name": "Development",
      "companyId": "company_id",
      "createdAt": "2026-03-31T00:00:00.000Z",
      "updatedAt": "2026-03-31T00:00:00.000Z",
      "_count": {
        "users": 2,
        "tasks": 5
      }
    }
  ]
}
```

---

## `GET /api/v1/departments/:departmentId`

**Access:** `COMPANY_OWNER`

**Response**

```json
{
  "success": true,
  "message": "Department retrieved successfully",
  "data": {
    "id": "department_id",
    "name": "Development",
    "companyId": "company_id",
    "createdAt": "2026-03-31T00:00:00.000Z",
    "updatedAt": "2026-03-31T00:00:00.000Z",
    "users": [
      {
        "id": "employee_id",
        "name": "Rahim",
        "email": "rahim@example.com",
        "phone": "01700000000",
        "role": "EMPLOYEE",
        "isActive": true
      }
    ],
    "tasks": [
      {
        "id": "task_id",
        "title": "Build landing page",
        "status": "PENDING",
        "priority": "HIGH",
        "deadline": "2026-04-05T12:00:00.000Z",
        "assignedTo": {
          "id": "employee_id",
          "name": "Rahim"
        }
      }
    ],
    "_count": {
      "users": 1,
      "tasks": 1
    }
  }
}
```

---

## `PATCH /api/v1/departments/:departmentId`

**Access:** `COMPANY_OWNER`

**Request body**

```json
{
  "name": "Marketing"
}
```

**Response**

```json
{
  "success": true,
  "message": "Department updated successfully",
  "data": {
    "id": "department_id",
    "name": "Marketing",
    "companyId": "company_id",
    "createdAt": "2026-03-31T00:00:00.000Z",
    "updatedAt": "2026-03-31T00:00:00.000Z"
  }
}
```

---

## `DELETE /api/v1/departments/:departmentId`

**Access:** `COMPANY_OWNER`

**Response**

```json
{
  "success": true,
  "message": "Department deleted successfully",
  "data": null
}
```

---

# 6) Task Routes

## `POST /api/v1/tasks`

**Access:** `COMPANY_OWNER`

**Request body**

```json
{
  "title": "Build landing page",
  "description": "Create a premium landing page",
  "priority": "HIGH",
  "deadline": "2026-04-05T12:00:00.000Z",
  "assignedToId": "employee_id",
  "departmentId": "department_id"
}
```

**Response**

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": "task_id",
    "title": "Build landing page",
    "description": "Create a premium landing page",
    "status": "PENDING",
    "priority": "HIGH",
    "deadline": "2026-04-05T12:00:00.000Z",
    "startedAt": null,
    "completedAt": null,
    "companyId": "company_id",
    "departmentId": "department_id",
    "assignedBy": {
      "id": "owner_id",
      "name": "Owner",
      "role": "COMPANY_OWNER"
    },
    "assignedTo": {
      "id": "employee_id",
      "name": "Rahim",
      "role": "EMPLOYEE"
    },
    "department": {
      "id": "department_id",
      "name": "Development"
    }
  }
}
```

---

## `GET /api/v1/tasks`

**Access:** `COMPANY_OWNER` / `EMPLOYEE`

**Query**

```http
/tasks?page=1&limit=10&status=PENDING&priority=HIGH&departmentId=department_id&assignedToId=employee_id&searchTerm=landing
```

**Response**

```json
{
  "success": true,
  "message": "Tasks retrieved successfully",
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1
  },
  "data": [
    {
      "id": "task_id",
      "title": "Build landing page",
      "description": "Create a premium landing page",
      "status": "PENDING",
      "priority": "HIGH",
      "deadline": "2026-04-05T12:00:00.000Z",
      "startedAt": null,
      "completedAt": null,
      "companyId": "company_id",
      "departmentId": "department_id",
      "assignedBy": {
        "id": "owner_id",
        "name": "Owner",
        "role": "COMPANY_OWNER"
      },
      "assignedTo": {
        "id": "employee_id",
        "name": "Rahim",
        "role": "EMPLOYEE"
      },
      "department": {
        "id": "department_id",
        "name": "Development"
      }
    }
  ]
}
```

---

## `GET /api/v1/tasks/:taskId`

**Access:** task access আছে এমন user

**Response**

```json
{
  "success": true,
  "message": "Task retrieved successfully",
  "data": {
    "id": "task_id",
    "title": "Build landing page",
    "description": "Create a premium landing page",
    "status": "PENDING",
    "priority": "HIGH",
    "deadline": "2026-04-05T12:00:00.000Z",
    "assignedBy": {
      "id": "owner_id",
      "name": "Owner",
      "role": "COMPANY_OWNER",
      "email": "owner@example.com"
    },
    "assignedTo": {
      "id": "employee_id",
      "name": "Rahim",
      "role": "EMPLOYEE",
      "email": "rahim@example.com"
    },
    "department": {
      "id": "department_id",
      "name": "Development"
    },
    "comments": [],
    "attachments": []
  }
}
```

---

## `PATCH /api/v1/tasks/:taskId`

**Access:** `COMPANY_OWNER`

**Request body**

```json
{
  "title": "Updated task title",
  "description": "Updated description",
  "priority": "MEDIUM",
  "status": "IN_PROGRESS",
  "deadline": "2026-04-10T12:00:00.000Z",
  "assignedToId": "employee_id",
  "departmentId": "department_id"
}
```

**Response**

```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "id": "task_id",
    "title": "Updated task title",
    "description": "Updated description",
    "status": "IN_PROGRESS",
    "priority": "MEDIUM",
    "deadline": "2026-04-10T12:00:00.000Z",
    "startedAt": "2026-03-31T00:00:00.000Z",
    "completedAt": null,
    "companyId": "company_id",
    "departmentId": "department_id"
  }
}
```

---

## `PATCH /api/v1/tasks/:taskId/my-status`

**Access:** `EMPLOYEE` বা নিজের assigned task হলে `COMPANY_OWNER`

**Request body**

```json
{
  "status": "COMPLETED"
}
```

**Response**

```json
{
  "success": true,
  "message": "Task status updated successfully",
  "data": {
    "id": "task_id",
    "title": "Build landing page",
    "description": "Create a premium landing page",
    "status": "COMPLETED",
    "priority": "HIGH",
    "deadline": "2026-04-05T12:00:00.000Z",
    "startedAt": "2026-03-31T00:00:00.000Z",
    "completedAt": "2026-03-31T02:00:00.000Z"
  }
}
```

---

## `DELETE /api/v1/tasks/:taskId`

**Access:** `COMPANY_OWNER`

**Response**

```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": null
}
```

---

# 7) Task Comment Routes

## `POST /api/v1/task-comments/:taskId`

**Request body**

```json
{
  "message": "Please update UI margin"
}
```

**Response**

```json
{
  "success": true,
  "message": "Comment added successfully",
  "data": {
    "id": "comment_id",
    "message": "Please update UI margin",
    "createdAt": "2026-03-31T00:00:00.000Z",
    "user": {
      "id": "user_id",
      "name": "Rahim",
      "role": "EMPLOYEE"
    }
  }
}
```

---

## `GET /api/v1/task-comments/:taskId`

**Response**

```json
{
  "success": true,
  "message": "Comments retrieved successfully",
  "data": [
    {
      "id": "comment_id",
      "message": "Please update UI margin",
      "createdAt": "2026-03-31T00:00:00.000Z",
      "user": {
        "id": "user_id",
        "name": "Rahim",
        "role": "EMPLOYEE"
      }
    }
  ]
}
```

---

## `DELETE /api/v1/task-comments/comment/:commentId`

**Response**

```json
{
  "success": true,
  "message": "Comment deleted successfully",
  "data": null
}
```

---

# 8) Task Attachment Routes

## `POST /api/v1/task-attachments/:taskId`

**Request**
`multipart/form-data`

**Field**

```text
file = your file
```

**Response**

```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "id": "attachment_id",
    "fileName": "design.png",
    "fileUrl": "https://res.cloudinary.com/...",
    "fileType": "image/png",
    "createdAt": "2026-03-31T00:00:00.000Z",
    "uploadedBy": {
      "id": "user_id",
      "name": "Rahim",
      "role": "EMPLOYEE"
    }
  }
}
```

---

## `GET /api/v1/task-attachments/:taskId`

**Response**

```json
{
  "success": true,
  "message": "Attachments retrieved",
  "data": [
    {
      "id": "attachment_id",
      "fileName": "design.png",
      "fileUrl": "https://res.cloudinary.com/...",
      "fileType": "image/png",
      "createdAt": "2026-03-31T00:00:00.000Z",
      "uploadedBy": {
        "id": "user_id",
        "name": "Rahim"
      }
    }
  ]
}
```

---

## `DELETE /api/v1/task-attachments/attachment/:attachmentId`

**Response**

```json
{
  "success": true,
  "message": "Attachment deleted",
  "data": null
}
```

---

# 7) Dashboard Route

## `GET /api/v1/dashboard/stats`

**কাজ:** logged-in user অনুযায়ী dashboard stats আনা

**Access:**

- `ADMIN`
- `COMPANY_OWNER`
- `EMPLOYEE`

**Request:**
কোনো body লাগবে না
শুধু login session / cookie লাগবে

---

## Example Request

```http
GET /api/v1/dashboard/stats
```

---

## Response for `ADMIN`

```json
{
  "success": true,
  "message": "Dashboard stats retrieved successfully",
  "data": {
    "scope": "ADMIN",
    "overview": {
      "totalUsers": 20,
      "totalCompanies": 5,
      "activeCompanies": 4,
      "verifiedCompanies": 3,
      "totalEmployees": 10,
      "totalCompanyOwners": 5,
      "totalTasks": 50
    },
    "tasks": {
      "pending": 10,
      "inProgress": 12,
      "review": 5,
      "completed": 20,
      "cancelled": 3,
      "overdue": 2,
      "dueToday": 4,
      "urgent": 6,
      "highPriority": 9
    },
    "recentCompanies": [
      {
        "id": "company_id",
        "name": "AB Tech",
        "slug": "ab-tech",
        "isActive": true,
        "isVerified": true,
        "createdAt": "2026-03-31T00:00:00.000Z",
        "owner": {
          "id": "user_id",
          "name": "Owner Name",
          "email": "owner@example.com"
        }
      }
    ],
    "recentTasks": [
      {
        "id": "task_id",
        "title": "Build landing page",
        "status": "PENDING",
        "priority": "HIGH",
        "deadline": "2026-04-05T12:00:00.000Z",
        "createdAt": "2026-03-31T00:00:00.000Z",
        "company": {
          "id": "company_id",
          "name": "AB Tech",
          "slug": "ab-tech"
        },
        "assignedTo": {
          "id": "employee_id",
          "name": "Rahim",
          "email": "rahim@example.com"
        }
      }
    ]
  }
}
```

---

## Response for `COMPANY_OWNER`

```json
{
  "success": true,
  "message": "Dashboard stats retrieved successfully",
  "data": {
    "scope": "COMPANY_OWNER",
    "company": {
      "id": "company_id",
      "name": "AB Tech",
      "slug": "ab-tech",
      "isActive": true,
      "isVerified": false
    },
    "overview": {
      "totalEmployees": 8,
      "activeEmployees": 7,
      "inactiveEmployees": 1,
      "totalDepartments": 3,
      "totalTasks": 18
    },
    "tasks": {
      "pending": 4,
      "inProgress": 5,
      "onHold": 2,
      "review": 1,
      "completed": 5,
      "cancelled": 1,
      "overdue": 2,
      "dueToday": 3,
      "urgent": 2,
      "highPriority": 4
    },
    "recentEmployees": [
      {
        "id": "employee_id",
        "name": "Rahim Uddin",
        "email": "rahim@example.com",
        "phone": "01700000000",
        "isActive": true,
        "createdAt": "2026-03-31T00:00:00.000Z",
        "department": {
          "id": "department_id",
          "name": "Development"
        }
      }
    ],
    "recentTasks": [
      {
        "id": "task_id",
        "title": "Build landing page",
        "status": "PENDING",
        "priority": "HIGH",
        "deadline": "2026-04-05T12:00:00.000Z",
        "createdAt": "2026-03-31T00:00:00.000Z",
        "assignedTo": {
          "id": "employee_id",
          "name": "Rahim",
          "email": "rahim@example.com"
        },
        "assignedBy": {
          "id": "owner_id",
          "name": "Anwarul"
        },
        "department": {
          "id": "department_id",
          "name": "Development"
        }
      }
    ]
  }
}
```

---

## Response for `EMPLOYEE`

```json
{
  "success": true,
  "message": "Dashboard stats retrieved successfully",
  "data": {
    "scope": "EMPLOYEE",
    "overview": {
      "totalTasks": 10,
      "pendingTasks": 2,
      "inProgressTasks": 3,
      "onHoldTasks": 1,
      "reviewTasks": 1,
      "completedTasks": 2,
      "cancelledTasks": 1,
      "overdueTasks": 1,
      "dueTodayTasks": 2,
      "urgentTasks": 1,
      "highPriorityTasks": 2
    },
    "recentTasks": [
      {
        "id": "task_id",
        "title": "Build landing page",
        "status": "IN_PROGRESS",
        "priority": "HIGH",
        "deadline": "2026-04-05T12:00:00.000Z",
        "startedAt": "2026-03-31T01:00:00.000Z",
        "completedAt": null,
        "createdAt": "2026-03-31T00:00:00.000Z",
        "assignedBy": {
          "id": "owner_id",
          "name": "Anwarul",
          "email": "owner@example.com"
        },
        "department": {
          "id": "department_id",
          "name": "Development"
        }
      }
    ]
  }
}
```

---

## Error Response Example

যদি login না থাকে:

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

# 9) Full Final Route List

```bash
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
GET    /api/v1/auth/me
POST   /api/v1/auth/change-password
GET    /api/v1/auth/all

POST   /api/v1/companies
GET    /api/v1/companies/my-company
PATCH  /api/v1/companies/my-company
GET    /api/v1/companies
GET    /api/v1/companies/:slugOrId
PATCH  /api/v1/companies/:companyId/verify
PATCH  /api/v1/companies/:companyId/status

GET    /api/v1/dashboard/stats

POST   /api/v1/employees
PATCH  /api/v1/employees/convert-existing
GET    /api/v1/employees
GET    /api/v1/employees/:employeeId
PATCH  /api/v1/employees/:employeeId
DELETE /api/v1/employees/:employeeId

POST   /api/v1/departments
GET    /api/v1/departments
GET    /api/v1/departments/:departmentId
PATCH  /api/v1/departments/:departmentId
DELETE /api/v1/departments/:departmentId

POST   /api/v1/tasks
GET    /api/v1/tasks
GET    /api/v1/tasks/:taskId
PATCH  /api/v1/tasks/:taskId
PATCH  /api/v1/tasks/:taskId/my-status
DELETE /api/v1/tasks/:taskId

POST   /api/v1/task-comments/:taskId
GET    /api/v1/task-comments/:taskId
DELETE /api/v1/task-comments/comment/:commentId

POST   /api/v1/task-attachments/:taskId
GET    /api/v1/task-attachments/:taskId
DELETE /api/v1/task-attachments/attachment/:attachmentId
GET    /api/v1/dashboard/stats
```
