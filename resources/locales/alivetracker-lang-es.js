Ext.define('Locales.AliveTracker', {
    statics: {
        /**
         * Forgot Password View
         */
        FORGOT_PASSWORD_LABEL: 'Olvidé mi contraseña',
        FORGOT_PASSWORD_LABEL_MAIL: 'Email',
        FORGOT_PASSWORD_LABEL_SEND: 'Enviar',
        FORGOT_PASSWORD_LABEL_RESET_INSTRUCTION:'¡Enviarme las instrucciones!',
        /**
         * Login View
         */
        LOGIN_LABEL_USERNAME: 'Usuario',
        LOGIN_LABEL_PASSWORD: 'Contraseña',
        LOGIN_LABEL_LOGIN: 'Ingresar',
        LOGIN_LABEL_SIGNUP: 'Registrarse',
        LOGIN_LABEL_FORGOT_PASSWORD: 'Olvidé mi contraseña',
        LOGIN_LABEL_REMEMBER_ME: 'Recordarme',
        /**
         * Password Verification  View
         */
        PASSWORD_VERIFICATION_LABEL_PASSWORD: 'Contraseña',
        PASSWORD_VERIFICATION_LABEL_CONFIRM_PASSWORD: 'Confirmar Contraseña',
        /**
         * Forgot Password
         */
        SUCCESS_SEND_EMAIL_INSTRUCTION: 'Te enviamos un correo con las instrucciones para restaurar tu contraseña',
        /**
         * Reset Password
         */
        SUCCESS_RESET_PASSWORD: 'Te enviamos un correo con tu nueva contraseña',
        RESET_PASSWORD_UPDATE: 'Te tenemos programado un cambio de contraseña',
        RESET_PASSWORD_LABEL: 'Restablecer contraseña',
        /**
         * Password Verification  View
         */
        PROFILE_LABEL_EMAIL: 'Email',
        PROFILE_LABEL_NAME: 'Nombre',
        PROFILE_LABEL_PASSWORD: 'Contraseña',
        /**
         * Register  View
         */
        REGISTER_LABEL_EMAIL: 'Email',
        REGISTER_LABEL_NEWSLETTER: 'Deseo recibir notificaciones',
        REGISTER_LABEL_PASSWORD: 'Contraseña',
        REGISTER_LABEL_REGISTER_NOW:'Registrarme',
        REGISTER_LABEL_NEW: '¿Nuevo en alivetracker?',
        /**
         * Reports View
         */
        REPORTS_LABEL_GROUP: 'Grupo',
        REPORTS_LABEL_PROJECT: 'Proyecto',
        REPORTS_LABEL_SELECT: '--Seleccionar--',
        REPORTS_LABEL_USER: 'Usuario',
        REPORTS_LABEL_DATERANGE:'Rango de fechas',
        REPORTS_CUSTOM_DATERANGE_DESCRIPTION: 'Personalizado',
        REPORTS_LAST_DAY_DATERANGE_DESCRIPTION: 'Ultimo día',
        REPORTS_LAST_SEVEN_DAYS_DATERANGE_DESCRIPTION: 'Ultimos 7 días',
        REPORTS_LAST_TWO_WEEKS_DATERANGE_DESCRIPTION: 'Ultimas 2 semanas',
        REPORTS_LAST_MONTH_DATERANGE_DESCRIPTION: 'Ultimo mes',
        REPORTS_LABEL_EXPORT: 'Exportar',
        REPORTS_LABEL_PREVIEW: 'Vista Previa',
        /**
         * Header View
         */
        HEADER_USER_PROFILE: 'Perfil de Usuario',
        HEADER_LOG_OUT: 'Cerrar sesión',
        /**
         * Home View
         */
        HOME_DELETE_PROJECT_CONFIRMATION_MESSAGE: '¿Confirma que desea eliminar el proyecto seleccionado?',
        HOME_LABEL_GROUP_NAME: 'Nombre del grupo',
        HOME_LABEL_DESCRIPTION: 'Descripción',
        HOME_LABEL_WEBSITE: 'Sitio web',
        HOME_LABEL_LOGO_URL:'URL del logo',
        HOME_LABEL_CANCEL: 'Cancelar',
        HOME_LABEL_INSERT: 'Insertar',
        HOME_LABEL_MY_GROUPS:'Mis Grupos',
        HOME_LABEL_GROUPS:'Grupos',
        HOME_LABEL_NEW_GROUP:'Grupo Nuevo',
        HOME_LABEL_NEW: 'Nuevo',
        HOME_LABEL_BELONG_GROUPS:'Grupos a los que pertenezco',
        HOME_LABEL_NO_GROUPS: 'No hay grupos creados',
        HOME_LABEL_ACTIONS: 'Acciones',
        HOME_LABEL_DEFAULT: 'Por defecto',
        /**
         * Group Detail View
         */
        GROUP_DETAIL_TITLE_LOG_BOOK: 'Bitacora',
        GROUP_DETAIL_TITLE_PROJECTS: 'Proyectos',
        GROUP_DETAIL_TITLE_USERS: 'Usuarios',
        GROUP_DETAIL_TITLE_REPORTS: 'Reportes',
        GROUP_DETAIL_REMOVE_USER: 'Eliminar usuario del grupo',
        GROUP_DETAIL_EDIT_USER_OF_PROJECT: 'Editar usuarios asignados al proyecto',
        GROUP_DETAIL_REMOVE_USER_OF_PROJECT: 'Eliminar proyecto del grupo',
        /**
         * Group Project View
         */
        GROUP_PROJECT_LABEL_NEW_PROJECT: 'Proyecto nuevo',
        GROUP_PROJECT_LABEL_NAME: 'Nombre',
        GROUP_PROJECT_LABEL_MEMBERS: 'Miembros',
        GROUP_PROJECT_LABEL_CREATED: 'Creado',
        GROUP_PROJECT_LABEL_ACTIONS: 'Acciones',
        /**
         * Confirmation Messages
         */
        GRID_DELETE_ROW_CONFIRMATION_MESSAGE: '¿Confirma que desea eliminar el registro seleccionado?',
        /**
         * Success Messages
         */
        SUCCESS_MESSAGE: 'Éxito',
        SUCCESS_SAVE_GROUP: 'Grupo guardado',
        SUCCESS_SAVE_PROFILE: 'Perfil Guardado',
        /**
         * Warning Messages
         */
        WARNING_MESSAGE: 'Advertencia',
        NO_DATA_TO_SAVE: 'No hay datos para guardar',
        USER_EXISTS: 'Usuario ya asignado al grupo',
        NO_ADMIN_ASSIGNED: 'El proyecto debe tener un administrador asignado',
        /**
         * AddUsersGroup View
         */
        ADD_USERS_GROUP_LABEL_ADD_USER: 'Agregar usuario',
        /**
         * Projects View
         */
        PROJECTS_LABEL_LOG_BOOK: 'Bitacora',
        PROJECTS_LABEL_TOTAL: 'Tiempo Total',
        PROJECTS_COLUMN_HEADER_PROJECT: 'Proyecto',
        PROJECTS_COLUMN_HEADER_EDIT_PROJECT: 'Editar Proyecto',
        PROJECTS_COLUMN_HEADER_ACTIVITY: 'Actividad',
        PROJECTS_COLUMN_HEADER_TIME: 'Horas',
        PROJECTS_COLUMN_HEADER_ACTIONS: 'Acciones',
        PROJECTS_LABEL_SAVE:'Guardar',
        PROJECTS_LABEL_SELECT:'--Seleccionar--',
        PROJECTS_ADD_BUTTON:'Agregar actividad',
        PROJECTS_LOG_SAVE_SUCCESS:'Guardado exitoso',
        NEW_PROJECT_LABEL: 'Nuevo Proyecto',
        /**
         * Users View
         */
        USERS_LABEL_PROJECT: 'Proyecto',
        USERS_LABEL_DESCRIPTION: 'Descripción',
        USERS_LABEL_SAVE:'Guardar',
        USERS_LABEL_CANCEL:'Cancelar',
        USERS_LABEL_ROLES_MANAGER:'Administrador de usuarios y roles',
        USERS_LABEL_NAME:'Nombre',
        USERS_LABEL_ROLE: 'Rol',
        /**
         * DateRange View
         */
        DATERANGE_LABEL_START_DATE: 'Fecha inicio',
        DATERANGE_LABEL_END_DATE: 'Fecha fin',
        /**
         * VTypesOverrides
         */
        VTYPES_OVERRIDE_MESSAGE_DATERANGE:'La fecha de inicio debe ser menor a la fecha de fin',
        VTYPES_OVERRIDE_MESSAGE_PASSWORD:'La contraseña no concuerda',
        /**
         * Validation Labels
         */
        VALIDATION_LABEL_EMAIL_REQUIRED: 'Este campo es obligatorio',
        VALIDATION_LABEL_EMAIL_FORMAT: 'Este campo debe ser una dirección de correo electrónico con el formato "usuario@dominio.com"',
        VALIDATION_LABEL_PASSWORD_MIN_LENGTH: 'La contraseña debe tener al menos 8 caracteres'
    }
});
