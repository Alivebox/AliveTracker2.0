Ext.define('Locales.AliveTracker', {
	statics: {
        /**
         * Forgot Password View
         */
        FORGOT_PASSWORD_LABEL: 'Forgot my password',
        FORGOT_PASSWORD_LABEL_MAIL: 'Email',
        FORGOT_PASSWORD_LABEL_SEND: 'Send',
        FORGOT_PASSWORD_LABEL_RESET_INSTRUCTION:'Send me instructions!',
        /**
         * Login View
         */
        LOGIN_LABEL_USERNAME: 'Username',
        LOGIN_LABEL_PASSWORD: 'Password',
        LOGIN_LABEL_LOGIN: 'Login',
        LOGIN_LABEL_SIGNUP: 'Sign-Up',
        LOGIN_LABEL_FORGOT_PASSWORD: 'Forgot password',
        LOGIN_LABEL_REMEMBER_ME: 'Remember me',
        /**
         * Password Verification  View
         */
        PASSWORD_VERIFICATION_LABEL_PASSWORD: 'Password',
        PASSWORD_VERIFICATION_LABEL_CONFIRM_PASSWORD: 'Confirm Password',
        /**
         * Set Password
         */
        SET_PASSWORD_SUCCESS_RESET: 'Changed password successful',
        SET_PASSWORD_INVALID: 'Invalid password, retype your password',
        /**
         * Forgot Password
         */
        SUCCESS_SEND_EMAIL_INSTRUCTION: 'We send you an e-mail with the instruction to reset your password',
        /**
         * Reset Password
         */
        SUCCESS_RESET_PASSWORD: 'We send you an e-mail with your new password',
        RESET_PASSWORD_UPDATE: 'We have scheduled a password change',
        RESET_PASSWORD_LABEL: 'Reset Password',
        RESET_PASSWORD_NEW: 'New Password',
        /**
         * Set Password
         */
        SET_NEW_PASSWORD_LABEL_PASSWORD: 'New Password',
        SET_CONFIRM_PASSWORD_VERIFICATION_LABEL: 'Confirm Password',
        SET_RESET_PASSWORD_LABEL: 'Reset Password',
        /**
         * Password Verification  View
         */
        ROFILE_LABEL_NAME: 'Name',
        PROFILE_LABEL_PASSWORD: 'Password',
        /**
         * Register  View
         */
        REGISTER_LABEL_EMAIL: 'Email',
        REGISTER_LABEL_NEWSLETTER: 'Sign me up for newsletter',
        REGISTER_LABEL_PASSWORD: 'Password',
        REGISTER_LABEL_REGISTER_NOW:'Sign up',
        REGISTER_LABEL_NEW: 'New to alivetracker?',
        /**
         * Reports View
         */
        REPORTS_LABEL_GROUP: 'Group',
        REPORTS_LABEL_PROJECT: 'Project',
        REPORTS_LABEL_SELECT: '--Select--',
        REPORTS_LABEL_USER: 'User',
        REPORTS_LABEL_DATERANGE:'Date Range',
        REPORTS_CUSTOM_DATERANGE_DESCRIPTION: 'Customized',
        REPORTS_LAST_DAY_DATERANGE_DESCRIPTION: 'Last day',
        REPORTS_LAST_SEVEN_DAYS_DATERANGE_DESCRIPTION: 'Last 7 days',
        REPORTS_LAST_TWO_WEEKS_DATERANGE_DESCRIPTION: 'Last 2 weeks',
        REPORTS_LAST_MONTH_DATERAORTS_LABEL_EXPORT: 'Export',
        REPORTS_LABEL_PREVIEW: 'Preview',
        REPORTS_LABEL_ACTIVITY: 'Actividad',
        REPORTS_LABEL_DATE: 'Date',
        /**
         * Home View
         */
        HOME_DELETE_GROUP_CONFIRMATION_MESSAGE: 'Are you sure you want to delete this group?',
        HOME_LABEL_GROUP_NAME: 'Group name',
        HOME_LABEL_DESCRIPTION: 'Description',
        HOME_LABEL_WEBSITE: 'Website URL',
        HOME_LABEL_LOGO_URL:'Logo URL',
        HOME_LABEL_CANCEL: 'Cancel',
        HOME_LABEL_INSERT: 'Insert',
        HOME_LABEL_MY_GROUPS:'My Groups',
        HOME_LABEL_GROUPS:'Groups',
        HOME_LABEL_NEW_GROUP:'New Group',
        HOME_LABEL_NEW: 'New',
        HOME_LABEL_BELONG_GROUPS:'Groups I belong to',
        HOME_LABEL_NO_GROUPS: 'No groups created',
        HOME_LABEL_DEFAULT: 'Default',
        /**
         * Group Detail View
         */
        GROUP_DETAIL_TITLE_LOG_BOOK: 'Log book',
        GROUP_DETAIL_TITLE_PROJECTS: 'Projects',
        GROUP_DETAIL_TITLE_USERS: 'Users',
        GROUP_DETAIL_TITLE_REPORTS: 'Reports',
        GROUP_DETAIL_REMOVE_USER: 'Remove user from group',
        GROUP_DETAIL_EDIT_USER_OF_PROJECT: 'Edit users assigned to project',
        GROUP_DETAIL_REMOVE_USER_OF_PROJECT: 'Remove project from group',
        GROUPS_ADD_BUTTON: 'Add Group',
        /**
         * Group Project View
         */
        GROUP_PROJECT_LABEL_NEW_PROJECT: 'New Project',
        GROUP_PROJECT_LABEL_NAME: 'Name',
        GROUP_PROJECT_LABEL_MEMBERS: 'Members',
        GROUP_PROJECT_LABEL_CREATED: 'Created',
        GROUP_PROJECT_LABEL_ACTIONS: 'Actions',
        /**
         * Confirmation Messages
         */
        GRID_DELETE_ROW_CONFIRMATION_MESSAGE: 'Are you sure you want to delete the selected row?',
        /**
         * Success Messages
         */
        SUCCESS_MESSAGE: 'Success',
        SUCCESS_SAVE_GROUP: 'Group Saved',
        SUCCESS_SAVE_PROFILE: 'Profile Saved',
        /**
         * Warning Messages
         */
        WARNING_MESSAGE: 'Warning',
        NO_DATA_TO_SAVE: 'No data to save',
        USER_EXISTS: 'User already assigned to this group',
        NO_ADMIN_ASSIGNED: 'Project must have an administator assigned',
        /**
         * Projects View
         */
        PROJECTS_LABEL_LOG_BOOK: 'Log Book',
        PROJECTS_LABEL_TOTAL: 'Total Time',
        PROJECTS_COLUMN_HEADER_PROJECT: 'Project',
        PROJECTS_COLUMN_HEADER_NEW_PROJECT: 'New Project',
        PROJECTS_COLUMN_HEADER_EDIT_PROJECT: 'Edit Project',
        PROJECTS_COLUMN_HEADER_ACTIVITY: 'Activity',
        PROJECTS_COLUMN_HEADER_TIME: 'Hours',
        PROJECTS_COLUMN_HEADER_ACTIONS: 'Actions',
        PROJECTS_COLUMN_HEADER_NOTES: 'Notes',
        PROJECTS_LABEL_SAVE:'Save',
        PROJECTS_LABEL_SELECT:'--Select--',
        ACTIVITY_ADD_BUTTON:'Add activity',
        PROJECTS_ADD_BUTTON:'Add proyect',
        PROJECTS_LOG_SAVE_SUCCESS:'Save Success',
        PROJECT_REMOVE_ACTIVITY: 'Remove activity',
        PROJECT_ADD_NOTES: 'Add notes',
        NEW_PROJECT_LABEL: 'New Project',
        ACTIVITY_ADD_NOTES_LABEL: 'Add Notes',
        ACTIVITY_NOTE_LABEL: 'Note',
        ACTIVITY_NOTE_SAVE: 'Save',
        ACTIVITY_NOTE_ADD: 'Add',
        ACTIVITY_NOTE_EDIT: 'Edit',
        ACTIVITY_REMOVE_NOTE: 'Remove note',
        /**
         * Users View
         */
        USERS_LABEL_PROJECT: 'Project',
        USERS_LABEL_DESCRIPTION: 'Description',
        USERS_LABEL_SAVE:'Save',
        USERS_LABEL_CANCEL:'Cancel',
        USERS_LABEL_ROLES_MANAGER:'Users and Roles manager',
        USERS_LABEL_NAME:'Name',
        USERS_LABEL_ROLE: 'Role',
        USERS_ADD_BUTTON:'Add user',
        /**
         * DateRange View
         */
        DATERANGE_LABEL_START_DATE: 'Start date',
        DATERANGE_LABEL_END_DATE: 'End date',
        /**
         * VTypesOverrides
         */
        VTYPES_OVERRIDE_MESSAGE_DATERANGE:'Start date must be less than end date',
        VTYPES_OVERRIDE_MESSAGE_PASSWORD:'Passwords do not match',
        /**
         * Validation Labels
         */
        VALIDATION_LABEL_EMAIL_REQUIRED: 'Email is required',
        VALIDATION_LABEL_EMAIL_FORMAT: 'This field must be an email address "user@domain.com"',
        VALIDATION_LABEL_PASSWORD_MIN_LENGTH: 'Password must be at least 8 characters'
	}
});
