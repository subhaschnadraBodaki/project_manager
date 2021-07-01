select enum.enumlabel AS key,
    enum.enumlabel AS value
from pg_enum as enum
    JOIN pg_type AS type ON (type.oid = enum.enumtypid)
where typname = 'job_roles_t'
GROUP BY enum.enumlabel,
    type.typname;