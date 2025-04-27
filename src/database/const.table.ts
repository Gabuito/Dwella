export const DATABASE = {
  TABLES:{
    USERS:{
      NAME:"tb_users",
      COLUMNS:{
        ID:"use_id",
        UUID: "use_uuid",
        STREET:"use_street",
        NUMBER:"use_number",
        COMPLEMENT:"use_complement",
        NEIGHBORHOOD:"use_neighborhood",
        CITY:"use_city",
        STATE:"use_state",
        ZIP:"use_zip",
        COUNTRY:"use_country",
        NAME: "use_name",
        SURNAME: "use_surname",
        BIRTHDATE: "use_birthdate",
        GENDER: "use_gender",
        PRIMARYPHONE: "use_primaryphone",
        SECUNDARYPHONE: "use_secundaryphone",
        EMAIL: "use_email",
        PASSWORD: "use_password",
        VERIFIED: "use_verified",
        STATUS: "use_status",
        CREATEDAT: "use_createdAt",
        UPDATEDAT: "use_updatedAt",
        DELETEDAT: "use_deletedAt",
    }
  },
    ROLES:{
      NAME:"tb_roles",
      COLUMNS:{
        ID:"rol_id",
        NAME:"rol_name",
        DESCRIPTION:"rol_description",
        CREATEDAT:"rol_createdAt",
        UPDATEDAT:"rol_updatedAt",
        DELETEDAT:"rol_deletedAt",
      }
    },
    PERMISSIONS:{
      NAME:"tb_permissions",
      COLUMNS:{
        ID:"per_id",
        NAME:"per_name",
        DESCRIPTION:"per_description",
        CREATEDAT:"per_createdAt",
        UPDATEDAT:"per_updatedAt",
        DELETEDAT:"per_deletedAt",
      }
    },
    USERS_ROLES:{
      NAME:"tb_users_roles",
      COLUMNS:{
        USERID: "usro_userUUID",
        ROLEID: "usro_roleId"
      }
    },
    ROLES_PERMISSIONS:{
      NAME:"tb_roles_permissions",
      COLUMNS:{
        ROLEID: "rope_roleId",
        PERMISSIONID: "rope_permissionId"
      }
    }
  }
};