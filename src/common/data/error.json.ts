export const errorInfo = {
  // AUTH codeS
  expiredToken: {
    code: 'TOKEN_EXPIRED',
    status: 409,
    message: 'Token expirado',
  },
  wrongToken: {
    code: 'TOKEN_INCORRECT',
    status: 401,
    message: 'Token inválido',
  },
  missingToken: {
    code: 'TOKEN_NOT_DETECTED',
    status: 401,
    message: 'No se encontró token',
  },
  passwordIncorrect: {
    code: 'PASSWORD_INCORRECT',
    status: 401,
    message: 'Contraseña incorrecta',
  },
  notPrivileges: {
    code: 'NOT_PRIVILEGES',
    status: 401,
    message: 'No tiene los permisos necesarios',
  },
  // INTERNAL SERVER ERROR
  internalServerError: {
    code: 'INTERNAL_SERVER_ERROR',
    status: 500,
    message: 'Error interno del servidor',
  },
}
