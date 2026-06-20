import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

function getUserRoles(): string[] {
  const stored = localStorage.getItem('auth_user');
  if (!stored) return [];
  const user = JSON.parse(stored);
  return user.roles || [];
}

export const teacherGuard: CanActivateFn = () => {
  const router = inject(Router);
  const roles = getUserRoles();

  if (roles.includes('ROLE_PROFESOR')) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

export const parentGuard: CanActivateFn = () => {
  const router = inject(Router);
  const roles = getUserRoles();

  if (roles.includes('ROLE_PADRE')) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};